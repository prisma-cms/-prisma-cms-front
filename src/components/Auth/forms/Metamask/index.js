import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

// import LinearProgress from 'material-ui/Progress/LinearProgress';

import AuthForm from "../";

import * as ethUtil from 'ethereumjs-util';

export default class MetamaskForm extends AuthForm {

  static propTypes = {
    ...AuthForm.propTypes,
  };


  onChange(event) {

    const {
      name,
      value,
    } = event.target;

    const {
      data,
    } = this.state;


    this.setState({
      data: {
        ...data,
        [name]: value,
      },
    });

  }


  connect() {

    const {
      ethereum,
    } = global;

    if (typeof ethereum !== 'undefined') {
      ethereum.enable()
        .catch(console.error)
    }
  }


  renderFields() {

    const {
      Grid,
    } = this.context;


    const {
      data,
    } = this.state;



    let output;


    const {
      ethereum,
    } = global;


    /**
     * Check metamask plugin
     */
    if (!ethereum) {

      output = <div>

        <Typography
          color="error"
          variant="subheading"
        >
          Плагин Metamask не обнаружен.
        </Typography>

        <Typography
        >
          Смотрите инструкцию по установке на <a href="https://metamask.io/" target="_blank">официальном сайте</a>.
        </Typography>

      </div>

    }
    else {

      output = <div>

        <Typography>
          Будет выполнена попытка авторизации через сеть Ethereum.
        </Typography>

        <Typography>
          Если пользователя в системе еще нет, будет создан новый пользователь.
        </Typography>

        <Typography>
          Если пользователь в системе уже есть, он будет авторизован.
        </Typography>

      </div>

    }


    return output;
  }


  async signup() {

    const {
      ethereum,
      web3,
    } = global;


    if (!ethereum) {

      this.addError("Плагин Metamask не обнаружен");

      return;
    }


    await ethereum.enable()
      .then(async => {


        const {
          selectedAddress: from,
        } = ethereum;


        if (!from) {
          return this.connect();
        }


        var message = `
    Будет выполнена попытка авторизации через сеть Ethereum с использованием аккаунта ${from}.

    Если пользователя в системе еще нет, будет создан новый пользователь.

    Если пользователь в системе уже есть, он будет авторизован.
    `;

        var msg = ethUtil.bufferToHex(new Buffer(message, 'utf8'));

        var params = [msg, from];
        var method = 'personal_sign';

        web3.currentProvider.sendAsync({
          method,
          params,
          from,
        }, async (err, result) => {


          if (err) {

            this.addError(err);

            return;
          }


          const {
            error,
            result: signature,
          } = result;


          if (error) {

            console.error(result.error)

            // this.addError(error && error.message || "Неизвестная ошибка");

            return;

          }

          // else

          const {
            queryFragments,
          } = this.context;


          const {
            UserNoNestingFragment = `fragment UserNoNesting on User {
              id
              createdAt
              updatedAt
              username
              email
              phone
              showEmail
              showPhone
              fullname
              image
              address
              active
              activated
              deleted
              hidden
              marketplaceToken
              sudo
              hasEmail
              hasPhone
            }`,

          } = queryFragments || {};

          const {
            query: {
              signup = `
            mutation ethSigninOrSignup(
              $data:EthRecoverPersonalSignatureDataInput!
            ){
              response: ethSigninOrSignup(
                data:$data
              ){
                success
                message
                errors{
                  key
                  message
                }
                token
                data{
                  ...UserNoNesting
                }
              }
            }
            
            ${UserNoNestingFragment}
          `,
            },
          } = this.context;


          const {
            signupInRequest,
            // data,
          } = this.state;


          if (signupInRequest) {
            return;
          }

          this.setState({
            signupInRequest: true,
          });


          const data = {
            message,
            signature,
            from,
          };


          const auth = await this.mutate({
            mutation: gql(signup),
            variables: {
              data,
            },
          })
            .then(r => {

              this.onAuth(r)

              return r;
            })
            .catch(error => {

              console.error(error);

              return error;

            });

          this.setState({
            signupInRequest: false,
          });

          return auth;

        });


      })
      .catch(error => {
        this.addError(error);
        console.error(error);
      })
      ;


  }


  cleanForm() {

    this.setState({
      data: null,
    });

    this.switchForm("signin");

    return super.cleanForm();
  }


  renderForm() {


    const {

    } = this.context;

    const {
      data,
    } = this.state;

    let actions = [];


    const values = Object.values({ ...data }).filter(n => n);


    actions.push(<Button
      key="submit"
      color="primary"
      type="submit"
      size="small"
    >
      {this.lexicon("Signin")}
    </Button>);


    actions.push(<Button
      key="cancel"
      // color="primary"
      onClick={event => {

        this.closeForm();

      }}
      size="small"
    >
      {this.lexicon("Cancel")}
    </Button>);



    return <form
      style={{
        width: "100%",
      }}
      onSubmit={event => {

        event.preventDefault();

        this.signup();

      }}
    >

      <DialogTitle>
        {this.lexicon("Metamask")}
      </DialogTitle>

      <DialogContent>
        {this.renderFields()}
      </DialogContent>

      <DialogActions>
        {actions}
      </DialogActions>

    </form>;
  }

  // render() {
  //   return (
  //     <div>

  //     </div>
  //   );
  // }
}
