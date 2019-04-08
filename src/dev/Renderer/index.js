import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import {
  Renderer as PrismaCmsRenderer,
} from "../../App";


// import MainMenu from './MainMenu';
import { withStyles } from 'material-ui';
// import FrontEditorPage from './pages/FrontEditor';


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


  getRoutes() {

    let routes = super.getRoutes();

    return [
      // {
      //   exact: true,
      //   path: "/",
      //   component: FrontEditorPage,
      // },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }


  render() {

    const {
      classes,
    } = this.props;

    return <div
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
    </div>

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);