import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import UserProfile from './UserProfile';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">HealthHub</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/project">Project</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-task">Add Task</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/task">Task Board</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link> {/* Match styling with others */}
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {location.pathname !== '/demo' && (
              <>
                <li className="nav-item" style={{ marginRight: '80px' }}>
                  <Logout />
                </li>
                <li className="nav-item">
                  <UserProfile />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#f08080', // Light background color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
};

export default Navbar;
