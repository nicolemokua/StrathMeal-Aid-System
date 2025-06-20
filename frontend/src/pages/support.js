import React from "react";
import Navbar from "../components/Navbar";
import "../dashboard.css";
import { Link } from "react-router-dom";

function Support() {
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
              <Link to="/dashboard/profile" className="nav-item">👤 Profile</Link>
              <Link to="/dashboard/support" className="nav-item active">📞 Support</Link>
            </nav>
          </aside>
          <main className="main-content">
            <div className="page-header">
              <h2 className="page-title">Support</h2>
              <p className="page-subtitle">Contact support for help</p>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Get in Touch</h3>
                <button className="btn btn-outline">Email Support</button>
              </div>
              <div style={{ marginBottom: 20 }}>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@strathmeal.com" style={{ color: "#1976d2" }}>
                    support@strathmeal.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +254 700 000 000
                </p>
                <p>
                  <strong>Help Desk:</strong> Main Cafeteria, Strathmore University
                </p>
              </div>
              <div className="content-section" style={{ background: "#f8f9fa" }}>
                <h4 style={{ color: "#1976d2" }}>Frequently Asked Questions</h4>
                <ul style={{ color: "#555", marginTop: 10 }}>
                  <li>How do I apply for meal aid?</li>
                  <li>How do I use my voucher?</li>
                  <li>Who do I contact for urgent help?</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Support;