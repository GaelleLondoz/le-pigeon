import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Success extends Component {
  continue = e => {
    e.preventDefault();

    //PROCESS FORM

    this.props.nextSteps();
  };
  back = e => {
    e.preventDefault();
    this.props.prevSteps();
  };
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Success" />
        <h1>Thank you for Your Submission</h1>
        <p>You Will get an Email for Further Instructions</p>
      </MuiThemeProvider>
    );
  }
}

export default Success;
