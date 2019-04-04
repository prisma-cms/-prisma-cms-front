import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import UserAvatar from "./components/UserAvatar";

class FrontEditorPage extends Component {

  static contextType = Context;

  // static propTypes = {

  // };

  state = {
    components: [
      {
        "type": "Page",
        "props": {},
      },
    ],
  }

  render() {

    const {
      FrontEditor,
    } = this.context;

    const {
      components,
    } = this.state;

    // console.log("FrontEditor", FrontEditor);

    return (
      <FrontEditor
        inEditMode={true}
        components={components}
        onChange={components => {
          // console.log("onChange components", components);
          this.setState({
            components,
          })
        }}
        CustomComponents={[
          UserAvatar,
        ]}
        debug={true}
      />
    );
  }
}


export default FrontEditorPage;