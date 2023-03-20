import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  }

  const clearToken = () => {
    sessionStorage.removeItem('token');
    // console.log('session removed');
    setToken();
    // console.log('settoken() ran the new token is', token)
  }

  return {
    token,
    setToken: saveToken,
    clearToken
  }
}