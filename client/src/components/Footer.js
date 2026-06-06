import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* 1. About Section */}
        <div className="footer-about">
          <h3>About Findy</h3>
            <p>Findy is a platform designed to help users report, search for, and recover lost or found items within a campus or community.</p> 
            <p>The platform allows users to securely register and log in, create posts for lost or found items, upload item details and images, search, and manage their own posts through a personalized profile.</p> 
            <p>Findy provides a centralized and efficient solution for connecting people who have lost belongings with those who have found them. </p> 
        </div>

        {/* 2. Quick Links Section */}
        <div className="footer-links-section">
          <h3>Quick Links</h3>
          <div className="footer-links-grid">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-item">Post an Item</Link>
            <Link to="/profile">My Profile</Link>
          </div>
        </div>

      </div>

      {/* 3. Bottom Copyright Line */}
      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p>Made with ❤️ by Vivek.</p>
        <p>&copy; {new Date().getFullYear()} Findy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;