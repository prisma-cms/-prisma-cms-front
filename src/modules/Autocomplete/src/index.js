import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import AutocompleteProto from '../../react-autocomplete/lib';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import CloseIcon from 'material-ui-icons/Clear';
import ViewIcon from 'material-ui-icons/RemoveRedEye';
import AddIcon from 'material-ui-icons/AddCircleOutline';
import SaveIcon from 'material-ui-icons/Save';

import List, { ListItem } from 'material-ui/List';

import { withStyles } from 'material-ui/styles/';

export const styles = {
  root: {
    // border: "1px solid red",
    width: "100%",
  },
  menuWrapper: {
    position: "relative",
  },
  menuPaper: {
    maxHeight: 300,
    width: "100%",
    overflow: "auto",
    padding: 5,
    position: "absolute",
    zIndex: 100,
    top: 0,
  },
  menuList: {
    padding: 0,
  },
  menuListItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    cursor: "pointer",

    fontSize: "0.9rem",
    "&:first-child": {
      // fontSize: "1.1rem",
    },
    "&:hover": {
      backgroundColor: "#eee",
    },
    "&.active": {
      backgroundColor: "#ddd",
    },
  },
  menuListItemText: {},
  actionButton: {
    height: 30,
    width: 30,
  },
  accent: {
    color: "red",
  },
};

export class Autocomplete extends Component {

  static contextType = Context;

  static propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    viewHandler: PropTypes.func,
    viewElement: PropTypes.object,
    addHandler: PropTypes.func,
    saveHandler: PropTypes.func,
    getItemText: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
    value: "",
    fullWidth: true,
    getItemText: function (item) {

      const {
        value,
        label,
      } = item;

      return label;
    },
  }

  state = {}




  render() {
    
    const {
      Grid,
    } = this.context;

    const {
      classes,
      wrapperProps,
      items,
      value,
      fullWidth,
      style,
      getItemText,
      onDelete,
      viewHandler,
      viewElement,
      saveHandler,
      addHandler,
      renderInput,
      ...other
    } = this.props;


    // let items = [
    //   { value: 'AL', label: 'Alabama' },
    //   { value: 'AK', label: 'Alaska' },
    //   { value: 'AZ', label: 'Arizona' },
    //   { value: 'AR', label: 'Arkansas' },
    //   { value: 'CA', label: 'California' },
    //   { value: 'CO', label: 'Colorado' },
    //   { value: 'CT', label: 'Connecticut' },
    // ];

    let addButton;
    let viewButton;
    let saveButton;

    if ((viewHandler || viewElement) && value) {

      // if(!viewElement){
      //   viewElement = IconButton;
      // }

      viewButton = <Grid
        item
      >
        {viewElement
          ?
          viewElement
          :
          <IconButton
            onClick={viewHandler}
            className={classes.actionButton}
          >
            <ViewIcon />
          </IconButton>
        }
      </Grid>
    }

    if (addHandler) {

      // if(!viewElement){
      //   viewElement = IconButton;
      // }

      addButton = <Grid
        item
      >
        <IconButton
          onClick={addHandler}
          className={[classes.actionButton].join(" ")}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    }

    if (saveHandler) {

      // if(!viewElement){
      //   viewElement = IconButton;
      // }

      saveButton = <Grid
        item
      >
        <IconButton
          onClick={saveHandler}
          className={[classes.actionButton, classes.accent].join(" ")}
        >
          <SaveIcon />
        </IconButton>
      </Grid>
    }


    return (
      <Grid
        container
        spacing={0}
      >
        <AutocompleteProto
          // debug={true}
          renderInput={renderInput ? renderInput : props => {


            const {
              // pass input node into ref
              ref,
              inputProps,
              ...other
            } = props;

            return <Grid
              container
              spacing={0}
              alignItems="center"
            >
              <Grid
                item
                xs
              >
                <TextField
                  fullWidth={fullWidth}
                  inputProps={{
                    ref,
                    ...inputProps,
                  }}
                  {...props}
                />
              </Grid>
              {addButton}
              {viewButton}
              {onDelete && value
                ?
                <Grid
                  item
                >
                  <IconButton
                    onClick={onDelete}
                    className={classes.actionButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                :
                null
              }
              {saveButton}
            </Grid>
          }}
          renderDebug={(debugStates) => {
            return <Grid
              item
              xs={12}
            // style={{
            //   maxHeight: "70%",
            // }}
            >
              <pre style={{
                // marginLeft: 300 
                // position: "absolute",
                // top: "100%",
                maxHeight: "100%",
                overflow: "auto",
              }}>
                {JSON.stringify(debugStates.slice(Math.max(0, debugStates.length - 5), debugStates.length), null, 2)}
              </pre>
            </Grid>
          }}
          wrapperProps={{
            ...wrapperProps,
            className: [classes.root, wrapperProps && wrapperProps.className || ""].join(" "),
          }}
          // value={this.state.value}
          value={value || ""}
          // inputProps={{ id: 'states-autocomplete' }}
          // wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          wrapperStyle={style}
          items={items}
          getItemValue={(item) => item.label}
          // shouldItemRender={matchStateToTerm}
          // sortItems={sortStates}
          // onChange={(event, value) => this.setState({ value })}
          // onSelect={value => this.setState({ value })}
          renderMenu={children => {

            if (!children || !children.length) {
              return <div></div>;
            }

            return <Grid
              className="menu"
              item
              xs={12}
              className={classes.menuWrapper}
            >
              <Paper
                className={classes.menuPaper}
              >
                <List
                  className={classes.menuList}
                >
                  {children}
                </List>
              </Paper>
            </Grid>
          }}
          renderItem={(item, isHighlighted, style) => {
//            console.log("renderItem item", item, value);

            const text = getItemText(item);

            return <ListItem
              className={[classes.menuListItem, (isHighlighted || item.label === value || item.value === value) ? "active" : ""].join(" ")}
            >
              {/* <ListItemText
                className={classes.menuListItemText}
                primary={text}
              /> */}
              <div
                className={classes.menuListItemText}
              >
                {text}
              </div>
            </ListItem>
          }}
          {...other}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(props => <Autocomplete {...props}/>);
