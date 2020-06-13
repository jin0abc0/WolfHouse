import React, { Component } from "react";
import { Modal, Button, Row, Col, Container, Image } from "react-bootstrap";
import FlipCard from "./FlipCard";

class RoleModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Your role:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <FlipCard
              frontCardPath="./cover.jpg"
              backCardPath={`./${this.props.role}.jpg`}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default RoleModal;
