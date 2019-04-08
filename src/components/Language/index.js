import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem } from 'material-ui'
import { withStyles } from 'material-ui'

const styles = theme => ({

  select: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },

  flag: {
    display: 'inline-block',
    height: 20,
    margin:'0 5px 0',
  },
})

class Language extends Component {

  constructor() {
    super()
  }


  handleChange = event => {
    const {
      setLanguage,
    } = this.props.context;
    setLanguage(event.target.value)
  }


  render() {

    const {
      classes,
      context,
    } = this.props

    const {
      getLanguage,
    } = context;

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
            src="/img/lang/us.png"
            className={classes.flag} 
          />
          EN
        </MenuItem>

        <MenuItem
          value='ru'
        >
          <img
            src="/img/lang/ru.png"
            className={classes.flag}
          />
          RU
        </MenuItem>

      </Select>
    )
  }
}

export default withStyles(styles)(Language)