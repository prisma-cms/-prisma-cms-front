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
// import RouterProvider from 'router-provider';

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
  }

  static defaultProps = {
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
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


  render() {



    const {
      classes,
    } = this.props;



    // return <RouterProvider>
    // </RouterProvider>;

    return <Fragment>

      <Switch>




        <Route
          path="*"
          render={props => {

            return <div
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
                  <Switch>


                    <Route exact path="/" component={MainPage} />


                    <Route
                      exact
                      path={"/users/:userId"}
                      render={(props) => {

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

                      }}
                    />

                    <Route
                      exact
                      path="/users"
                      component={UsersPage}
                    />



                    <Route path="*" render={props => {
                      return <Typography
                        variant="subheading"
                      >
                        Страница не найдена
                        </Typography>
                    }}
                    />

                  </Switch>
                </div>
              </div>

            </div>

          }}
        />


      </Switch>



      {this.renderErrors()}

      {this.renderAuth()}


    </Fragment>

  }
}

export default withStyles(styles)(Renderer);