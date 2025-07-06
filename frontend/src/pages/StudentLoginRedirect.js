import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentLoginRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // If student is eligible, redirect to dashboard
    if (localStorage.getItem("studentEligible") === "true") {
      navigate("/student", { replace: true });
    } else {
      // If not eligible, redirect to homepage to prompt application
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return null;
}

export default StudentLoginRedirect;
