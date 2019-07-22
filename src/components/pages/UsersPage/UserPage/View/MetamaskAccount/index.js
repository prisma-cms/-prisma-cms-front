import React, { Component, Fragment } from 'react';
import PropTypes, { object } from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import * as ethUtil from 'ethereumjs-util';

class MetamaskAccount extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
  };



  connect() {

    const {
      ethereum,
    } = global;

    if (typeof ethereum !== 'undefined') {
      ethereum.enable()
        .catch(console.error)
    }
  }



  async connectAccount(callback) {

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

    В случае успеха аккаунт будет привязан к текущему пользователю и может в дальнейшем использоваться для авторизации.
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
            EthAccountNoNestingFragment = `fragment EthAccountNoNesting on EthAccount {
              id
              createdAt
              updatedAt
              name
              description
              address
              type
              source
              bytecode
              abi
              balance
            }`,

          } = queryFragments || {};

          const {
            signup = `
              mutation ethConnectAuthAccount(
                $data:EthRecoverPersonalSignatureDataInput!
              ){
                response: ethConnectAuthAccount(
                  data:$data
                ){
                  success
                  message
                  errors{
                    key
                    message
                  }
                  data{
                    ...EthAccountNoNesting
                  }
                }
              }
              
              ${EthAccountNoNestingFragment}
            `,
          } = this.context.query || {};


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
            .then(async r => {

              if (callback) {
                await callback();
              }

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


  render() {

    let output = null;

    const {
      ethereum,
    } = global;

    const {
      Grid,
    } = this.context;

    const {
      data: {
        objects = [],
        loading,
        refetch,
      },
    } = this.props;


    // console.log("this.props.data", this.props.data);

    let items;


    if (objects && objects.length) {
      items = objects.map(n => {

        const {
          id,
          address,
          name,
        } = n;

        return <Grid
          key={id}
          item
          xs={12}
        >
          <a href={`https://etherscan.io/address/${address}`} target="_blank">
            {address}
          </a>
        </Grid>

      });
    }
    else {

      if (!loading) {

        items = <Fragment>

          <Grid
            item
            xs={12}
          >

            <Button
              variant="raised"
              size="small"
              onClick={event => {
                this.connectAccount(refetch);
              }}
            >
              Привязать Ethereum аккаунт
            </Button>

          </Grid>

          {!ethereum ?
            <Grid
              item
              xs={12}
            >
              <Typography
                color="error"
              >
                Плагин Metamask не обнаружен.
              </Typography>
              <Typography
                collor="error"
              >
                Смотрите инструкцию по установке на <a href="https://metamask.io/" target="_blank">официальном сайте</a>.
              </Typography>
            </Grid>
            : null
          }

        </Fragment>
      }

    }


    output = <Grid
      container
      spacing={8}
    >

      <Grid
        item
        xs={12}
      >

        <Typography
          variant="subheading"
        >
          Привязанный ethereum аккаунт для авторизации.
        </Typography>

      </Grid>

      {items}
    </Grid>


    return super.render(
      output
    );
  }
}


export default graphql(gql`
  query ethAccounts(
    $where: EthAccountWhereInput
    $first:Int = 10
  ){
    objects: ethAccounts(
      where: $where
      first: $first
    ){ 
      id
      name
      description
      address
      type
      balance
    }
  }
  `)(props => <MetamaskAccount
  {...props}
/>);