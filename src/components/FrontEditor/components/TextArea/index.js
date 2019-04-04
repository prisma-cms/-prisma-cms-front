import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent  from '..'; 


class TextArea extends EditorComponent {


  onBeforeDrop = () => {

  }


  getRenderProps() {

    const {
      inEditMode,
    } = this.context;

    const {
      style,
      ...props
    } = super.getRenderProps();

    return {
      contentEditable: inEditMode ? true : false,
      suppressContentEditableWarning: true,
      onInput: event => {

        const {
          nativeEvent: {
            inputType,
          },
        } = event;

      },
      style: {
        display: "inline-block",
      },
      ...props,
    }
  }


  renderMainView() {

    return <span
      {...this.getRenderProps()}
    >
    </span>;
  }


}

export default TextArea;
