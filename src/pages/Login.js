import '../styles/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      if (response.status === 401) {
        return;
      }
      const data = await response.json();
      const token = data.token;
      return token;
    })
    .catch(err => console.log(err));
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (!token) {
      setErrorMessage('Authentication failed');
    } else {
      setToken(token);
      navigate('/posts');
    }
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h1 className='mb-4'>Blog CMS</h1>
      <div className='row mb-3'>
        <label className='form-label'>
          Username*
          <input className='form-control' type='text' name='username' required onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div className='row mb-3'>
        <label className='form-label'>
          Password*
          <input className='form-control' type='password' name='password' required onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <button className='btn btn-primary mb-3' type='submit'>Log In</button>
      {
        errorMessage
        ?
        <div className="alert alert-danger d-flex align-items-center px-3 py-2">
          <div>{errorMessage}</div>
        </div>
        :
        ''
      }
    </form>
  );
}