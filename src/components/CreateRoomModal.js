import React, { Component } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import AddRowButtonGroup from "./AddRowButtonGroup";
import { Fab, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

class CreateRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [], // element: {role:xx, number:0}
      remainingRoles: [
        "villager",
        "wolf",
        "prophet",
        "witch",
        "guardian",
        "hunter",
      ],
      isShowAlert: false,
      message: "",
      isSuccess: false,
    };
    this.handleRemoveRoleClick = this.handleRemoveRoleClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this);
    this.handleRoleNumberChange = this.handleRoleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uniqid = require("uniqid");
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleAddButtonClick() {
    if (this.state.remainingRoles.length === 0) {
      return;
    }
    const newRole = this.state.remainingRoles.splice(0, 1);
    this.state.roles.push({ role: newRole[0], number: 0 });
    this.setState({
      roles: this.state.roles,
      remainingRoles: this.state.remainingRoles,
    });
  }
  handleDropdownItemClick(index, newRole) {
    const list = this.state.roles.map((value, i) => {
      if (i === index) {
        const curIndex = this.state.remainingRoles.indexOf(newRole);
        if (curIndex > -1) {
          this.state.remainingRoles.splice(curIndex, 1);
        }
        this.state.remainingRoles.push(value.role);
        return { role: newRole, number: value.number };
      } else {
        return value;
      }
    });
    this.setState({
      roles: list,
      remainingRoles: this.state.remainingRoles,
    });
  }
  handleRemoveRoleClick(index) {
    const role = this.state.roles.splice(index, 1);
    this.state.remainingRoles.push(role[0].role);
    this.setState({
      roles: this.state.roles,
      remainingRoles: this.state.remainingRoles,
    });
  }
  handleRoleNumberChange(index, newNumber) {
    const list = this.state.roles.map((value, i) => {
      if (i === index) {
        return { role: value.role, number: newNumber };
      } else {
        return value;
      }
    });
    this.setState({ roles: list });
  }

  getRoleNum(roleStr) {
    var res = 0;
    this.state.roles.map((value, index) => {
      if (value.role === roleStr) {
        res = value.number;
      }
    });
    return res;
  }

  handleSubmit(event) {
    event.preventDefault();
    const villagerNumber = this.getRoleNum("villager");
    const wolfNumber = this.getRoleNum("wolf");
    const prophetNumber = this.getRoleNum("prophet");
    const witchNumber = this.getRoleNum("witch");
    const guardianNumber = this.getRoleNum("guardian");
    const hunterNumber = this.getRoleNum("hunter");
    axios
      .post(`https://wolf-house1.herokuapp.com/startGame`, {
        villagerNum: villagerNumber,
        wolfNum: wolfNumber,
        prophetNum: prophetNumber,
        witchNum: witchNumber,
        guardianNum: guardianNumber,
        hunterNum: hunterNumber,
      })
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
            Role Configuration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Grid container spacing={3}>
            <Grid item>
              {this.state.roles.map((value, index) => {
                return (
                  <div key={this.uniqid()}>
                    <AddRowButtonGroup
                      btIndex={index}
                      removeOnClick={this.handleRemoveRoleClick}
                      dropdownItemOnClick={this.handleDropdownItemClick}
                      inputOnChange={this.handleRoleNumberChange}
                      curRole={value.role}
                      curNumber={value.number}
                      dropdownItems={this.state.remainingRoles}
                    />
                  </div>
                );
              })}
            </Grid>
            <Grid item>
              <Fab
                color="primary"
                aria-label="add"
                onClick={this.handleAddButtonClick}
              >
                <AddIcon />
              </Fab>
              <Button onClick={this.handleSubmit} style={{ marginLeft: 30 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CreateRoomModal;
