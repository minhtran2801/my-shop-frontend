import React from "react";
import AboutBanner from "../../assets/about/about.jpg";

const About = () => (
  <div className="container">
    <div className="col-md-6 offset-md-3 py-4">
      <hr />
    </div>
    <div className="row">
      <div className="col-12 pb-5 text-center">
        <h2>ABOUT US</h2>
      </div>
      <div className="col-12 pb-5 text-center">
        <img src={AboutBanner} alt="about" className="product-img" />
      </div>
      <div className="col-md-6 offset-md-3 text-center">
        Lam Ngoc Pharmacy is Vietnam’s leading natural health and supplement
        retailer. Based on the vision of our founder Ngoc Pham, we are
        passionate about natural health and inspiring people to take control of
        and invest in their wellbeing. We develop high quality products and
        services that deliver a more natural approach to health, based on our
        expertise in vitamins, minerals, herbs and nutrients.
      </div>
    </div>
  </div>
);

export default About;
