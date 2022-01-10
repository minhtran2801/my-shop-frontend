import React from "react";
import { Link } from "react-router-dom";
import ShopMap from "./ShopMap";

const Footer = () => {
  const Location = () => (
    <div className="col-lg-3 col-xs-12 location">
      <h4 className="mt-lg-0 mt-sm-4 pt-3">Location</h4>
      <p className="pt-2">
        11 Heaton Street, Jesmond
        <br />
        2299, NSW, Australia
      </p>
      <p>
        <i className="fas fa-phone fa-fw fa-fw me-3"></i>0412-345-678
      </p>
      <p className="pt-1">
        <i className="far fa-envelope fa-fw me-3"></i>
        myadmin@gmail.com
      </p>
    </div>
  );

  const Explore = () => (
    <div className="col-lg-2 col-xs-12 links">
      <h4 className="mt-lg-0 mt-sm-3 ms-1 pt-3">Explore</h4>
      <ul className="m-0 p-0">
        <li>
          <Link className="footer-link p-2" to="/">
            Home<span className="sr-only">(current)</span>
          </Link>
        </li>
        <li>
          <Link className="footer-link p-2" to="/products">
            Shop
          </Link>
        </li>
      </ul>
    </div>
  );

  const FindUsOn = () => (
    <div className="col-lg-2 col-xs-12 links">
      <h4 className="mt-lg-0 mt-sm-3 pt-3">Find Us On</h4>
      <ul className="m-0 p-0">
        <li>
          <a href="https://www.facebook.com/">
            <p>
              <i className="fab fa-facebook fa-fw me-2"></i>Facebook
            </p>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/">
            <p>
              <i className="fab fa-instagram fa-fw me-2"></i>Instagram
            </p>
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com/">
            <p>
              <i className="fab fa-twitter fa-fw me-2"></i>Twitter
            </p>
          </a>
        </li>
        <li>
          <a href="https://www.LinkedIn.com/">
            <p>
              <i className="fab fa-linkedin-in fa-fw me-2"></i>LinkedIn
            </p>
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="pt-5 pb-3 bg-dark footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-xs-12">
            <ShopMap />
          </div>
          {Location()}
          {Explore()}
          {FindUsOn()}
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <small className="text-light ">
              © 2021. MINH TRAN’S PERSONAL PROJECT | ALL RIGHTS RESERVED
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
