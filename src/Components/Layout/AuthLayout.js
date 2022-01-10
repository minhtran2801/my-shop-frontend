import React from "react";
import Navbar from "../Navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="grid-box">
        <div className="bg-image"></div>
        <div className="center-box">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
