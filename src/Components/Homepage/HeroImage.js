import React from "react";
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Discover the Supplement World</h1>

        <h2 className="hero-subtitle">
          We offer the best supplements and vitamins for your health!
        </h2>
        <Link to="/products">
          <button type="button" className="hero-button btn btn-dark btn-lg">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroImage;
