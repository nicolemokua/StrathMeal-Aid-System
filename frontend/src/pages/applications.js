import React from "react";
import Navbar from "../components/Navbar";
import "../dashboard.css";
import { Link } from "react-router-dom";

function Applications() {
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
              <Link to="/dashboard/applications" className="nav-item active">📋 Applications</Link>
              <Link to="/dashboard/profile" className="nav-item">👤 Profile</Link>
              <Link to="/dashboard/support" className="nav-item">📞 Support</Link>
            </nav>
          </aside>
          <main className="main-content">
            <div className="page-header">
              <h2 className="page-title">Applications</h2>
              <p className="page-subtitle">Track your meal aid applications</p>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Recent Applications</h3>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jun 01, 2025</td>
                    <td><span className="status-badge status-approved">Approved</span></td>
                    <td>Eligible for June</td>
                  </tr>
                  <tr>
                    <td>May 01, 2025</td>
                    <td><span className="status-badge status-rejected">Rejected</span></td>
                    <td>Incomplete documents</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Applications;