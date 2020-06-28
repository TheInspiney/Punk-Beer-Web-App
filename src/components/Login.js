import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "../css/login.css";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <h1 className="heading">Love Beers</h1>
        <div className="login-form">
          <h1>Sign in</h1>
          <div className="links">
            <a href="#" class="fb btn">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="twitter btn">
              <i class="fab fa-twitter-square"></i>
            </a>
            <a href="#" class="google btn">
              <i class="fab fa-google fa-fw"></i>
            </a>
            <br />
            <Link to="/beers" class="link">
              <span>Beers</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
