import React, { Component } from 'react';
import EditorComponent from '..';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class UserCard extends EditorComponent {

  static Name = "User Card"

  static defaultProps = {
    ...EditorComponent.defaultProps,
    userId: null,
  }

  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      {UserCard.Name}
    </div>);
  }


  componentWillMount() {

    const {
      query: {
        user,
      },
      UserLink,
    } = this.context;

    this.Renderer = graphql(gql(user))(props => {

      console.log("props", props);

      const {
        data: {
          object,
        },
      } = props;

      return object ? <UserLink
        user={object}
      /> : null;
    });

    super.componentWillMount && super.componentWillMount();
  }

  renderMainView() {

    // const {
    //   ...otherProps
    // } = this.getComponentProps(this);

    const {
      style,
      userId,
      ...other
    } = this.getRenderProps();

    const avatarSize = 100;

    const {
      Renderer,
    } = this;

    console.log("userId", userId);

    return (
      <div
        style={{
          ...style,
          // border: '1px solid #CCC',
          // padding: 8,
          // marginBottom: 16,
        }}
        {...other}
      >
        <div style={{
          backgroundColor: '#CCC',
          backgroundImage: ``,
          backgroundSize: 'cover',
          borderRadius: '50%',
          display: 'table',
          margin: '0 auto 8px',
          width: avatarSize,
          height: avatarSize,
          fontSize: (3 / 4) * avatarSize,
          color: '#FFF',
          lineHeight: `${avatarSize}px`,
          textAlign: 'center',
        }}>
          A
        </div>

        <div style={{
          fontSize: 22,
          lineHeight: 1.3,
          textAlign: 'center',

          // if not user name
          backgroundColor: '#CCC',
          height: '1.3em',
        }}>
          {userId ? <Renderer
            where={{
              id: userId,
            }}
          /> : null}
        </div>
      </div>
    );
  }

}

export default UserCard;
