import '../styles/App.css';
import Login from './Login';
import useToken from './useToken';

function App() {
  const { token, setToken, clearToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      Logged in. Display cms page.
      Your token is {token}
      <button onClick={clearToken}>Log out</button>
    </div>
  );
}

export default App;
