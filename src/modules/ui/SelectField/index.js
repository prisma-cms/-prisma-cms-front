import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class SelectField extends Component {

  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {

    const {
      value,
      suggestions,
      helperText,
      className,
      error,
      ...other
    } = this.props;

    let options = [
      <option
        value={null}
        key={null}
      >
        Please, select
      </option>
    ];

    suggestions && suggestions.map(n => {

      const {
        value,
        title,
      } = n;

      options.push(<option
        key={value}
        value={value}
      >
        {title}
      </option>);

    });

    return (
      <Fragment>

        <select
          value={value}
          className={[className, error ? "error" : ""].join(" ")}
          {...other}
        >
          {options}
        </select>

        {helperText
          ?
          error
            ?
            <div className="alert alert-danger">
              <p className="error helperText">{helperText}</p>
            </div>
            :
            <p
              className="helperText"
            >
              {helperText}
            </p>
          :
          null
        }

      </Fragment>
    )
  }
}
