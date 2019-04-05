import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent  from '..'; 


class Page extends EditorComponent {

  static defaultProps = {
    ...EditorComponent.defaultProps,
    deletable: false,
  }


  renderPanelView() {

    return null;
  }


  renderMainView() {


    return <div
      {...this.getRenderProps()}
    >
      {super.renderMainView()}
    </div>;
  }


}

export default Page;
