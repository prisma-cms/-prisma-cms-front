
import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  createCall,
} from "query";


import CustomComponent from '../../../Component';

export default class CallRequestButton extends CustomComponent {

  static propTypes = {
    ...CustomComponent.propTypes,
    user: PropTypes.object.isRequired,
    room: PropTypes.object,
  }


  state = {
    inRequest: false,
  };


  async createCall(to) {

    const {
      client,
    } = this.context;


    const {
      inRequest,
    } = this.state;

    const {
      room,
    } = this.props;

    if (inRequest) {
      return false;
    }

    let data;

    const {
      id: roomId,
    } = room || {};


    if(roomId){
      data = {
        Room: {
          id: roomId,
        },
      }
    }


    this.setState({
      inRequest: true,
    });

    const result = await client.mutate({
      mutation: createCall,
      variables: {
        to,
        data,
      },
    })
      .then(async r => {

        const {
          object,
        } = r.data;

        const {
          success,
          message,
          data,
        } = object || {};

        if (!success) {
          this.addError(message || "Can not create call");
          return;
        }
        else if (!data) {
          this.addError(message || "Can not create call");
          return;
        }
        else {

          const {
            id: callId,
          } = data;

          const {
            router: {
              history,
            },
          } = this.context;

          history.push(`/calls/${callId}`);

        }

        await client.resetStore();


      })
      .catch(e => {
        console.error(e);
        this.addError(e.message || "Request error");
      });



    this.setState({
      inRequest: false,
    });

  }

  render() {

    const {
      user,
      ...other
    } = this.props;

    const {
      user: currentUser,
    } = this.context;

    if (!user || !currentUser) {
      return null;
    }

    const {
      id: userId,
    } = user;

    const {
      id: currentUserId,
    } = currentUser;

    if (userId === currentUserId) {
      return null;
    }

    return super.render(
      <a
        href="javascript:;"
        className="button-call ajax precall_add2"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          this.createCall(userId);
        }}
        {...other}
      >
        Request a call
      </a>
    )
  }
}
