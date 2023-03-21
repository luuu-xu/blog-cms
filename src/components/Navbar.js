import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "./useToken";

export default function Navbar({ clearToken }) {
  const { token } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <nav className="navbar navbar-expand-md bg-light mb-4">
      <div className="container-fluid">
        <a href="/posts" className="navbar-brand">Blog CMS</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav me-auto">
            <Link to="/posts" className="nav-link active" >Home</Link>
            <Link to="/posts/new" className="nav-link">New Post</Link>
          </ul>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Log out</button>
        </div>
      </div>
  </nav>
  );
}