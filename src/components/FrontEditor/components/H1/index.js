import React, { Component } from 'react';
import EditorComponent from '..';

import TypographyMU from "material-ui/Typography";


class H1 extends EditorComponent {

  static Name = "Heading level 1"

  static defaultProps = {
    ...EditorComponent.defaultProps,
    color: "default",
    text: "Some title...",
    displayType: "h1",
  }

  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      {H1.Name}
    </div>);
  }

  renderMainView() {

    const {
      displayType,
      text,
      style,
      ...otherProps
    } = this.getComponentProps(this);

    const {
      ...other
    } = this.getRenderProps();


    return <TypographyMU
      style={{
        fontSize: 36,
        lineHeight: 1.3,
        ...style,
      }}
      component={displayType}
      {...other}
    // {...otherProps}
    >
      {text}{super.renderMainView()}
    </TypographyMU>;
  }

}

export default H1;
