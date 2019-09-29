import React, { Component } from "react";

// CSS
import "./Logo.css";

class Logo extends Component {
  render() {
    const logoUrl =
      "https://miro.medium.com/max/979/1*cHv3GloBXiaWQ1Y8TVW7Ew.png";

    return (
      <a href="/">
        <div className="LogoDiv">
          <img src={logoUrl} alt="GIPHY LOGO" className="LogoImg"></img>
        </div>
      </a>
    );
  }
}
export default Logo;
