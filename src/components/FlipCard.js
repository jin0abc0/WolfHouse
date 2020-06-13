import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";
import { Figure } from "react-bootstrap";

class FlipCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <Figure.Image
          src={require(`${this.props.frontCardPath}`)}
          onClick={this.handleClick}
          rounded
        />

        <Figure.Image
          src={require(`${this.props.backCardPath}`)}
          onClick={this.handleClick}
          rounded
        />
      </ReactCardFlip>
    );
  }
}
export default FlipCard;
