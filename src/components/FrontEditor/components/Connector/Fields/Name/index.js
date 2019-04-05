import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorComponent from '../../..';
import { ObjectContext } from '../../ListView';

import Icon from "material-ui-icons/ShortText";

class Name extends EditorComponent {


  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <Icon /> Name
    </div>);
  }


  renderMainView() {

    // const {
    //   UserLink,
    // } = this.context;

    return <span
      {...this.getRenderProps()}
    >
      <ObjectContext.Consumer>
        {context => {

          const {
            object,
            ...other
          } = context;


          if (!object) {
            return null;
          }


          const {
            name,
          } = object;

          return name || null;

        }}
      </ObjectContext.Consumer>
    </span>;
  }

}

export default Name;
