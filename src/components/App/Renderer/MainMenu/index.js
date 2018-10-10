import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '../../../../modules/ui/Grid';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom';

import UserItem from './User';

// import Modal from './AuthModal';


export default class MainMenu extends Component {

  // static propTypes = {
  //   // prop: PropTypes
  // }


  static contextTypes = {
    logout: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    user: PropTypes.object,
    openLoginForm: PropTypes.func.isRequired,
  }

  state = {
    // opened: false,
  }

  logout() {

    const {
      logout,
    } = this.context;

    logout();

  }

  // handleClose = () => {

  //   this.setState({
  //     opened: false,
  //   });

  // }


  render() {

    const {
      user,
    } = this.context;

    const {
      // opened,
    } = this.state;

    const {
      id: userId,
      sudo,
    } = user || {}

    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        className="MainMenu-root"
      >

        <Grid
          item
        >
          <Link
            to="/"
          >
            <Typography
              component="span"
            >
              Main page
            </Typography>
          </Link>
        </Grid>
 

        {/* 
        */}
        <Grid
          item
        >
          <Link
            to="/users"
          >
            <Typography
              component="span"
            >
              Users
            </Typography>
          </Link>
        </Grid> 

        
        <Grid
          item
          xs
        >
        </Grid>

        {user
          ?
          [
            <Grid
              key="user"
              item
            >
              <UserItem
                key={userId}
                user={user}
              />
            </Grid>,
            <Grid
              key="logout"
              item
            >
              <Button
                onClick={() => this.logout()}
              >
                Signout
              </Button>

            </Grid>
          ]
          :
          <Grid
            key="login"
            item
          >
            <Button
              onClick={e => {
                // this.setState({
                //   opened: true,
                // });
                const {
                  openLoginForm,
                } = this.context;
                openLoginForm();
              }}
            >
              Signin
          </Button>

          </Grid>
        }

        {/* <Modal 
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={opened}
          onClose={this.handleClose}
        >
  
  
        </Modal> */}

      </Grid>
    )
  }
}
