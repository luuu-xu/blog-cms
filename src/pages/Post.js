import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useToken from "../components/useToken";

export default function Post() {
  return (
    <main>
      <PostForm />
      <hr className="container"></hr>
      <CommentList />
    </main>
  )
}

function PostForm() {
  const { token } = useToken();
  const { postid } = useParams();
  const postData = useLoaderData().post;
  const [post, setPost] = useState(postData);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/posts/${postid}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(post),
      }
    );

    switch (response.status) {
      case 401:
        setErrorMessages([...errorMessages, 'Unauthorized']);
        break;
      case 502:
        setErrorMessages([...errorMessages, 'Error updating post']);
        break;
      case 400:
        const data = await response.json();
        const errors = data.errors.map((error) => error.msg);
        setErrorMessages(errors);
        break;
      case 200:
        setErrorMessages([]);
        setSuccessMessage('Update was successful');
        break;
      default:
        console.log(response);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/posts/${postid}`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token,
        },
      }
    );

    switch (response.status) {
      case 401:
        setErrorMessages([...errorMessages, 'Unauthorized']);
        break;
      case 502:
        setErrorMessages([...errorMessages, 'Error deleting post']);
        break;
      case 200:
        setErrorMessages([]);
        setSuccessMessage('Delete was successful, redirecting to home...');
        setTimeout(() => {
          navigate("/");
        }, 3000);
        break;
      default:
        console.log(response);
    }
  }

  return (
        <form className="container mb-4">
          <h2>Post</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">Title</label>
            <input 
              type="text" id="title" name="title" className="form-control"
              value={post.title}
              onChange={(e) => setPost({...post, title: e.target.value})} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="text">Text</label>
            <textarea id="text" name="text" className="form-control" rows="10"
              value={post.text} 
              onChange={(e) => setPost({...post, text: e.target.value})} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="timestamp_formatted_date">Created on</label>
            <input type="text" id="timestamp_formatted_date" name="timestamp_formatted_date" className="form-control" 
              value={post.timestamp_formatted_date} 
              readOnly 
            />
          </div>
          <div className="mb-3 form-check form-switch">
            <label className="form-check-label" htmlFor="published">Publish?</label>
            <input className="form-check-input" type="checkbox" id="published" name="published" role="switch"
              checked={post.is_published}
              onChange={(e) => {setPost({...post, is_published: e.target.checked})}}
            />
          </div>
          <div className="mb-3 d-grid d-md-block">
            <button className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
          </div>
          <div className="mb-3 d-grid d-md-block">
            <button className="btn btn-danger"
              onClick={handleDelete}>
              Delete
            </button>
          </div>
          {
            errorMessages.length 
            ?
            errorMessages.map((error, index) => {
              return (
                <div className="alert alert-danger d-flex align-items-center" key={index}>
                  <div>{error}</div>
                </div>
              )
            })
            :
            ''
          }
          {
            successMessage
            ?
            <div className="alert alert-success d-flex align-items-center" role="alert">
              {successMessage}
            </div>
            :
            ''
          }
        </form>
  );
}

function CommentList() {
  const comments = useLoaderData().post.comments;

  return (
    <div className="container">
      <h2>Comments</h2>
      {
        comments.length
        ?
        <ul className="list-group">
          {comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />
          })}
        </ul>
        :
        <p>No comments yet</p>
      }
    </div>
  )
}

function Comment({ comment }) {
  const { token } = useToken();
  const { postid } = useParams();
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/posts/${postid}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token,
        },
      }
    );

    switch (response.status) {
      case 401:
        setErrorMessages([...errorMessages, 'Unauthorized']);
        break;
      case 404:
        setErrorMessages([...errorMessages, 'Comment not found']);
        break;
      case 502:
        setErrorMessages([...errorMessages, 'Error deleting comment']);
        break;
      case 200:
        setErrorMessages([]);
        setSuccessMessage('Delete was successful, refreshing...');
        setTimeout(() => {
          navigate(`/posts/${postid}`);
        }, 2000);
        break;
      default:
        console.log(response);
    }
  }

  return (
    <div className="list-group-item">
      <div className="d-flex w-100 justify-content-between mb-1">
        <h5>{comment.name}</h5>
        <small>{comment.timestamp_formatted_datetime}</small>
      </div>
      <p className="mb-2">{comment.text}</p>
      <div className="d-flex gap-4">
        <button className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}>
          Delete
        </button>
        {
          errorMessages.length 
          ?
          errorMessages.map((error, index) => {
            return (
              <div className="alert alert-danger d-flex align-items-center px-2 py-1 mb-0" key={index}>
                <small>{error}</small>
              </div>
            )
          })
          :
          ''
        }
        {
          successMessage
          ?
          <div className="alert alert-success d-flex align-items-center px-2 py-1 mb-0" role="alert">
            {successMessage}
          </div>
          :
          ''
        }
      </div>
    </div>
  )
}