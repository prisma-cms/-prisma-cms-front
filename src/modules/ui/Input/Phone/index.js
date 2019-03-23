
/**
 * Выводит форматированный номер заказа и слаба
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberFormatProto from "react-number-format";
import { TextField } from 'material-ui';


export function formatPhone(value) {

  value = value ? value.replace(/[^0-9]/g, '').substr(0, 11) : "";


  value = value ? value.split("").reduce((current, next, index) => {
    current.push(next)
    return current
  }, []) : [];



  return `+${value[0] || '#'}(${value[1] || '#'}${value[2] || '#'}${value[3] || '#'})${value[4] || '#'}${value[5] || '#'}${value[6] || '#'}-${value[7] || '#'}${value[8] || '#'}-${value[9] || '#'}${value[10] || '#'}`;
}


class NumberFormat extends NumberFormatProto {



}


class PhoneField extends Component {


  valueToText = formatPhone;


  render() {

    const {
      name,
      onChange,
      value,
      ...other
    } = this.props;



    return <NumberFormat

      value={value || ""}
      customInput={TextField}
      format={this.valueToText}
      removeFormatting={value => {

        return value ? value.replace(/^\+/, '').replace(/[^0-9]/g, '') : "";
      }}
      onValueChange={(values, event) => {

        let {
          value,
        } = values;


        onChange && onChange({
          target: {
            name,
            value,
          },
        });

      }}
      {...other}
    />
  }

}


export default PhoneField;