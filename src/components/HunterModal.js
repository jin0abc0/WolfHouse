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
import HunterModalImage from "../resource/HunterModalImage.jpg";
import axios from "axios";

class HunterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      message: "",
      isSuccess: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(event) {
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
          <Modal.Title id="contained-modal-title-vcenter">
            猎人请查看开枪状态
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
            <Image src={HunterModalImage} alt="hunter modal image" rounded />
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={3}
              style={{ marginTop: 0 }}
            >
              <Grid item xs={6}>
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
                    Check
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default HunterModal;
