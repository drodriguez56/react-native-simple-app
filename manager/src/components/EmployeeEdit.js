import _ from 'lodash';
import React, { Component } from 'react';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import * as actions from '../actions';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }
  onButtonPress = () => {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }
  onTextPress = () => {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcomming shift is on ${shift}`);
  }

  onDeletePress = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept = () => {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  onDecline = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
        <Card>
          <EmployeeForm />
          <CardSection>
            <Button onPress={this.onButtonPress}>
              Save changes
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onTextPress}>
              Send Text Message
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onDeletePress}>
              Delete
            </Button>
          </CardSection>

          <Confirm 
            visible={this.state.showModal}
            onAccept={this.onAccept}
            onDecline={this.onDecline}
          >
            Are you sure you whant to delete this?
          </Confirm>
        </Card>
      );
  }
}
const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, actions)(EmployeeEdit);
