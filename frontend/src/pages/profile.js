import React from "react";
import Navbar from "../components/Navbar";
import "../dashboard.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="dashboard-bg">
        <div className="dashboard-grid">
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="avatar">👨‍🎓</div>
              <h3>John Doe</h3>
              <p>STR2024001</p>
            </div>
            <nav className="sidebar-nav">
              <Link to="/dashboard" className="nav-item">📊 Dashboard</Link>
              <Link to="/dashboard/vouchers" className="nav-item">🎫 My Vouchers</Link>
              <Link to="/dashboard/applications" className="nav-item">📋 Applications</Link>
              <Link to="/dashboard/profile" className="nav-item active">👤 Profile</Link>
              <Link to="/dashboard/support" className="nav-item">📞 Support</Link>
            </nav>
          </aside>
          <main className="main-content">
            <div className="page-header">
              <h2 className="page-title">Profile</h2>
              <p className="page-subtitle">View and update your profile information</p>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Personal Details</h3>
                <button className="btn btn-primary">Edit Profile</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                <div>
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Student ID:</strong> STR2024001</p>
                  <p><strong>Email:</strong> johndoe@email.com</p>
                  <p><strong>Course:</strong> Computer Science</p>
                  <p><strong>Year of Study:</strong> 2</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="avatar" style={{ margin: "0 auto 15px", fontSize: "3em" }}>👨‍🎓</div>
                  <span style={{ color: "#1976d2", fontWeight: 600 }}>Meal Aid Beneficiary</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Profile;