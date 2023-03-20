import '../styles/App.css';
import Login from './Login';
import useToken from '../components/useToken';
import Home from './Home';

function App() {
  const { token, setToken, clearToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} token={token} />;
  }

  return <Home clearToken={clearToken} />;
}

export default App;
