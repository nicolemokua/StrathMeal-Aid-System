import React, { useEffect } from "react";
import Dashboard from "./Dashboard";

export default function Student() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:5000/api/application-eligibility", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.last_status !== "Approved") {
          localStorage.setItem("studentEligible", "false");
          window.location.href = "/";
        }
      });
  }, []);

  return <Dashboard />;
}