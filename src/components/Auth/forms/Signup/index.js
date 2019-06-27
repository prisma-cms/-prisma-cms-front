import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';


import AuthForm from "../";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import gql from 'graphql-tag';


class SignupForm extends AuthForm {

  static propTypes = {
    ...AuthForm.propTypes,
  };


  onChange(event) {

    const {
      name,
      value,
    } = event.target;

    const {
      data,
    } = this.state;


    this.setState({
      data: {
        ...data,
        [name]: value,
      },
    });

  }


  renderFields() {

    const {
      Grid,
      PhoneField,
    } = this.context;


    const {
      data,
    } = this.state;


    const {
      username,
      email,
      phone,
      fullname,
      password,
    } = data || {}

    return <Grid
      container
      spacing={8}
    >

      <Grid
        item
        xs={12}
      >
        {this.renderField(<TextField
          label={this.lexicon("Login")}
          name="username"
          fullWidth
          value={username || ""}
          onChange={event => this.onChange(event)}
        />)}
      </Grid>

      <Grid
        item
        xs={12}
      >
        {this.renderField(<TextField
          label={this.lexicon("Email")}
          name="email"
          fullWidth
          value={email || ""}
          onChange={event => this.onChange(event)}
        />)}
      </Grid>

      <Grid
        item
        xs={12}
      >
        {this.renderField(<PhoneField
          label={this.lexicon("Phone")}
          name="phone"
          fullWidth
          value={phone || ""}
          onChange={event => this.onChange(event)}
        />)}
      </Grid>

      <Grid
        item
        xs={12}
      >
        {this.renderField(<TextField
          label={this.lexicon("Fullname")}
          name="fullname"
          fullWidth
          value={fullname || ""}
          onChange={event => this.onChange(event)}
        />)}
      </Grid>

      <Grid
        item
        xs={12}
      >
        {this.renderField(<TextField
          label={this.lexicon("Password")}
          name="password"
          type="password"
          fullWidth
          value={password || ""}
          onChange={event => this.onChange(event)}
        />)}
      </Grid>

    </Grid>
  }


  async signup() {

    const {
      query: {
        signup = `
          mutation signup(
            $data:UserCreateInput!
          ){
            response: signup(
              data:$data
            ){
              success
              message
              errors{
                key
                message
              }
              token
              data{
                ...user
              }
            }
          }
          
          
          fragment user on User {
            id
            username
            email
            phone
            showEmail
            showPhone
            sudo
            hasEmail
            hasPhone
          }
        `,
      },
    } = this.context;


    const {
      signupInRequest,
      data,
    } = this.state;


    if (signupInRequest) {
      return;
    }

    this.setState({
      signupInRequest: true,
    });

    const result = await this.mutate({
      mutation: gql(signup),
      variables: {
        data,
      },
    })
      .then(r => {

        this.onAuth(r)

        return r;
      })
      .catch(error => {

        console.error(error);

        return error;

      });

    this.setState({
      signupInRequest: false,
    });

    return result;
  }


  cleanForm() {

    this.setState({
      data: null,
    });

    this.switchForm("signin");

    return super.cleanForm();
  }


  renderForm() {


    const {

    } = this.context;

    const {
      data,
    } = this.state;

    let actions = [];


    const values = Object.values({ ...data }).filter(n => n);



    actions.push(<Button
      key="cancel"
      // color="primary"
      onClick={event => {

        this.closeForm();

      }}
      size="small"
    >
      {this.lexicon("Cancel")}
    </Button>);


    if (values.length) {

      actions.push(<Button
        key="submit"
        color="primary"
        type="submit"
        size="small"
      >
        {this.lexicon("Signup")}
      </Button>);

    }
    else {
      actions.unshift(<Button
        key="switchForm"
        // color="primary"
        onClick={event => {

          this.switchForm("signin");

        }}
        size="small"
      >
        {this.lexicon("Signin")}
      </Button>);
    }




    return <form
      style={{
        width: "100%",
      }}
      onSubmit={event => {

        event.preventDefault();

        this.signup();

      }}
    >

      <DialogTitle>
        {this.lexicon("Signup")}
      </DialogTitle>

      <DialogContent>
        {this.renderFields()}
      </DialogContent>

      <DialogActions>
        {actions}
      </DialogActions>

    </form>;
  }

  // render() {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }
}


export default SignupForm;