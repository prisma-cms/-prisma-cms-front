import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";
import DevApp from '../../../App';


class DevMainPage extends Page {

  render() {

    const {

      /**
       * https://github.com/ReactTraining/react-router/issues/5665
       */
      staticContext,

      children,
      ...other
    } = this.props;

    const {
      Link,
      Grid,
    } = this.context;

    return super.render(
      <div>


        <div
          id="buttons"
        >
          <Grid
            container
            spacing={8}
          >

            <Grid
              item
            >
              <Link
                to="/"
              >
                Main page
                </Link>
            </Grid>

            <Grid
              item
            >
              <Link
                to="/users"
              >
                User
                </Link>
            </Grid>

            <Grid
              item
            >
              <button
                onClick={event => this.forceUpdate()}
              >
                Force update
              </button>
            </Grid>

            <Grid
              item
            >
              <button
                onClick={event => this.setState({
                  new_date: new Date(),
                })}
              >
                Update State
              </button>
            </Grid>

          </Grid>

        </div>

        <div
          id="content"
        >


          <DevApp
            children={children || "Main page"}
            props={this.props}
            state={this.state}
            context={this.context}
            prefix="dev_app"
            {...other}
          >
          </DevApp>
        </div>

      </div>
    );
  }
}


export default DevMainPage;