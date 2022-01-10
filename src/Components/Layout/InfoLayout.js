import React from "react";

const InfoLayout = ({ heading, content }) => {
  return (
    <div className="pt-3">
      <h2 className="text-center">{heading}</h2>
      <p className="pt-2">{content}</p>
      <hr />
    </div>
  );
};

export default InfoLayout;
