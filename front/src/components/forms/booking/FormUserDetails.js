import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextSteps();
  };
  render() {
    const { values } = this.props;
    return (
      <MuiThemeProvider>
        <AppBar title="Enter your Details Here" />
        <TextField
          hintText="Enter your First Name"
          floatingLabelText="First Name"
          onChange={this.props.handleChange('firstName')}
          defaultValue={values.firstName}
        />
        <br />
        <TextField
          hintText="Enter your Last Name"
          floatingLabelText="Last Name"
          onChange={this.props.handleChange('lastName')}
          defaultValue={values.lastName}
        />
        <br />
        <TextField
          hintText="Enter your Email"
          floatingLabelText="Email"
          onChange={this.props.handleChange('email')}
          defaultValue={values.email}
        />
        <br />
        <RaisedButton
          label="Continue"
          primary={true}
          style={styles.button}
          onClick={this.continue}
        />
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormUserDetails;
