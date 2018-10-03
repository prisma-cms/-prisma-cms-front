import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import AutocompleteProto from 'react-autocomplete/lib';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ListSubheader from 'material-ui/List/ListSubheader';

import CloseIcon from 'material-ui-icons/Clear';

import List, { ListItem, ListItemText } from 'material-ui/List';

import { withStyles } from 'material-ui/styles/';

export const styles = {
  root: {
    // border: "1px solid red",
    width: "100%",
    position: "relative",
  },
  menuWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    "&.direction-top": {
      bottom: "auto",
      top: 0,
    },
  },
  menuPaper: {
    maxHeight: 300,
    width: "100%",
    overflow: "auto",
    padding: 5,
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,

    ".direction-top &": {
      bottom: 0,
      top: "auto",
    },
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
      fontSize: "1.1rem",
    },
    "&:hover": {
      backgroundColor: "#eee",
    },
    "&.active": {
      backgroundColor: "#ddd",
    },
  },
  menuListItemText: {},
};

export class Autocomplete extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    getItemText: PropTypes.func.isRequired,
    direction: PropTypes.string.isRequired,
  }

  static defaultProps = {
    items: [],
    value: "",
    fullWidth: true,

    // down || top
    direction: "down",   
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
      classes,
      wrapperProps,
      items,
      value,
      fullWidth,
      style,
      getItemText,
      onDelete,
      renderInput,
      direction,
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

    return (
      <Grid
        container
        spacing={0}
      >
        <AutocompleteProto
          // debug={true}
          renderInput={renderInput ? renderInput : props => {

            // console.log("Autocomplete renderInput input", props);

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
              {onDelete && value
                ?
                <Grid
                  item
                >
                  <IconButton
                    onClick={onDelete}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                :
                null
              }
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
          getItemValue={(item) => item.value}
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
              className={[classes.menuWrapper, direction === "top" ? "direction-top" : ""].join(" ")}
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
            console.log("renderItem item", item, value);

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

export default withStyles(styles)(Autocomplete);
