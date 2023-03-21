import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ clearToken }) {
  return (
    <main className="Home">
      <PostList />
    </main>
  );
}

function PostList() {
  const [posts, setPosts] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        'http://localhost:3000/api/posts'
      )
      .catch(err => setErrorMessage('Posts fetch failed'));
      
      if (response.status !== 200) {
        setErrorMessage('Posts fetch failed');
        return;
      }
      const data = await response.json();
      setPosts(data.post_list);
    }
    getPosts();
  }, []);

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  return (
    <div className="container">
      <ul className="row">
        {posts && posts.map((post) => {
          return <PostCard key={post._id} post={post} />
        })}
      </ul>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="col-md-4 g-5">
      <div className="card rounded box-shadow">
        <strong className="card-header">{post.is_published ? 'Published' : 'Unpublished'}</strong>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-subtitle">Created on {post.timestamp_formatted_date}</p>
          <PostTextReduced text={post.text} />
        </div>
        <div className="card-footer">
          <Link to={`/posts/${post._id}`} className="btn btn-secondary">Edit post</Link>
        </div>
      </div>
    </div>
  )
}

function PostTextReduced({ text }) {
  function reduceText(text, length) {
    const words = text.split(' ');
    if (words.length > length) {
      return words.slice(0, length).join(' ') + '...';
    } else {
      return text;
    }
  }

  return (
    <p className="card-text mb-auto">
      {reduceText(text, 50)}
    </p>
  );
}