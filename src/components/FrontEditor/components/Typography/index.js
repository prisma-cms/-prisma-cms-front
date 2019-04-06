import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorComponent from '..';

import Icon from "material-ui-icons/TextFormat";
import TypographyMU from "material-ui/Typography";


class Typography extends EditorComponent {

  static defaultProps = {
    ...EditorComponent.defaultProps,
    variant: "body1",
    color: "default",
    text: "",
    type: "span",
    display: "inline-block",
  }

  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <Icon /> Typography
    </div>);
  }

  renderMainView() {

    const {
      component,
      ...otherProps
    } = this.getComponentProps(this);

    const {
      text,
      style,
      type,
      display,
      ...other
    } = this.getRenderProps();


    return <TypographyMU
      style={{
        ...style,
        display,
      }}
      component={type}
      {...other}
    // {...otherProps}
    >
      {text}{super.renderMainView()}
    </TypographyMU>;
  }

}

export default Typography;
