import React, { Component } from "react";
import "./Room.css";
import RoomBackground from "../resource/roomBackground.jpg";
import {
  Navbar,
  Button,
  Nav,
  Form,
  FormControl,
  Container,
  Row,
  Col,
  Figure,
  Alert,
} from "react-bootstrap";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import RoleModal from "./RoleModal";
import WolfModal from "./WolfModal";
import ProphetModal from "./ProphetModal";
import WitchModal from "./WitchModal";
import GuardianModal from "./GuardianModal";
import HunterModal from "./HunterModal";
import VoteModal from "./VoteModal";

class Room extends Component {
  constructor(props) {
    super(props); // props: ocation.state.playerName, ocation.state.roomNum
    this.state = {
      players: [], // format: [{name: Alex, seatNum : 1, avatar: "avatar.png"}]
      isShowRoleModal: false,
      isShowWolfModal: false,
      isShowProphetModal: false,
      isShowWitchModal: false,
      isShowGuardianModal: false,
      isShowHunterModal: false,
      ableToChooseSeat: true,
      role: "",
      isShowLastNightInfo: false,
      lastNightInfo: "",
      isShowVoteModal: false,
    };
    this.closeRoleModal = this.closeRoleModal.bind(this);
    this.closeWolfModal = this.closeWolfModal.bind(this);
    this.closeProphetModal = this.closeProphetModal.bind(this);
    this.closeWitchModal = this.closeWitchModal.bind(this);
    this.closeGuardianModal = this.closeGuardianModal.bind(this);
    this.closeHunterModal = this.closeHunterModal.bind(this);
    this.uniqid = require("uniqid");
    this.timer = null;
    this.fetchPlayers = this.fetchPlayers.bind(this);
    this.handleAvatarOnClick = this.handleAvatarOnClick.bind(this);
    this.queryRole = this.queryRole.bind(this);
    this.handleUseSkillOnClick = this.handleUseSkillOnClick.bind(this);
    this.closeLastNightInfoAlert = this.closeLastNightInfoAlert.bind(this);
    this.handleLastNightInfoOnClick = this.handleLastNightInfoOnClick.bind(
      this
    );
    this.closeVoteModal = this.closeVoteModal.bind(this);
    this.handleVoteOnClick = this.handleVoteOnClick.bind(this);
  }

  closeRoleModal() {
    this.setState({ isShowRoleModal: false });
  }
  closeWolfModal() {
    this.setState({ isShowWolfModal: false });
  }
  closeProphetModal() {
    this.setState({ isShowProphetModal: false });
  }
  closeWitchModal() {
    this.setState({ isShowWitchModal: false });
  }
  closeGuardianModal() {
    this.setState({ isShowGuardianModal: false });
  }
  closeHunterModal() {
    this.setState({ isShowHunterModal: false });
  }
  closeVoteModal() {
    this.setState({ isShowVoteModal: false });
  }

  closeLastNightInfoAlert() {
    this.setState({ isShowLastNightInfo: false });
  }

