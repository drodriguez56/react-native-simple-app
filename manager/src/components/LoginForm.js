import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import * as actions from '../actions';
import { Card, CardSection, Button, Input, Spinner } from './common';

class Loginform extends Component {
  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (password) => {
    this.props.passwordChanged(password);
  }

  onButtonPress = () => {
    const { password, email } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
        <Button onPress={this.onButtonPress}>
          log in
        </Button>
      );
  }
  render() {
    const { password, email } = this.props;
    return (
        <Card>
          <CardSection>
            <Input
              value={email}
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange}
            />
          </CardSection>

          <CardSection>
            <Input 
              value={password}
              label="Password"
              placeholder="password"
              secureTextEntry
              onChangeText={this.onPasswordChange}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
};

const mapStateToProps = state => {
  const { password, email, error, loading } = state.auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, actions)(Loginform);
