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
} from "react-bootstrap";
import { Grid, Paper } from "@material-ui/core";
import GuardianModalImage from "../resource/GuardianModalImage.jpg";
import axios from "axios";

class GuardianModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetNum: -1,
      isShowAlert: false,
      message: "",
      isSuccess: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange(event) {
    this.setState({ targetNum: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/guard/${this.props.name}/${this.state.targetNum}`
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
          <Modal.Title id="contained-modal-title-vcenter">
            请保护重要之人
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div>
              {this.state.isShowAlert && (
                <Alert
                  variant={this.state.isSuccess ? "success" : "danger"}
                  onClick={this.handleAlertClick}
                >
                  {this.state.message}
                </Alert>
              )}
            </div>
            <Image
              src={GuardianModalImage}
              alt="guardian modal image"
              rounded
            />
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={3}
              style={{ marginTop: 0 }}
            >
              <Grid item xs={6}>
                <input
                  type="number"
                  placeholder="target seat number"
                  onChange={this.handleChange}
                />
                <div
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default GuardianModal;
