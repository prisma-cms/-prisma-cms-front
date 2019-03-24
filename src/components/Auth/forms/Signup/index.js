import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';


import AuthForm from "../";
import { Button } from 'material-ui';
import { TextField } from 'material-ui';
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
          label="Логин"
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
          label="Емейл"
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
          label="Телефон"
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
          label="Полное имя"
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
          label="Пароль"
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
        signup,
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
      Отмена
    </Button>);


    if (values.length) {

      actions.push(<Button
        key="submit"
        color="primary"
        type="submit"
        size="small"
      >
        Зарегистрироваться
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
        Авторизоваться
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
        Регистрация
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