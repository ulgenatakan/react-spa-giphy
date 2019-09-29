import React, { Component } from "react";
import PropTypes from "prop-types";

// CSS
import "./SearchBox.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

// Prevent fontawesome from dynamically adding its css since we did it manually above

class SearchBox extends Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    change: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    keyPress: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    searched: PropTypes.func
  };

  static defaultProps = {
    type: "text",
    value: "",
    className: null,
    placeholder: "Bir gif ara!",
    keyPress: null,
    onClick: null,
    disabled: false
  };
  render() {
    return (
      <div className="SearchBox">
        <input
          type={this.props.type}
          className="Input"
          value={this.props.value}
          onChange={this.props.change}
          placeholder={this.props.placeholder}
          onKeyDown={this.props.keyPress}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
        />
        <div className="Button" onClick={this.props.searched}>
          <span className="FlipH">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>
    );
  }
}
export default SearchBox;
