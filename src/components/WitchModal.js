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
import WitchModalImage from "../resource/WitchModalImage.jpg";
import axios from "axios";

class WitchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetNum: -1,
      isShowAlert: false,
      message: "",
      isSuccess: false,
      victimNum: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handlePoisonClick = this.handlePoisonClick.bind(this);
    this.handleAntidoteClick = this.handleAntidoteClick.bind(this);
    this.checkKilled = this.checkKilled.bind(this);
    this.timer = null;
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    this.setState({ targetNum: event.target.value });
  }

  handleAlertClick() {
    this.setState({ isShowAlert: false });
  }

  handlePoisonClick(event) {
    event.preventDefault();
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/poison/${this.props.name}/${this.state.targetNum}`
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

  handleAntidoteClick(event) {
    event.preventDefault();
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/antidote/${this.props.name}`
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

  checkKilled() {
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.roomnum}/killed/${this.props.name}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          this.setState({
            isShowAlert: true,
            message: response.data.reason,
            isSuccess: response.data.status,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.checkKilled();
    this.timer = setInterval(() => this.checkKilled(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
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
            请开始你的表演:)
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
            <Image src={WitchModalImage} alt="witch modal image" rounded />
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={3}
              style={{ marginTop: 0 }}
            >
              <Grid item xs={4}>
                <Button variant="success" onClick={this.handleAntidoteClick}>
                  救
                </Button>
              </Grid>
              <Grid item xs={4}>
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
                    onClick={this.handlePoisonClick}
                  >
                    毒
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
export default WitchModal;
