import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import {
  Renderer as PrismaCmsRenderer,
} from "../../App";


import MainMenu from './MainMenu';
import MainPage from './pages/MainPage';
import UserPageConnector from '../../components/pages/UsersPage/UserPage';


class DevRenderer extends PrismaCmsRenderer {

  renderMenu() {

    return <MainMenu />
  }


  // renderWrapper() {

  //   return <FrontEditorContextProvider>
  //     <FrontEditorSubscriptionProvider>
  //       {this.renderWrapperOld()}
  //     </FrontEditorSubscriptionProvider>
  //   </FrontEditorContextProvider>;

  // }


  // renderWrapper() {

  //   return this.renderWrapperOld();

  // }


  getRoutes() {

    return [
      {
        exact: true,
        path: "/users/:userId",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            userId,
          } = params || {};

          return <UserPageConnector
            key={userId}
            where={{
              id: userId,
            }}
            {...props}
          />
        }
      },
      {
        exact: false,
        path: "*",
        // component: RootPage,
        component: MainPage,
      },
    ].concat(super.getRoutes());

  }


  // render() {

  //   const {
  //     classes,
  //   } = this.props;

  //   return <div
  //     className={classes.root}
  //   >
  //     <style 
  //       dangerouslySetInnerHTML={{
  //         __html: `
  //           body, html, #root{
  //             height: 100%;
  //           }
  //         `,
  //       }}
  //     />
  //     {super.render()}
  //   </div>

  // }

}

export default DevRenderer;

// export default withStyles(styles)(props => <DevRenderer
//   {...props}
// />);