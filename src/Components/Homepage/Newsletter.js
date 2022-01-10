import React from "react";

const Newsletter = () => (
  <div className="container mb-5">
    <div className="col-md-6 offset-md-3 py-4">
      <hr />
    </div>
    <div className="newsletter-container container text-center align-items-center justify-content-center">
      <div className="col-md-6 offset-md-3 pb-5 text-center">
        <div className="pt-5">
          <h2>JOIN OUR NEWSLETTER</h2>
        </div>
        <div className="col-md-8 offset-md-2 pt-2 text-center">
          Subscribe our newsletter to receive the latest news and exclusive
          offers every week.
        </div>
        <div className="pt-2">
          <input
            type="text"
            className="newsletter-input text-center bg-light"
            placeholder="Enter your email"
          />
        </div>
        <div className="pt-2">
          <button
            type="button"
            className="newsletter-btn btn btn-dark pt-2 text-center"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;
