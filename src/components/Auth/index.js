/**
 * Форма ввода пароля или сброса выводится только тогда, когда найден конкретный пользователь.
 * Пока он не найден, выводится форма для поиска пользователя.
 * Когда пользователь найден, тогда переходим к нему и выбираем.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



import { withStyles } from 'material-ui';

import PrismaCmsComponent from "@prisma-cms/component";

import SigninForm from "./forms/Signin";
import SignupForm from "./forms/Signup";

import Users from "./Users";


import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { Button } from 'material-ui';


const styles = {
  root: {
    // width: 360,
  },
  // DialogContentRoot: {
  //   display: "flex",
  //   flexDirection: "column",
  //   flexBasis: "100%",
  //   alignItems: "center",
  // },
};


class Auth extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    loginCanceled: PropTypes.func.isRequired,
    loginComplete: PropTypes.func.isRequired,

    step: PropTypes.oneOf([
      // "findUser",
      "signin",
      "signup",
    ]).isRequired,

    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    step: "signin",
    showRegForm: true,
    allowPasswordRecovery: true,
    first: 2,
    fullWidth: true,
    maxWidth: "xs",
  };


  constructor(props) {

    super(props);

    const {
      step,
    } = props;

    this.state = {
      ...this.state,
      step,
      // open: true,
    }
  }


  renderForm() {

    const {
      step,
    } = this.state;

    let form;


    switch (step) {

      // case "findUser":
      case "signin":

        form = this.renderSigninForm();
        break;

      case "signup":

        form = this.renderSignupForm();
        break;
    }


    return form;
  }


  renderSigninForm() {

    const {
      open,
      loginCanceled,
      loginComplete,
    } = this.props;

    return <SigninForm
      open={open}
      loginCanceled={loginCanceled}
      loginComplete={loginComplete}
      switchForm={form => {
        this.setState({
          step: form,
        });
      }}
    />

  }


  renderSignupForm() {

    const {
      open,
      loginCanceled,
      loginComplete,
    } = this.props;

    return <SignupForm
      open={open}
      loginCanceled={loginCanceled}
      loginComplete={loginComplete}
      switchForm={form => {
        this.setState({
          step: form,
        });
      }}
    />

  }


  getFilters() {


    const {
      uri,
    } = this.context;


    let {
      page,
      authFilters: filters,
    } = uri.query(true);

    if (filters) {

      try {
        filters = filters && JSON.parse(filters) || null;
      }
      catch (error) {
        console.error(console.error(error));
      }

    }

    return filters;
  }


  setFilters(filters) {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;



    let newUri = uri.clone();

    const currentFilters = this.getFilters();

    filters = {
      ...currentFilters,
      ...filters,
    }


    try {
      filters = filters ? JSON.stringify(filters) : undefined;
    }
    catch (error) {
      console.error(error);
    }


    if (filters === "{}") {
      filters = undefined;
    }

    if (filters) {

      // if (newUri.hasQuery) {
      newUri = newUri.setQuery({
        authFilters: filters,
      });
      // }
      // else {
      //   newUri = newUri.addQuery({
      //     filters,
      //   });
      // }

    }
    else {

      newUri.removeQuery("authFilters");

    }

    newUri.removeQuery("authPage");


    const url = newUri.resource();



    history.push(url);

  }


  cleanFilters() {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;


    let newUri = uri.clone();


    newUri.removeQuery("authPage");
    newUri.removeQuery("authFilters");


    const url = newUri.resource();

    history.push(url);

  }


  prepareWhere() {

    const {
      // search,
      where,
    } = this.getFilters() || {};

    // let where;

    // if (search) {

    //   where = {
    //     OR: [
    //       {
    //         id: search,
    //       },
    //       {
    //         username_contains: search,
    //       },
    //       {
    //         email_contains: search,
    //       },
    //       {
    //         fullname_contains: search,
    //       },
    //       {
    //         phone_contains: search,
    //       },
    //     ],
    //   };

    // }

    return where;
  }


  renderActions() {

    return <Fragment>
      <Button
        onClick={this.handleClose}
      // color="primary"
      >
        Регистрация
      </Button>
      <Button
        onClick={this.handleClose}
      // color="primary"
      >
        Отмена
      </Button>
      <Button
        onClick={this.handleClose}
        color="primary"
        autoFocus
      >
        Agree
      </Button>
    </Fragment>
  }


  render() {

    const {
      uri,
    } = this.context;

    let {
      loginCanceled,
      loginComplete,

      fullWidth,
      maxWidth,
      dialogProps,
      classes,
      step,
      where,
      first,
      open,
      ...other
    } = this.props;


    const {
      password,
      // open,
    } = this.state;

    const {
      authPage,
    } = uri.query(true);


    return this.renderForm() || null;



    let skip;

    if (authPage > 1 && first) {
      skip = (authPage - 1) * first;
    }

    let users = <Users
      first={first}
      skip={skip}
      where={this.prepareWhere()}
      setFilters={filters => this.setFilters(filters)}
      getFilters={() => this.getFilters()}
      cleanFilters={() => this.cleanFilters()}
      password={password || ""}
      onPasswordChange={password => {
        this.setState({
          password,
        });
      }}
    />

    return <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open ? true : false}
      onClose={this.onRequestClose}
      onEntering={this.handleEntering}
      {...dialogProps}
    >

      <DialogTitle>
        Авторизация
      </DialogTitle>

      <DialogContent
      // classes={{
      //   root: classes.DialogContentRoot,
      // }}
      >

        {users}

      </DialogContent>

      <DialogActions>
        {this.renderActions()}
      </DialogActions>


    </Dialog>


  }

}


export default withStyles(styles)(props => <Auth
  {...props}
/>);