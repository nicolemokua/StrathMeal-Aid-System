import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove login flag
    localStorage.removeItem("userLoggedIn");
    // Redirect to login page immediately
    navigate("/login", { replace: true });
  }, [navigate]);

  // Optionally, you can return null or a loading spinner here
  return null;
}

export default Logout;