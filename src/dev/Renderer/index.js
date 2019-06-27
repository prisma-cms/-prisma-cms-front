import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import {
  Renderer as PrismaCmsRenderer,
} from "../../App";


import MainMenu from './MainMenu';


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


  // getRoutes() {

  //   return this.getRoutesOld().concat([
  //     {
  //       exact: false,
  //       path: "/",
  //       component: RootPage,
  //     },
  //   ]);

  // }


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