  fetchPlayers() {
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.location.state.roomNum}/publicInfo`
      )
      .then((response) => {
        if (response.data.status) {
          this.setState({ players: response.data.playerPublicInfoList });
        } else {
          this.setState({ players: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchPlayers();
    this.queryRole();
    this.timer = setInterval(() => this.fetchPlayers(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  handleAvatarOnClick(index) {
    if (!this.state.ableToChooseSeat) {
      return;
    }
    if (this.state.players[index].name !== "available") {
      return;
    }
    const seatNum = index + 1;
    axios
      .post(
        `https://wolf-house1.herokuapp.com/${this.props.location.state.roomNum}/seat/${this.props.location.state.playerName}`,
        {
          seatNum: seatNum,
        }
      )
      .then((response) => {
        if (response.data.status) {
          const list = this.state.players.map((value, i) => {
            if (i === index) {
              return {
                name: this.props.location.state.playerName,
                seatNum: index + 1,
                avatar: response.data.avatar,
              };
            } else {
              return value;
            }
          });
          this.setState({ players: list, ableToChooseSeat: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  queryRole() {
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.location.state.roomNum}/role/${this.props.location.state.playerName}`
      )
      .then((response) => {
        if (response.data.status) {
          this.setState({ role: response.data.role });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUseSkillOnClick() {
    if (this.state.role === "wolf") {
      this.setState({ isShowWolfModal: true });
    } else if (this.state.role === "prophet") {
      this.setState({ isShowProphetModal: true });
    } else if (this.state.role === "witch") {
      this.setState({ isShowWitchModal: true });
    } else if (this.state.role === "guardian") {
      this.setState({ isShowGuardianModal: true });
    } else if (this.state.role === "hunter") {
      this.setState({ isShowHunterModal: true });
    }
  }

  handleLastNightInfoOnClick() {
    axios
      .get(
        `https://wolf-house1.herokuapp.com/${this.props.location.state.roomNum}/result`
      )
      .then((response) => {
        if (response.data.status) {
          this.setState({
            isShowLastNightInfo: true,
            lastNightInfo: response.data.reason,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleVoteOnClick() {
    this.setState({ isShowVoteModal: true });
  }

  render() {
    return (
      <header
        class="room-header"
        style={{
          backgroundImage: `url(${RoomBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div class="room-header-overlay"></div>
        <div class="room-header-container">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Wolf House</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#features">Introduction</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          <div class="inner-container">
            <Paper>
              <Grid
                container
                alignItems="center"
                justify="center"
                spacing={1}
                style={{ marginTop: 15 }}
              >
                {this.state.players.map((value, index) => {
                  return (
                    <Grid item xs={3} key={this.uniqid()}>
                      <Figure.Image
                        width={this.state.players.length > 12 ? 100 : 150}
                        height={this.state.players.length > 12 ? 100 : 150}
                        alt="seat"
                        src={require(`./${value.avatar}.png`)}
                        onClick={() => {
                          this.handleAvatarOnClick(index);
                        }}
                      />
                      <Figure.Caption>{`seat ${value.seatNum}: ${value.name}`}</Figure.Caption>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={3}
              style={{ marginTop: 20 }}
            >
              <Grid item xs={3}>
                <Button
                  variant="warning"
                  onClick={() => {
                    this.setState({ isShowRoleModal: true });
                  }}
                >
                  View Role
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="danger" onClick={this.handleUseSkillOnClick}>
                  Use skill
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="dark"
                  onClick={this.handleLastNightInfoOnClick}
                >
                  Last night info
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="info" onClick={this.handleVoteOnClick}>
                  Vote
                </Button>
              </Grid>
            </Grid>
            <RoleModal
              show={this.state.isShowRoleModal}
              onHide={this.closeRoleModal}
              role={this.state.role} // todo: add a step to check whether successfully get the role
            />
            <WolfModal
              show={this.state.isShowWolfModal}
              onHide={this.closeWolfModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <ProphetModal
              show={this.state.isShowProphetModal}
              onHide={this.closeProphetModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <WitchModal
              show={this.state.isShowWitchModal}
              onHide={this.closeWitchModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <GuardianModal
              show={this.state.isShowGuardianModal}
              onHide={this.closeGuardianModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <HunterModal
              show={this.state.isShowHunterModal}
              onHide={this.closeHunterModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <VoteModal
              show={this.state.isShowVoteModal}
              onHide={this.closeVoteModal}
              name={this.props.location.state.playerName}
              roomnum={this.props.location.state.roomNum}
            />
            <div style={{ marginTop: 5 }}>
              {this.state.isShowLastNightInfo && (
                <Alert variant="dark" onClick={this.closeLastNightInfoAlert}>
                  {this.state.lastNightInfo}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Room;
