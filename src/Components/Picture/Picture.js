import React from "react";
import "./Picture.scss";

function Picture({ info }) {
  const { title, url, explanation } = info;
  return (
    <div className="picture">
      {info && (
        <div className="image-container">
          {" "}
          <img className="slide-img" src={url} alt="" />
        </div>
      )}
      {info && <h3>{title}</h3>}
      {info && <p>{explanation}</p>}
    </div>
  );
}

export default Picture;
