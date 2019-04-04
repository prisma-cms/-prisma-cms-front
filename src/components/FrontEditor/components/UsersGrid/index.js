import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';
import UsersPage from '../../../../modules/pages/UsersPage';


class UsersGrid extends EditorComponent {


  renderPanelView() {

    return super.renderPanelView("Users Grid");
  }


  renderMainView() {

    return <div
      {...this.getRenderProps()}
    >
      <UsersPage

      />
    </div>
  }


}


export default UsersGrid;
