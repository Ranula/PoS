import React from "react";
import { Link } from "react-router-dom";
// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div className="text-center">
    <h1>
      <a href="/#/">Home</a>
    </h1>
    <ul className="nav-menu">
      <li className="lead">
        <Link to="/Login">Login</Link>
      </li>
      <li className="lead">
        <Link to="/Signup">Signup</Link>
      </li>
    </ul>
  </div>
);
export default Header;