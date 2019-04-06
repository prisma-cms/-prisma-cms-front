import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorComponent from '..';

import Icon from "material-ui-icons/TextFormat";
import TypographyMU from "material-ui/Typography";


class Typography extends EditorComponent {

  static Name = "Typography"

  static defaultProps = {
    ...EditorComponent.defaultProps,
    variant: "body1",
    color: "default",
    text: "",
    displayType: "span",
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
      displayType,
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
      component={displayType}
      {...other}
    // {...otherProps}
    >
      {text}{super.renderMainView()}
    </TypographyMU>;
  }

}

export default Typography;
