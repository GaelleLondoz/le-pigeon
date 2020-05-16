import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextSteps();
  };
  back = e => {
    e.preventDefault();
    this.props.prevSteps();
  };
  render() {
    const { values } = this.props;
    return (
      <MuiThemeProvider>
        <AppBar title="Enter your Personal Details Here" />
        <TextField
          hintText="Enter your Occupation"
          floatingLabelText="Occupation"
          onChange={this.props.handleChange('occupation')}
          defaultValue={values.occupation}
        />
        <br />
        <TextField
          hintText="Enter your Bio"
          floatingLabelText="Bio"
          onChange={this.props.handleChange('bio')}
          defaultValue={values.bio}
        />
        <br />
        <TextField
          hintText="Enter your City"
          floatingLabelText="City"
          onChange={this.props.handleChange('city')}
          defaultValue={values.city}
        />
        <br />
        <RaisedButton
          label="Back"
          primary={false}
          style={styles.button}
          onClick={this.back}
          //   onClick={this.props.nextSteps()}
        />
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

export default FormPersonalDetails;
