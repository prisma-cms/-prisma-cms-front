/**
 * Форма ввода пароля или сброса выводится только тогда, когда найден конкретный пользователь.
 * Пока он не найден, выводится форма для поиска пользователя.
 * Когда пользователь найден, тогда переходим к нему и выбираем.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



import withStyles from 'material-ui/styles/withStyles';

import PrismaCmsComponent from "@prisma-cms/component";

import SigninForm from "./forms/Signin";
import SignupForm from "./forms/Signup";
import MetamaskForm from "./forms/Metamask";

// import Users from "./Users";


// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from 'material-ui/Dialog';
import Button from 'material-ui/Button';


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
    useMetamask: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    step: "signin",
    showRegForm: true,
    allowPasswordRecovery: true,
    first: 2,
    fullWidth: true,
    maxWidth: "xs",
    useMetamask: true,
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

      case "metamask":

        form = this.renderMetamaskForm();
        break;
    }


    return form;
  }


  renderSigninForm() {

    const {
      open,
      loginCanceled,
      loginComplete,
      useMetamask,
    } = this.props;

    return <SigninForm
      open={open}
      loginCanceled={loginCanceled}
      loginComplete={loginComplete}
      useMetamask={useMetamask}
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
      useMetamask,
    } = this.props;

    return <SignupForm
      open={open}
      loginCanceled={loginCanceled}
      loginComplete={loginComplete}
      useMetamask={useMetamask}
      switchForm={form => {
        this.setState({
          step: form,
        });
      }}
    />

  }


  renderMetamaskForm() {

    const {
      open,
      loginCanceled,
      loginComplete,
    } = this.props;

    return <MetamaskForm
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


    return this.renderForm() || null;

  }

}


export default withStyles(styles)(props => <Auth
  {...props}
/>);