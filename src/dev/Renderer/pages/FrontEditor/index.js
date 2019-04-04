import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import UserAvatar from "./components/UserAvatar";
import { Button } from 'material-ui';
import { withStyles } from 'material-ui';


export const styles = {
  root: {
    "&.inEditMode": {
      height: "100%",
      display: "flex",
      flexDirection: "column",

      "& $editorWrapper": {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // border: "1px solid red",
        overflow: "auto",
      },
    },
  },
  editorWrapper: {
  },
}

class FrontEditorPage extends Component {

  static contextType = Context;

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    inEditMode: true,
    components: [
      {
        "type": "Page",
        "first": 5,
        "components": [
          {
            "type": "Grid",
            "item": true,
            "xs": true,
            components: [
              {
                "type": "UsersGrid",
                "first": 5,
              },
            ],
          },
          {
            "type": "Grid",
            "container": true,
            "components": [
              {
                "type": "Grid",
                "item": true,
                "xs": 12,
                "sm": 6,
                "md": 4,
              },
            ]
          }
        ]
      }
    ],
  }

  render() {

    const {
      FrontEditor,
      Grid,
    } = this.context;

    const {
      components,
      inEditMode,
    } = this.state;

    const {
      classes,
    } = this.props;

    let toolbar = <Grid
      container
      spacing={8}
    >
      <Grid
        item
      >
        <Button
          onClick={event => this.setState({
            inEditMode: !inEditMode,
          })}
          size="small"
          color={inEditMode ? "secondary" : "primary"}
        >
          {inEditMode ? "Stop editing" : "Start editing"}
        </Button>
      </Grid>
    </Grid>

    return (
      <div
        className={[classes.root, inEditMode ? "inEditMode" : ""].join(" ")}
      >

        {toolbar}

        <div
          className={classes.editorWrapper}
        >
          <FrontEditor
            inEditMode={inEditMode}
            components={components}
            onChange={components => {
              // console.log("onChange components", components);
              this.setState({
                components,
              })
            }}
            CustomComponents={[
              UserAvatar,
            ]}
            debug={true}
          />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(props => <FrontEditorPage
  {...props}
/>);