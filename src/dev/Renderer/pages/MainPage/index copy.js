import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';


import PrismaCmsComponent from "@prisma-cms/component";


class MainPage extends PrismaCmsComponent {

  render() {

    const {
      user: currentUser,
      UserLink,
      openLoginForm,
      logout,
    } = this.context;


    let output = null;

    // console.log(this.context);

    if (currentUser) {

      output = <div>

        <UserLink
          user={currentUser}
        />

        <Button
          onClick={event => {

            logout();

          }}
        >
          Logout
        </Button>

      </div>

    }
    else {

      output = <div>
        <Button
          onClick={event => {

            openLoginForm();

          }}
        >
          Signin
        </Button>
      </div>;

    }


    return output;
  }
}


export default MainPage;