import React, {Component} from 'react';
import PropTypes from "prop-types";
 
import Prototype from './Prototype';
  


class AuthPrototype extends Prototype{



  findUser(){

    if(this.state.wait_for_response === true){
      return;
    }

    var query = this.state.login;

    var body = new FormData();

    var data = {
      query: query,
    };

    for(var i in data){
      body.append(i, data[i]);
    };

    // var headers;

    var newStata = {
      errors: {
        login: "",
      },
      wait_for_response: false,
    }

    fetch(this.props.connector_url +'?pub_action=users/find_user',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {

        return response.json()
      })
      .then(function (data) {
 
        if(data.success){



          if(data.object && data.object.id){
            Object.assign(newStata, {
              step: 2,
              login: data.object.username,
              avatar: data.object.image,
              fullname: data.object.fullname || data.object.username,
            });
          }
          else{

            newStata.errors = {
              login: {
                errorText: "Ошибка",
              }
            }

            this.props.addInformerMessage({
              text: data.message || "Пользователь не был найден",
              autohide: 3000,
            });
          }
        }
        else{

          this.props.addInformerMessage({
            text: data.message || "Request error",
            autohide: 4000,
          });
        } 

        this.setState(newStata);

      }.bind(this))
      .catch((error) => {
          console.error('Request failed', error);
          this.setState(newStata);

          this.props.addInformerMessage({
            text: "Request error",
            autohide: 4000,
          });
        }
      );

    this.setState({
      wait_for_response: true,
    });
  }

}



export default class Auth extends Component{

  static defaultProps = {
    open: false,
    step: 1,
    showRegForm: true,
    allowPasswordRecovery: true,
  };


  static propTypes = {
    loginCanceled: PropTypes.func.isRequired,
    loginComplete: PropTypes.func.isRequired,
  }

  render(){

    let {
      loginCanceled,
      loginComplete,
      ...other
    } = this.props;




    return <AuthPrototype
      loginCanceled={loginCanceled}
      loginComplete={loginComplete}
      {...other}
    />
  }
}
 