import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, [navigate]);

  return <div>React App</div>;
};

export default App;
