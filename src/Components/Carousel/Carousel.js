import React from "react";
import { useState, useEffect } from "react";
import Picture from "../Picture/Picture";
import "./Carosel.scss";

function Carosel({ data, endPoint, load }) {
  const { desktop, tablet, mobile } = endPoint;
  const [width, setWidth] = useState(window.innerWidth);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [dotsNum, setDotsNum] = useState(0);
  const [dot, setDotNum] = useState(1);
  const dots = [];
  for (let i = 1; i <= dotsNum; i++) {
    dots.push(i);
  }

  useEffect(() => {
    const widthValue = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", widthValue);
    if (width > 768) {
      setEnd(desktop);
    } else if (width <= 768 && width > 360) {
      setEnd(tablet);
    } else {
      setEnd(mobile);
    }
  }, [width, desktop, mobile, tablet]);

  useEffect(() => {
    if (data) {
      if (width > 768) {
        setDotsNum(Math.floor(data.data.length / desktop));
      } else if (width <= 768 && width > 360) {
        setDotsNum(Math.floor(data.data.length / tablet));
      } else {
        setDotsNum(Math.floor(data.data.length / mobile));
      }
    }
  }, [data, width, desktop, tablet, mobile]);

  const rightArrowFunction = () => {
    setDotNum(dot + 1);
    if (width > 768) {
      setEnd(end + desktop);
      setStart(start + desktop);
    } else if (width <= 768 && width > 375) {
      setEnd(end + tablet);
      setStart(start + tablet);
    } else {
      setEnd(end + mobile);
      setStart(start + mobile);
    }
  };

  const leftArrowFunction = () => {
    setDotNum(dot - 1);
    if (width > 768) {
      setEnd(end - desktop);
      setStart(start - desktop);
    } else if (width <= 768 && width > 375) {
      setEnd(end - tablet);
      setStart(start - tablet);
    } else {
      setEnd(end - mobile);
      setStart(start - mobile);
    }
  };

  return (
    <div className="slider">
      <div className="carosel">
        {start !== 0 && (
          <button onClick={leftArrowFunction} className="arrow-left">
            <i className="fas fa-arrow-left" />
          </button>
        )}
        {data &&
          data.data
            .map((image, id) => <Picture info={image} key={id} />)
            .slice(start, end)}
        {data && end < data.data.length && (
          <button onClick={rightArrowFunction} className="arrow-right">
            <i className="fas fa-arrow-right" />
          </button>
        )}
      </div>
      <div className="rings">
        {dots.map((singleDot) => (
          <span
            key={singleDot}
            className={`ringSpan ${dot === singleDot && `background`}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carosel;
