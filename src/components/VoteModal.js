import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Form,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";

class VoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      message: "",
      isSuccess: false,
    };
    this.handleVoteOnClick = this.handleVoteOnClick.bind(this);
    this.handleViewHistoryOnClick = this.handleViewHistoryOnClick.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleVoteOnClick(event) {
    event.preventDefault();
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/shoot/${this.props.name}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          isShowAlert: true,
          message: response.data.reason,
          isSuccess: response.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleViewHistoryOnClick(event) {
    event.preventDefault();
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/shoot/${this.props.name}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          isShowAlert: true,
          message: response.data.reason,
          isSuccess: response.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAlertClick() {
    this.setState({ isShowAlert: false });
  }

  handleClose() {
    this.setState({ isShowAlert: false, message: "" });
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Vote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {this.state.isShowAlert && (
              <Alert
                variant={this.state.isSuccess ? "primary" : "danger"}
                onClick={this.handleAlertClick}
              >
                {this.state.message}
              </Alert>
            )}
          </div>
          <Container>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>投票</Form.Label>
                  <Form.Control placeholder="Round" />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>.</Form.Label>
                  <Form.Control placeholder="To whom (seat number)" />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Vote
              </Button>
            </Form>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>查看历史票型</Form.Label>
                  <Form.Control placeholder="Round" />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                View History
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default VoteModal;
