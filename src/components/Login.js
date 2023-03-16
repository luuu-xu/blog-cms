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

export default function Login({ setToken }) {
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
      <label>
        Username*
        <input type='text' name='username' required onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password*
        <input type='password' name='password' required onChange={e => setPassword(e.target.value)} />
      </label>
      <button type='submit'>Log In</button>
      <small>{errorMessage}</small>
    </form>
  );
}