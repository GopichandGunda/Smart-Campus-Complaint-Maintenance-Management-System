import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>📋 Smart Campus</h2>
        </Link>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </div>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <span className="navbar-user">
                {user.name} ({user.role})
              </span>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-outline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
