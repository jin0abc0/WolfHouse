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
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

class AddRowButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.inputOnChange(this.props.btIndex, event.target.value);
  }
  handleRemove() {
    this.props.removeOnClick(this.props.btIndex);
  }

  handleDropdown(value) {
    this.props.dropdownItemOnClick(this.props.btIndex, value);
  }

  render() {
    return (
      <div>
        <Row>
          <DropdownButton id="dropdown-basic-button" title={this.props.curRole}>
            {this.props.dropdownItems.map((value, index) => {
              return (
                <div key={value}>
                  <Dropdown.Item
                    name={value}
                    onClick={(e) => this.handleDropdown(e.target.name)}
                  >
                    {value}
                  </Dropdown.Item>
                </div>
              );
            })}
          </DropdownButton>
          <input
            type="number"
            value={this.props.curNumber}
            onChange={this.handleChange}
          />
          <Button variant="primary" onClick={this.handleRemove}>
            Remove
          </Button>
        </Row>
      </div>
    );
  }
}

export default AddRowButtonGroup;
