import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MicroIntoScreenTwo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>A Tough Call</h3>
      <p>
        This is your first solo loan assignment. Think through the options
        carefully.
      </p>

      <Button onClick={() => navigate("/level")}>Help Zuri</Button>
    </div>
  );
};

export default MicroIntoScreenTwo;
