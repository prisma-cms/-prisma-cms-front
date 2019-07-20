import React from 'react'

import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

// import { createUploadLink } from 'apollo-upload-client'
import { createUploadLink } from './apollo-upload-client'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
// import { createHttpLink } from "apollo-link-http";

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import URI from "urijs";


export default class Apollo extends React.Component { // eslint-disable-line react/prefer-stateless-function


  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    apiQuery: PropTypes.string,
    localStorage: PropTypes.object.isRequired,
  };

  static defaultProps = {
    apiQuery: `{
      user:me{
        id
        username
      }
    }`,
    localStorage: global.localStorage,
  };

  static childContextTypes = {
    onAuthSuccess: PropTypes.func,
    loadApiData: PropTypes.func,
    logout: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
    errors: PropTypes.array,
    localStorage: PropTypes.object,
  };


  constructor(props) {

    super(props);


    let {
      endpoint,
      credentials = 'same-origin',
      localStorage,
    } = this.props;


    if (!endpoint) {
      throw (new Error("Endpoind required"))
    }



    const authMiddleware = new ApolloLink((operation, forward) => { // eslint-disable-line react/prefer-stateless-function
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: localStorage && localStorage.getItem('token') || null,
        }
      }));

      return forward(operation);
    });


    let wsLink;


    const httpLink = createUploadLink({
      uri: endpoint,
      credentials,
    });

    let wsUri = new URI(endpoint);

    let schema = wsUri.scheme();

    switch (schema) {

      case "http":
        schema = "ws";
        break;

      case "https":
      default:
        schema = "wss";
        break;

    }

    wsUri.scheme(schema);

    wsLink = new WebSocketLink({
      uri: wsUri.toString(),
      options: {
        reconnect: true,
        connectionParams: () => ({
          Authorization: localStorage && localStorage.token || undefined,
        }),
      }
    });

    const {
      subscriptionClient,
    } = wsLink;

    // console.log("App wsClient subscriptionClient", subscriptionClient);

    this.prepareSubscriptionClient(subscriptionClient);

    global.wsLink = wsLink;

    const wsHttpLink = split(
      // split based on operation type
      (request) => {

        const { query } = request;

        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    );


    const errorLink = onError(this.onError);

    const link = errorLink.concat(wsHttpLink);
    // const link = errorLink.concat(httpLink);

    const client = new ApolloClient({
      link: from([
        authMiddleware,
        link,
      ]),
      cache: new InMemoryCache().restore(global.__APOLLO_STATE__),
      connectToDevTools: true,
    });


    this.state = {
      client,
      errors: [],
      wsLink,
    };

  }


  prepareSubscriptionClient(client) {

    // client.onConnecting((e) => {
    //   console.log(`App wsClient onConnecting`, e, client.status);
    // });

    // client.onConnected((e) => {
    //   console.log(`App wsClient onConnected`, e, client.status);
    // });

    // client.onDisconnected((e) => {
    //   console.log(`App wsClient onDisconnected`, e, client.status);
    // });

    // client.onError((e, error) => {
    //   console.log(`App wsClient onError`, e, error, client.status);
    // });

    // client.onReconnecting((e) => {
    //   console.log(`App wsClient onReconnecting`, e, client.status);
    // });

    // client.onReconnected((e) => {
    //   console.log(`App wsClient onReconnected`, e, client.status);
    // });

  }


  getChildContext() {

    const {
      token,
      user,
      errors,
    } = this.state;

    const {
      localStorage,
    } = this.props;


    let context = {
      token,
      user,
      onAuthSuccess: this.onAuthSuccessBind,
      loadApiData: this.loadApiDataBind,
      logout: this.logoutBind,
      errors,
      localStorage,
    };

    return context;
  }


  onAuthSuccessBind = data => this.onAuthSuccess(data);


  async onAuthSuccess(data) {

    const {
      token,
      user,
    } = data;

    const {
      localStorage,
    } = this.props;

    const {
      client,
    } = this.state;

    token && localStorage.setItem("token", `Bearer ${token}`);

    // setTimeout(async () => {
    // }, 1000);


    this.setState({
      user,
    }, async () => {

      await client.resetStore();

      this.reconnectWs();

      // this.forceUpdate();


    });

  }


  logoutBind = () => this.logout();

  async logout() {

    const {
      localStorage,
    } = this.props;

    const {
      client,
    } = this.state;

    localStorage.setItem("token", ``);


    this.setState({
      user: null,
    }, async () => {

      await client.resetStore();

      this.reconnectWs();

    });

  }


  reconnectWs = async () => {

    const {
      wsLink,
    } = this.state;

    const {
      subscriptionClient,
    } = wsLink || {};

    // console.log("reconnectWs subscriptionClient status", subscriptionClient.status);

    if (subscriptionClient) {
      // subscriptionClient.unsubscribeAll();
      subscriptionClient.close(false, false);
    }

  }


  // subscribe = (options, observer) => {

  //   const {
  //     wsLink,
  //   } = this.state;

  // }


  onError = (response) => {


    const {
      networkError,
      graphQLErrors,
      messageDelay = 5000,
    } = response;

    if (networkError && networkError.statusCode === 401) {
      ;
    }

    graphQLErrors && graphQLErrors.map(n => {

      const {
        message,
      } = n || {};

      const {
        errors = [],
      } = this.state;

      if (message) {

        const error = {
          message,
        };

        errors.push(error);

        setTimeout(() => {

          const {
            errors,
          } = this.state;

          const index = errors && errors.indexOf(error);

          if (index !== -1) {

            errors.splice(index, 1);

            this.setState({
              errors,
            });

          }

        }, messageDelay);

      }

      if (errors && errors.length) {

        this.setState({
          errors,
        });

      }

      return n;

    });

    return;
  }


  componentDidMount() {

    this.loadApiData();

  }



  loadApiDataBind = () => this.loadApiData();

  async loadApiData() {

    const {
      apiQuery,
    } = this.props;

    if (!apiQuery) {
      return false;
    }

    const {
      client,
    } = this.state;


    const result = await client.query({
      query: gql`${apiQuery}`,
      fetchPolicy: "network-only",
    }, {
      }).then(r => {
        return r;
      })
      .catch(e => {
        console.error(e);
      });

    const {
      data,
    } = result || {};

    if (data) {
      this.setState({
        ...data
      });
    }

    return result;
  }


  render() {

    const {
      client,
      errors,
      wsLink,
    } = this.state;

    const {
      children,
      localStorage,
      ...other
    } = this.props;


    return (
      <ApolloProvider
        client={client}
      >
        <Context.Consumer>
          {context => {

            return <Context.Provider
              value={Object.assign(context, {
                client,
                errors,
                wsLink,
                reconnectWs: this.reconnectWs,
                ...this.getChildContext(),
              })}
            >
              {children}
            </Context.Provider>

          }}
        </Context.Consumer>

      </ApolloProvider>
    );


  }

}



