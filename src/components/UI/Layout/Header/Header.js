import React, { Component } from "react";
import { Container } from "react-bootstrap";

// Components
import Logo from "../../Logo";

// CSS
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <Container>
        <div className="Header">
          <div className="Logo">
            <Logo />
          </div>
          <a href="/">
            <button className="MainPage">Home Page</button>
          </a>
        </div>
      </Container>
    );
  }
}
export default Header;
