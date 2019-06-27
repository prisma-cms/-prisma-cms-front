import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'material-ui/Select'
import MenuItem from 'material-ui/Menu/MenuItem';
import withStyles from 'material-ui/styles/withStyles'

import enFlag from "../../assets/img/lang/us.png";
import ruFlag from "../../assets/img/lang/ru.png";

import Context from "@prisma-cms/context";

const styles = theme => ({

  select: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },

  flag: {
    display: 'inline-block',
    height: 20,
    margin: '0 5px 0',
  },
})

class Language extends Component {

  static contextType = Context;


  handleChange = event => {
    const {
      setLanguage,
    } = this.context;
    setLanguage(event.target.value)
  }


  render() {

    const {
      classes,
    } = this.props

    const {
      getLanguage,
    } = this.context;

    const lang = getLanguage()

    return (
      <Select
        value={lang}
        onChange={this.handleChange}
        classes={{ select: classes.select }}
      >

        <MenuItem
          value='en'
        >
          <img
            src={enFlag}
            className={classes.flag}
          />
          EN
        </MenuItem>

        <MenuItem
          value='ru'
        >
          <img
            src={ruFlag}
            className={classes.flag}
          />
          RU
        </MenuItem>

      </Select>
    )
  }
}

export default withStyles(styles)(props => <Language
  {...props}
/>)