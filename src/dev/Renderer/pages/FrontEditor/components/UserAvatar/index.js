import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FrontEditorComponent } from '../../../../../../App';


class CurrentUserAvatar extends FrontEditorComponent {

  renderPanelView(content) {

    const {
      Avatar,
      classes,
    } = this.context;


    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <Avatar
        user={{}}
      /> Current User Avatar
    </div>);
  }


  renderMainView() {

    const {
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


export default CurrentUserAvatar;