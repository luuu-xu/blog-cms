import '../styles/App.css';
import Login from './Login';
import useToken from '../components/useToken';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const { token, setToken, clearToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <Navbar clearToken={clearToken} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;
