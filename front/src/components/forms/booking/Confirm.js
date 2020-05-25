import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import { Button } from '@material-ui';
import Button from '@material-ui/core/Button';

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
        <Button variant="contained"
          label="Back"
          primary={false}
          style={styles.button}
          onClick={this.back}
          //   onClick={this.props.nextSteps()}
        />
        <br />
        <Button variant="contained"
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
