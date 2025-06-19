import React from "react";
import Navbar from "../components/Navbar";
import "../dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-bg">
        <div className="dashboard-grid">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="avatar">👨‍🎓</div>
              <h3>John Doe</h3>
              <p>STR2024001</p>
            </div>
            <nav className="sidebar-nav">
              <Link to="/dashboard" className="nav-item active">📊 Dashboard</Link>
              <Link to="/dashboard/vouchers" className="nav-item">🎫 My Vouchers</Link>
              <Link to="/dashboard/applications" className="nav-item">📋 Applications</Link>
              <Link to="/dashboard/profile" className="nav-item">👤 Profile</Link>
              <Link to="/dashboard/support" className="nav-item">📞 Support</Link>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="main-content">
            <div className="page-header">
              <h2 className="page-title">Welcome Back, John!</h2>
              <p className="page-subtitle">Here's your meal aid status for today</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Available Vouchers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">45</div>
                <div className="stat-label">Meals This Month</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">✅</div>
                <div className="stat-label">Application Status</div>
              </div>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Today's Meal Vouchers</h3>
                <button className="btn btn-primary">View All</button>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="stat-card" style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" }}>
                  <div style={{ fontWeight: "bold", marginBottom: 10 }}>🍳 Breakfast</div>
                  <div style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 15px", display: "inline-block", marginBottom: 10 }}>BF2024001</div>
                  <div style={{ background: "white", color: "#333", borderRadius: 10, width: 80, height: 80, margin: "15px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>QR CODE</div>
                  <p>Valid until 10:00 AM</p>
                  <button className="btn" style={{ background: "rgba(255,255,255,0.2)", color: "white", marginTop: 15 }}>Use Now</button>
                </div>
                <div className="stat-card" style={{ background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)" }}>
                  <div style={{ fontWeight: "bold", marginBottom: 10 }}>🍽️ Lunch</div>
                  <div style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 15px", display: "inline-block", marginBottom: 10 }}>LN2024001</div>
                  <div style={{ background: "white", color: "#333", borderRadius: 10, width: 80, height: 80, margin: "15px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>QR CODE</div>
                  <p>Valid until 3:00 PM</p>
                  <button className="btn" style={{ background: "rgba(255,255,255,0.2)", color: "white", marginTop: 15 }}>Use Now</button>
                </div>
              </div>
            </div>
            <div className="content-section">
              <div className="section-header">
                <h3 className="section-title">Recent Meal History</h3>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Meal Type</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jun 06, 2025</td>
                    <td>Lunch</td>
                    <td>Main Cafeteria</td>
                    <td><span className="status-badge status-approved">Received</span></td>
                  </tr>
                  <tr>
                    <td>Jun 06, 2025</td>
                    <td>Breakfast</td>
                    <td>Main Cafeteria</td>
                    <td><span className="status-badge status-approved">Received</span></td>
                  </tr>
                  <tr>
                    <td>Jun 05, 2025</td>
                    <td>Dinner</td>
                    <td>Main Cafeteria</td>
                    <td><span className="status-badge status-approved">Received</span></td>
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

export default Dashboard;