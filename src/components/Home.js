import React, { Component } from "react";
import {
  Navbar,
  Button,
  Nav,
  Form,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Grid, Paper } from "@material-ui/core";
import BackgroundVideo from "../resource/wolf.mp4";
import CreateRoomModal from "./CreateRoomModal";
import "./Home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EnterRoomModal from "./EnterRoomModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomNum: -1,
      isShowCreateRoomModal: false,
      isShowEnterRoomModal: false,
    };
    this.closeCreateRoomModal = this.closeCreateRoomModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEnterRoomModal = this.closeEnterRoomModal.bind(this);
  }
  closeCreateRoomModal() {
    this.setState({ isShowCreateRoomModal: false });
  }
  closeEnterRoomModal() {
    this.setState({ isShowEnterRoomModal: false });
  }
  handleChange(event) {
    this.setState({ roomNum: event.target.value });
    console.log(this.state.roomNum);
  }

  render() {
    const eventhandler = (data) => {
      this.setState({ role: data.role, number: data.number });
    };
    return (
      <header class="v-header container">
        <div class="fullscreen-video-wrap">
          <video autoPlay muted loop>
            <source src={BackgroundVideo} type="video/mp4" />
          </video>
        </div>
        <div class="header-overlay"></div>
        <div class="header-content text-md-center">
          <h1>Welcome Everyone</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
            temporibus perferendis necessitatibus numquam amet impedit
            explicabo? Debitis quasi ullam aperiam!
          </p>
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={3}
            style={{ marginTop: 20 }}
          >
            <Grid item xs={4}>
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ isShowCreateRoomModal: true });
                  console.log("create new room button cliked");
                }}
              >
                create a new room
              </Button>
            </Grid>
            <Grid item xs={4}>
              <input
                type="number"
                name="roomNum"
                placeholder="room number"
                onChange={this.handleChange}
              />
              <div classname="enterButtom" style={{ marginTop: 10 }}>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.setState({ isShowEnterRoomModal: true });
                    console.log("enter room button cliked");
                  }}
                >
                  enter an existing room
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <CreateRoomModal
          show={this.state.isShowCreateRoomModal}
          onHide={this.closeCreateRoomModal}
        />
        <EnterRoomModal
          show={this.state.isShowEnterRoomModal}
          onHide={this.closeEnterRoomModal}
          roomnum={this.state.roomNum}
        />
      </header>
    );
  }
}

export default Home;
