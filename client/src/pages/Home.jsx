import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BarChart3, Zap } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Campus</h1>
          <h2>Complaint & Maintenance Management System</h2>
          <p>Streamline campus maintenance requests and track resolutions in real-time</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Report an Issue <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">1</div>
            <h3>Report Issue</h3>
            <p>Students submit maintenance complaints with detailed information</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">2</div>
            <h3>Admin Review</h3>
            <p>Admin reviews and assigns priority to complaints</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">3</div>
            <h3>Staff Assignment</h3>
            <p>Maintenance staff is assigned to resolve issues</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">4</div>
            <h3>Resolution</h3>
            <p>Staff updates progress and resolves the complaint</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">5</div>
            <h3>Feedback</h3>
            <p>Students rate and provide feedback on resolution</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">6</div>
            <h3>Track Analytics</h3>
            <p>Admin monitors trends and system performance</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Complaint Categories</h2>
        <div className="categories-grid">
          {['Electrical', 'Plumbing', 'Wi-Fi / Network', 'Classroom', 'Laboratory', 'Hostel', 'Cleaning', 'Furniture', 'Security', 'Other'].map((cat, idx) => (
            <div key={idx} className="category-badge">
              <CheckCircle size={20} />
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Key Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Users size={40} />
            <h3>For Students</h3>
            <p>Easily report issues and track resolution status in real-time</p>
          </div>
          <div className="benefit-card">
            <BarChart3 size={40} />
            <h3>For Admins</h3>
            <p>Centralized dashboard to manage and monitor all complaints</p>
          </div>
          <div className="benefit-card">
            <Zap size={40} />
            <h3>For Staff</h3>
            <p>Streamlined workflow to manage and complete assigned tasks</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our platform and improve campus maintenance management</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Smart Campus</h3>
          <p>Copyright © 2024 Smart Campus. All rights reserved.</p>
          <p>Built with ❤️ by <strong>Gunda Gopichand</strong></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
