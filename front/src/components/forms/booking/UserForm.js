import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';

class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    city: '',
    bio: ''
  };

  nextSteps = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };
  prevSteps = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  render() {
    const { step } = this.state;
    const { firstName, lastName, email, occupation, city, bio } = this.state;
    const values = { firstName, lastName, email, occupation, city, bio };
    switch (step) {
      case 1: {
        return (
          <FormUserDetails
            nextSteps={this.nextSteps}
            values={values}
            handleChange={this.handleChange}
          />
        );
      }
      case 2: {
        return (
          <FormPersonalDetails
            nextSteps={this.nextSteps}
            prevSteps={this.prevSteps}
            values={values}
            handleChange={this.handleChange}
          />
        );
      }
      case 3: {
        return (
          <Confirm
            nextSteps={this.nextSteps}
            prevSteps={this.prevSteps}
            values={values}
          />
        );
      }
      case 4: {
        return <Success />;
      }
    }
  }
}

export default UserForm;
