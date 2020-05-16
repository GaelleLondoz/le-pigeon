import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import { RaisedButton } from 'material-ui';

class FormUserDetails extends Component {
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
    const { values } = this.props;
    return (
      <MuiThemeProvider>
        <AppBar title="Do you Confirm the Below" />
        <List>
          <ListItem primaryText="First Name" secondaryText={values.firstName} />
          <ListItem primaryText="Last Name" secondaryText={values.lastName} />
          <ListItem primaryText="Email" secondaryText={values.email} />
          <ListItem
            primaryText="Occupation"
            secondaryText={values.occupation}
          />

          <ListItem primaryText="City" secondaryText={values.city} />
          <ListItem primaryText="Bio" secondaryText={values.bio} />
        </List>
        <br />
        <RaisedButton
          label="Back"
          primary={false}
          style={styles.button}
          onClick={this.back}
          //   onClick={this.props.nextSteps()}
        />
        <br />
        <RaisedButton
          label="Confirm & Continue"
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
