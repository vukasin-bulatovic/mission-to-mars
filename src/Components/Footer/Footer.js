import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const location = useLocation();
  const prevent = location.pathname === "/intro";
  const disableLink = (e) => {
    prevent && e.preventDefault();
  };
  return (
    <div className="footer">
      {prevent ? null : (
        <>
          <Link onClick={disableLink} className="footer-content" to="/privacy">
            Privacy Notice
          </Link>

          <Link onClick={disableLink} className="footer-content" to="/terms">
            Terms of Service
          </Link>
        </>
      )}
    </div>
  );
}

export default Footer;
