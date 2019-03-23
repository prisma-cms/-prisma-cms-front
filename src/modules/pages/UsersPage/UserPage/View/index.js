import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';


import UserAvatar from './Avatar';


import UsersGroupsBlock from "./Groups";



export default class UserPageView extends EditableView {


  setPageMeta(meta) {

    const {
      setPageMeta,
    } = this.context;

    setPageMeta && setPageMeta(meta || {
      title: this.getTitle(),
    });

  }

  componentWillMount() {

    this.setPageMeta();
  }


  componentDidUpdate() {

    this.setPageMeta();

    super.componentDidUpdate && super.componentDidUpdate();
  }


  getTitle() {

    const draftObject = this.getObjectWithMutations();

    const {
      username,
      fullname,
    } = draftObject || {};

    return fullname || username;
  }



  renderAvatar() {

    const draftObject = this.getObjectWithMutations();

    return <UserAvatar
      user={draftObject}
      updateUser={this.onUpdateAvatar}
      editable={this.canEdit()}
    />
  }


  canEdit() {

    const {
      user: currentUser,
    } = this.context;

    const {
      data,
    } = this.props;

    const {
      object: user,
    } = data || {};

    return currentUser && user && (currentUser.id === user.id || currentUser.sudo === true) ? true : false;
  }


  async save() {


    const result = await super.save()
      .then(r => {



        const {
          loadApiData,
        } = this.context;

        loadApiData();

        return r;
      })
      .catch(e => {
        console.error(e);
      });

    return result;

  }


  onUpdateAvatar = (file) => {



    if (file) {

      const {
        id,
        path,
        mimetype,
      } = file;

      if (!path) {

        this.addError("File URL is empty");

        return;
      }

      if (!mimetype) {

        this.addError("Wrong file type");

      }
      else if (!mimetype.match(/image/)) {

        this.addError("Only images allow");

      }
      else {

        let image = path;

        this.updateObject({
          image,
        });

      }

    }
    else {

      this.addError("File did not received");

    }


  }

  // render(){

  //   console.log("context", this.context.setPageMeta);

  //   return null;
  // }

  renderDefaultView() {

    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();

    if (!object) {
      return null;
    }

    const {
      id,
      username,
      fullname,
    } = object;


    const {
      user: currentUser,
    } = this.context;

    const {
    } = currentUser || {}

    return <Grid
      container
    >

      <Grid
        item
        xs={12}
      >

        {this.renderAvatar()}

      </Grid>



      <Grid
        item
        xs={12}
        sm={6}
        md={4}
      >

        <UsersGroupsBlock
          user={object}
          inEditMode={inEditMode}
        />


      </Grid>





    </Grid>;

  }

  renderEditableView() {
    
    const {
      user: currentUser,
      PhoneField,
    } = this.context;
    
    const object = this.getObjectWithMutations();
    const inEditMode = this.isInEditMode();

    if (!object) {
      return null;
    }

    return <Grid
      container
    >

      <Grid
        item
        xs={12}
      >

        {this.renderAvatar()}

        {/* 
          For google chrome anti autocomplete
         */}
        <input
          name="username"
          style={{
            border: "none",
            height: 0,
            width: 0,
            background: "transparent",
          }}
        />

        <input
          name="password"
          type="password"
          style={{
            border: "none",
            height: 0,
            width: 0,
            background: "transparent",
          }}
        />

      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
      >

        <Grid
          container
          spacing={8}
        >

          <Grid
            item
            xs={12}
          >
            {this.getTextField({
              name: "fullname",
              label: "Fullname",
              helperText: "Type fullname",
            })}
          </Grid>

          <Grid
            item
            xs={12}
          >
            {this.getTextField({
              name: "username",
              label: "Username",
              helperText: "Type username",
            })}
          </Grid>

          <Grid
            item
            xs={12}
          >
            {this.getTextField({
              name: "email",
              label: "Email",
              helperText: "Type email",
            })}
          </Grid>

          <Grid
            item
            xs={12}
          >
            {this.getTextField({
              Editor: PhoneField,
              name: "phone",
              label: "Phone",
              helperText: "Type phone",
            })}
          </Grid>

          <Grid
            item
            xs={12}
          >
            {this.getTextField({
              name: "password",
              label: "Password",
              type: "password",
              helperText: "Type password",
            })}
          </Grid>

        </Grid>


      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
      >

        <UsersGroupsBlock
          user={object}
          inEditMode={inEditMode && currentUser && currentUser.sudo ? true : false}
        />


      </Grid>



    </Grid>;

  }


}
