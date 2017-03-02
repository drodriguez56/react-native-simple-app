import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends Component {
  render() {
    const { name, phone, shift } = this.props;
    return (
      <View>
        <CardSection>
          <Input
            value={name}
            label='Name'
            placeholder='Daniel R'
            onChangeText={(value) => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            value={phone}
            label='Phone'
            placeholder='555-555-5555'
            onChangeText={(value) => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>
            Select a shift
          </Text>
          <Picker
            selectedValue={shift}
            onValueChange={(value) => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label='Monday' value='Monday' />
            <Picker.Item label='Tuesday' value='Tuesday' />
            <Picker.Item label='Wednesday' value='Wednesday' />
            <Picker.Item label='Thursday' value='Thursday' />
          </Picker>
        </CardSection>

      </View>
      );
  }
}
const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, actions)(EmployeeForm);
