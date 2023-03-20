import '../styles/Login.css';
import { useState } from 'react';

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

export default function Login({ setToken, token }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (!token) {
      setErrorMessage('Auth failed');
    } else {
      setToken(token);
    }
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <label className='form-label'>
        Username*
        <input className='form-control' type='text' name='username' required onChange={e => setUsername(e.target.value)} />
      </label>
      <label className='form-label'>
        Password*
        <input className='form-control' type='password' name='password' required onChange={e => setPassword(e.target.value)} />
      </label>
      <button className='btn btn-primary' type='submit'>Log In</button>
      <div className='error-message'>{errorMessage}</div>
      {/* <div>Your token is {token}</div> */}
    </form>
  );
}