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
import EnterRoomImage from "../resource/EnterRoomPic.jpg";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

class EnterRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      isShowAlert: false,
      message: "",
      toRoomPage: false,
      birthday: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const playerName = this.state.playerName;
    axios
      .post(`https://wolf-house1.herokuapp.com/${this.props.roomnum}/ready`, {
        playerName: playerName,
        birthday: this.state.birthday,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ isShowAlert: !response.data.status });
        if (!response.data.status) {
          this.setState({ message: response.data.reason });
        } else {
          this.setState({ toRoomPage: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ playerName: event.target.value });
  }

  handleAlertClick() {
    this.setState({ isShowAlert: false });
  }

  handleClose() {
    this.setState({ isShowAlert: false, message: "" });
    this.props.onHide();
  }

  handleBirthdayChange(event) {
    this.setState({ birthday: event.target.value });
  }

  render() {
    if (this.state.toRoomPage) {
      return (
        <Redirect
          to={{
            pathname: `/${this.props.roomnum}/room`,
            state: {
              playerName: this.state.playerName,
              roomNum: this.props.roomnum,
            },
          }}
        />
      );
    }
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Please enter your user name:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div>
              {this.state.isShowAlert && (
                <Alert variant="primary" onClick={this.handleAlertClick}>
                  {this.state.message}
                </Alert>
              )}
            </div>
            <Image src={EnterRoomImage} alt="enter room image" rounded />
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={3}
              style={{ marginTop: 0 }}
            >
              <Grid item xs={4}>
                <Form>
                  <Form.Control
                    placeholder="user name"
                    onChange={this.handleChange}
                  />
                  <Form.Control
                    placeholder="birthday"
                    onChange={this.handleBirthdayChange}
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
                </Form>
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
export default EnterRoomModal;
