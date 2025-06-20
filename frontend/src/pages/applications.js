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
              <p className="page-subtitle">Track your meal aid applications and their status</p>
            </div>
            <div className="stats-grid" style={{ marginBottom: 40 }}>
              <div className="stat-card" style={{ background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)" }}>
                <div className="stat-number">2</div>
                <div className="stat-label">Applications Submitted</div>
              </div>
              <div className="stat-card" style={{ background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)" }}>
                <div className="stat-number">1</div>
                <div className="stat-label">Approved</div>
              </div>
              <div className="stat-card" style={{ background: "linear-gradient(135deg, #ff7675 0%, #fdcb6e 100%)" }}>
                <div className="stat-number">1</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Recent Applications</h3>
                <button className="btn btn-primary">New Application</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jun 01, 2025</td>
                    <td><span className="status-badge status-approved">Approved</span></td>
                    <td>Eligible for June</td>
                    <td>
                      <button className="btn btn-outline">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>May 01, 2025</td>
                    <td><span className="status-badge status-rejected">Rejected</span></td>
                    <td>Incomplete documents</td>
                    <td>
                      <button className="btn btn-primary">Resubmit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="content-section" style={{ background: "#f8f9fa" }}>
              <div className="section-header">
                <h3 className="section-title" style={{ color: "#1976d2" }}>How to Apply</h3>
              </div>
              <ol style={{ color: "#555", marginLeft: 20 }}>
                <li>Click the <b>New Application</b> button above.</li>
                <li>Fill in your details and upload required documents.</li>
                <li>Submit and track your application status here.</li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Applications;