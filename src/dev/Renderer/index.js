import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
  // ContextProvider,
  // SubscriptionProvider,
  Renderer as PrismaCmsRenderer,
} from "../../App";

// import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';
import withStyles from 'material-ui/styles/withStyles';
import DevMainPage from './pages/MainPage';
// import ContextProviderDev from './ContextProvider';

import GraphqlVoyagerPage from "../../components/pages/GraphqlVoyager";
import UsersPage from '../../components/pages/UsersPage';

import Filters from "@prisma-cms/filters";


export const styles = {

  root: {
    // border: "1px solid blue",
    height: "100%",
    display: "flex",
    flexDirection: "column",

    "& #Renderer--body": {
      // border: "1px solid green",
      flex: 1,
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
    },
  },
}


class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  getRoutes() {

    let routes = super.getRoutes();

    return [
      {
        exact: true,
        path: "/graphql-voyager",
        component: GraphqlVoyagerPage,
      },
      {
        exact: true,
        path: "/users",
        // component: DevMainPage,
        render: props => {
          // console.log("props", { ...props });
          return <DevMainPage
          >
            <Filters
              queryName="users"
              filters={{}}
              setFilters={() => false}
            />
            <UsersPage

            />
          </DevMainPage>;
        }
      },
      {
        exact: true,
        path: "/templates",
        // component: DevMainPage,
        render: props => {
          // console.log("props", { ...props });
          return <DevMainPage
          >
            Templates
          </DevMainPage>;
        }
      },
      {
        exact: false,
        path: "/",
        // component: DevMainPage,
        render: props => {
          // console.log("props", { ...props });
          return <DevMainPage
          />;
        }
        // render: props => {
        //   console.log("props", { ...props });
        //   return null;
        // }
        // render: props => {
        //   // console.log("props", { ...props });
        //   return <DevMainPage
        //     {...props}
        //   >
        //     <div>
        //     Test
        //     </div>
        //   </DevMainPage>;
        // }
        // render: props => {
        //   console.log("props", { ...props });
        //   return null;
        // }
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }



  renderMenu() {

    return <MainMenu />
  }


  // renderWrapper() {

  //   return <ContextProvider>
  //     <SubscriptionProvider>
  //       {super.renderWrapper()}
  //     </SubscriptionProvider>
  //   </ContextProvider>;

  // }

  // renderWrapper() {

  //   return <ContextProviderDev>
  //     {super.renderWrapper()}
  //   </ContextProviderDev>;

  // }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> :
      <div
        className={classes.root}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body, html, #root{
              height: 100%;
            }
          `,
          }}
        />
        {super.render()}
      </div>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);