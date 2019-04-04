import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FrontEditorComponent from '../../../../../../components/FrontEditor/components';

class UserAvatar extends FrontEditorComponent {

  renderPanelView(content) {

    return super.renderPanelView("User Avatar");
  }


  renderMainView() {

    const {
      // Grid: MaterialUiGrid,
      Avatar,
      user: currentUser,
    } = this.context;

    return <div

      {...this.getRenderProps()}
    >
      <Avatar
        user={currentUser || {}}
      />

    </div>;
  }

}


export default UserAvatar;