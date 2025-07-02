import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterType from "./pages/RegisterType";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterDonor from "./pages/RegisterDonor";
import RegisterCafeteria from "./pages/RegisterCafeteria";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import CafeteriaDashboard from "./components/CafeteriaDashboard";
import DonorDashboard from "./components/DonorDashboard";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Support from "./pages/support";
import AboutUs from "./pages/AboutUs";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import Cafeteria from "./pages/Cafeteria";
import Donor from "./pages/Donor";
import AdminLogin from "./pages/AdminLogin";

// Simple authentication check (replace with real auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem("userLoggedIn");
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Dashboard subroutes */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute>
                <Student />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/cafeteria"
            element={
              <ProtectedRoute>
                <Cafeteria />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/donor"
            element={
              <ProtectedRoute>
                <Donor />
              </ProtectedRoute>
            }
          />
          {/* Remove /dashboard/vouchers route */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cafeteria"
            element={
              <ProtectedRoute>
                <CafeteriaDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor"
            element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/support" element={<Support />} />
          <Route path="/register-type" element={<RegisterType />} />
          <Route path="/register/student" element={<RegisterStudent />} />
          <Route path="/register/donor" element={<RegisterDonor />} />
          <Route path="/register/cafeteria" element={<RegisterCafeteria />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
