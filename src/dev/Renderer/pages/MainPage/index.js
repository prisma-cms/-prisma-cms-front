import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import PrismaCmsPerformanceTester from "@prisma-cms/performance";

import Page from "../layout";
// import DevApp from '../../../App';
import MainMenu from '../../MainMenu';


class PrismaComponent extends PrismaCmsComponent {

  render() {

    return <PrismaCmsPerformanceTester
      test={{}}
      props={this.props}
      state={this.state}
      context={this.context}
      prefix="Dev__PrismaComponent"
    />;
  }
}


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

        <MainMenu />

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

          <Fragment>
            <div
              id="prisma-cms-performance-tester"
            >
              <PrismaCmsPerformanceTester
                props={this.props}
                state={this.state}
                context={this.context}
                prefix="dev_app"
                {...other}
              />
            </div>
            {children || null}
          </Fragment>

          <PrismaComponent

          />

        </div>

      </div>
    );
  }
}


export default DevMainPage;