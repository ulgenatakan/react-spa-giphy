import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import BottomScrollListener from "react-bottom-scroll-listener";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";

// Components
import Card from "../UI/Card";
import SearchBox from "../UI/SearchBox";

// CSS
import "./Home.css";

class Home extends Component {
  state = {
    trendingURL:
      "http://api.giphy.com/v1/gifs/trending?api_key=LyU9AdnG3N4Nw2UTV2Z8AkvvTWfjkJL1&limit=20",
    searchURL:
      "http://api.giphy.com/v1/gifs/search?api_key=LyU9AdnG3N4Nw2UTV2Z8AkvvTWfjkJL1&limit=20",
    searchBox: "",
    searchedString: "",
    isTrendingPage: true,
    trendingGifs: [],
    autoPlay: true,
    offset: 0
  };

  // Handles Input Change By Value
  inputChangeHandler = (key, value) => {
    const currentState = { ...this.state };
    currentState[key] = value;
    this.setState({ ...currentState });
  };

  // Get Giphy Gifs Depending On URL
  getGifs = (url, offset) => {
    axios.get(`${url}&offset=${offset}`).then(response => {
      if (offset === 0) {
        this.setState({
          trendingGifs: response.data.data
        });
      } else {
        this.setState({
          trendingGifs: this.state.trendingGifs.concat(response.data.data)
        });
      }
    });
  };

  // Get Giphy Gifs Depending On URL
  stop = () => {
    this.setState({
      autoPlay: !this.state.autoPlay
    });
  };

  // Handle InfiniteScroll
  handleOnDocumentBottom = () => {
    this.getGifs(this.state.trendingURL, this.state.offset + 20);
    this.setState({
      offset: this.state.offset + 20
    });
  };

  // Handle String Search GIF
  searchGif = () => {
    this.getGifs(`${this.state.searchURL}&q=${this.state.searchBox}`, 0);
    this.setState({
      isTrendingPage: false,
      searchedString: this.state.searchBox,
      offset: 0
    });
  };

  // Handle Load More Button
  loadMore = () => {
    this.getGifs(
      `${this.state.searchURL}&q=${this.state.searchedString}`,
      this.state.offset + 20
    );
    this.setState({
      offset: this.state.offset + 20
    });
  };

  // Initialize GIFs on load
  componentDidMount() {
    this.getGifs(this.state.trendingURL, 0);
  }
  render() {
    return (
      <Container>
        <div className="Home">
          <SearchBox
            change={e => this.inputChangeHandler("searchBox", e.target.value)}
            placeholder="Bir GIF ara!"
            value={this.state.searchBox}
            type="text"
            searched={this.searchGif}
          />
          {!this.state.isTrendingPage ? (
            <Row>
              <Col xs={12}>
                <h1 className="SearchTitle">{this.state.searchedString}</h1>
                <h2 className="SearchSubTitle">
                  {this.state.trendingGifs.length} GIFs are listed.
                </h2>
              </Col>
            </Row>
          ) : null}
          {this.state.trendingGifs.length > 0 ? (
            <Row>
              <Col xs={12}>
                {this.state.isTrendingPage ? (
                  <h2 className="Title">Trending GIFs</h2>
                ) : null}
                <div className="AutoPlay" onClick={this.stop}>
                  <div className="Left">
                    <div className="Button">
                      <span>
                        <FontAwesomeIcon icon={faPause} />
                      </span>
                    </div>
                  </div>
                  <div className="Right">
                    <div className="Button">
                      <span>
                        <FontAwesomeIcon icon={faPlay} />
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="RightTitle">Auto Play</h2>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Row>
                {this.state.trendingGifs
                  .filter((gif, i) => i % 4 === 0)
                  .map(gif => (
                    <Col xs={12} key={JSON.stringify(gif)}>
                      <Card
                        url={gif.images.fixed_width.url}
                        desc={gif.slug}
                        still={gif.images.original_still.url}
                        autoPlay={this.state.autoPlay}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Row>
                {this.state.trendingGifs
                  .filter((gif, i) => i % 4 === 1)
                  .map(gif => (
                    <Col xs={12} key={JSON.stringify(gif)}>
                      <Card
                        url={gif.images.fixed_width.url}
                        desc={gif.slug}
                        still={gif.images.original_still.url}
                        autoPlay={this.state.autoPlay}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Row>
                {this.state.trendingGifs
                  .filter((gif, i) => i % 4 === 2)
                  .map(gif => (
                    <Col xs={12} key={JSON.stringify(gif)}>
                      <Card
                        url={gif.images.fixed_width.url}
                        desc={gif.slug}
                        still={gif.images.original_still.url}
                        autoPlay={this.state.autoPlay}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Row>
                {this.state.trendingGifs
                  .filter((gif, i) => i % 4 === 3)
                  .map(gif => (
                    <Col xs={12} key={JSON.stringify(gif)}>
                      <Card
                        url={gif.images.fixed_width.url}
                        desc={gif.slug}
                        still={gif.images.original_still.url}
                        autoPlay={this.state.autoPlay}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
          {this.state.trendingGifs.length === 0 ? (
            <div>
              <h2 className="NoTitle"> There is no available GIFs.</h2>
              <img
                className="NoImage"
                src="https://nerde.co/assets/7963c6d4.svg"
                alt="No GIF"
              />
              <a href="/">
                <h2 className="GoBack">
                  {" "}
                  Click Here & Go Back To The Trending GIFs
                </h2>
              </a>
            </div>
          ) : null}
        </div>
        {this.state.isTrendingPage ? (
          <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
        ) : null}
        {!this.state.isTrendingPage && this.state.trendingGifs.length > 0 ? (
          <button onClick={this.loadMore} className="LoadMore">
            Load More
          </button>
        ) : null}
      </Container>
    );
  }
}
export default Home;
