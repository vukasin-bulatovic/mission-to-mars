import React from "react";
import "./Header.scss";
import logo from "./logo.png";
import { useHistory } from "react-router";

function Header() {
  const history = useHistory();
  const handle = () => {
    history.push("/");
  };
  return (
    <div className="header">
      <img className="logo" src={logo} onClick={handle} alt="" />
    </div>
  );
}

export default Header;
