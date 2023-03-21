import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../components/useToken";

export default function NewPost() {
  const { token } = useToken();
  const [post, setPost] = useState({
    title: '',
    text: '',
    is_published: false,
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/api/posts`,
      {
        method: "POST",
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
        setErrorMessages([...errorMessages, 'Error creating post']);
        break;
      case 400:
        const data = await response.json();
        const errors = data.errors;
        setErrorMessages(errors);
        break;
      case 200:
        setErrorMessages([]);
        setSuccessMessage('Create was successful, redirect to home...');
        setTimeout(() => {
          navigate("/");
        }, 3000);
        break;
      default:
        console.log(response);
    }
  }

  return (
    <main>
      <form className="container">
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
        <div className="mb-3 form-check form-switch">
          <label className="form-check-label" htmlFor="published">Publish?</label>
          <input className="form-check-input" type="checkbox" id="published" name="published" role="switch"
            checked={post.is_published}
            onChange={(e) => {setPost({...post, is_published: e.target.checked})}}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {
          errorMessages.length 
          ?
          errorMessages.map((error, index) => {
            return (
              <div className="alert alert-danger d-flex align-items-center" key={index}>
                <div>{error.msg}</div>
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
    </main>
  );

}