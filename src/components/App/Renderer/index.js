import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Switch,
} from 'react-router-dom'

import MainMenu from './MainMenu';

import Errors from './Errors';
import { Typography, withStyles } from 'material-ui';

import Auth from '../../../modules/Auth';

import MainPage from "../../../modules/pages/MainPage";

import UsersPage from '../../../modules/pages/UsersPage';
import UserPage from '../../../modules/pages/UsersPage/UserPage';
import PageNotFound from '../../../modules/pages/404';

import RoutedPage from "../../../modules/pages/RoutedPage";

import AdminRenderer from "./Admin";

export const styles = {
  root: {
    // width: "100%",
    flexBasis: "100%",
    height: "100%",
    // maxWidth: 1260,
    // padding: "0 20px",
    // margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    width: "100%",
    maxWidth: 1260,
    padding: "0 20px",
    margin: "0 auto",
  },
}

export class Renderer extends Component {

  static propTypes = {
    PageNotFound: PropTypes.func.isRequired,
    AdminRenderer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    PageNotFound,
    AdminRenderer,
    classes: {},
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    uri: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  static childContextTypes = {
    openLoginForm: PropTypes.func,
  }


  constructor(props) {

    super(props);

    this.state = {
      authOpen: false,
    };

  }



  getChildContext() {

    return {
      openLoginForm: this.openLoginForm,
    }
  }

  openLoginForm = (event) => {
    this.setState({
      authOpen: true,
    });
  }



  onAuthSuccess = data => {

    const {
      onAuthSuccess,
    } = this.context;

    onAuthSuccess(data);

  }


  renderErrors() {

    const {
      errors,
    } = this.context;

    return <Errors
      errors={errors}
    />

  }

  renderAuth() {

    const {
      authOpen,
    } = this.state;


    return <Auth
      open={authOpen}
      loginComplete={data => {
        this.setState({
          authOpen: false,
        });
        this.onAuthSuccess(data);
      }}
      loginCanceled={data => {
        this.setState({
          authOpen: false,
        });
      }}
    />
  }


  renderMenu() {

    return <MainMenu />
  }


  getRoutes() {

    return [{
      exact: true,
      path: "/",
      component: MainPage,
    }, {
      exact: true,
      path: "/users",
      component: UsersPage,
    }, {
      exact: true,
      path: "/users/:userId",
      render: (props) => {
        const {
          params,
        } = props.match;

        const {
          userId,
        } = params || {};

        return <UserPage
          key={userId}
          where={{
            id: userId,
          }}
          {...props}
        />
      }
    }, {
      path: "*",
      render: props => this.renderOtherPages(props),
    },];

  }

  renderOtherPages(props) {

    const {
      uri,
    } = this.context;

    return <RoutedPage
      {...this.props}
      {...props}
      where={{
        path: uri.path(),
      }}
    />
  }


  renderRoutes() {

    return <Switch>

      {this.getRoutes().map(n => {
        const {
          path,
        } = n;

        return <Route
          key={path}
          {...n}
        />
      })}

    </Switch>;
  }


  renderWrapper() {

    const {
      classes,
      AdminRenderer,
      ...other
    } = this.props;

    let wrapper = <div
      key="wrapper"
      className={classes.root}
    >

      <div
        id="Renderer--header"
        className={classes.wrapper}
      >

        {this.renderMenu()}

      </div>


      <div
        // item
        // xs={12}
        className=""
        id="Renderer--body"
      >
        <div
          className={classes.wrapper}
        >

          {this.renderRoutes()}

        </div>
      </div>

    </div>;

    const {
      user: currentUser,
    } = this.context;

    const {
      sudo,
    } = currentUser || {}; 

    return sudo ? <AdminRenderer
      {...other}
    >

      {wrapper}

    </AdminRenderer> : wrapper || null;
  }


  render() {


    return <Fragment>

      {this.renderWrapper()}

      {this.renderErrors()}

      {this.renderAuth()}

    </Fragment>

  }
}

export default Renderer;

// export default withStyles(styles)(Renderer);