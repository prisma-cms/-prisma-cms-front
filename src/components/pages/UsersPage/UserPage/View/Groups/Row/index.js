import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles';

import GroupIcon from 'material-ui-icons/Group';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
}

export class UserGroupRow extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    inEditMode: PropTypes.bool.isRequired,
    checked: PropTypes.bool,
    checkHandler: PropTypes.func,
  }

  static defaultProps = {
    inEditMode: false,
  }

  render() {

    const {
      classes,
      item,
      inEditMode,
      checked,
      checkHandler,
      ...other
    } = this.props;

    const {
      id,
      name,
    } = item;


    let label = <span
      className={classes.label}
    ><GroupIcon
        className={classes.icon}
      /> {name}</span>

    if (inEditMode) {

      return <div
        className={classes.root}
      >
        <Checkbox
          checked={checked || false}
          onChange={checkHandler}
          value={id}
        /> {label}
      </div>
    }
    else {
      return label;
    }


    // return (
    //   <div
    //     className={classes.root}
    //     {...other}
    //   >
    //     <GroupIcon /> {name}
    //   </div>
    // )
  }
}

export default withStyles(styles)(props => <UserGroupRow 
  {...props}
/>);