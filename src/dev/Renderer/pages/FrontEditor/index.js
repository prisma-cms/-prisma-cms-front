import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

// import UserAvatar from "./components/UserAvatar";
import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';
// import FrontEditor from '../../../../components/FrontEditor';


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

class FrontEditorPage extends PureComponent {

  static contextType = Context;

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    inEditMode: true,
    components: [
      {
        "type": "Page",
        "components": [
          {
            "type": "Connector",
            "first": 10,
            "components": [
              {
                "type": "Filters"
              },
              {
                "type": "ListView",
                "components": [
                  {
                    "type": "Grid",
                    "item": true,
                    "xs": 12,
                    "md": 6,
                    "xl": 3,
                    "components": [
                      {
                        "type": "UserLink"
                      }, ,
                      {
                        "type": "Typography"
                      },
                    ]
                  }
                ]
              },
              {
                "type": "Pagination"
              },
            ],
            "orderBy": "createdAt_ASC",
            "query": "usersConnection"
          }
        ]
      }
    ],
  }

  render() {

    const {
      // FrontEditor,
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