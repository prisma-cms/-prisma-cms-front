import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';
import UsersPage from '../../../../modules/pages/UsersPage';

import PeopleIcon from "material-ui-icons/People";

class UsersGrid extends EditorComponent {


  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <PeopleIcon /> Users Grid
    </div>);
  }


  renderMainView() {


    return <div
      {...this.getRenderProps()}
    >
      <UsersPage
        {...this.getComponentProps(this)}
      />
    </div>
  }


}


export default UsersGrid;
