import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EditorComponent from '../../../../../../components/FrontEditor/components';


class CurrentUserAvatar extends EditorComponent {

  static Name = "CurrentUserAvatar";

  renderPanelView(content) {

    const {
      Avatar,
      classes,
      user: currentUser,
    } = this.context;


    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <Avatar
        user={currentUser || {}}
      /> Current User Avatar
    </div>);
  }


  getRenderProps() {

    const {
      style,
      ...props
    } = super.getRenderProps();

    return {
      style: {
        display: "inline-block",
        ...style,
      },
      ...props,
    }
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