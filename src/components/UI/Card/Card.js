import React, { Component } from "react";
import PropTypes from "prop-types";
import GifPlayer from "react-gif-player";
// Components

// CSS
import "./Card.css";

class Card extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    still: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className="Card">
        <GifPlayer
          gif={this.props.autoPlay ? this.props.url : this.props.still}
          still={this.props.still}
          autoplay={this.props.autoPlay}
        ></GifPlayer>
      </div>
    );
  }
}
export default Card;
