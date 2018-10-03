import React from 'react'

import PropTypes from 'prop-types';

import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'

// import { createUploadLink } from 'apollo-upload-client'
import { createUploadLink } from '../external/apollo-upload-client'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from "apollo-link-http";

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import Renderer from './Renderer';
import { HttpLink } from 'apollo-boost/lib/bundle.umd';


const localStorage = global.localStorage;


const authMiddleware = new ApolloLink((operation, forward) => { // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: localStorage && localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})


export default class ApolloCmsApp extends React.Component{ // eslint-disable-line react/prefer-stateless-function


  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    Renderer: PropTypes.func.isRequired,
    apiQuery: PropTypes.string,
  };

  static defaultProps = {
    Renderer,
    apiQuery: `{
      user:me{
        id
        username
      }
    }`,
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


  constructor(props){

    super(props);


    let {
      endpoint,
    } = this.props;


    if(!endpoint){
      throw(new Error("Endpoind required"))
    }


    let wsLink;

    // let protocol = 'http';
    // let ws_protocol = 'ws';

    // if(typeof window !== "undefined"){

    //   const {
    //     protocol: host_protocol,
    //   } = window.location;

    //   if(host_protocol === 'https:'){
    //     ws_protocol = 'wss';
    //     protocol = 'https';
    //   }

    // }

    const httpLink = createUploadLink({ 
      uri: endpoint,
    });
    
    // const httpLink = createHttpLink({ 
    //   uri: endpoint,
    // });

    wsLink = new WebSocketLink({
      // uri: `${ws_protocol}://${endpoint}/`,
      uri: endpoint.replace(/^http/, 'ws'),
      options: {
        reconnect: true
      }
    });


    const wsHttpLink = split(
      // split based on operation type
      (request) => {

        // console.log("request", request);

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
    };

  }

  
  getChildContext() {

    const {
      token,
      user,
      errors,
    } = this.state;
    
    
    let context = {
      token,
      user,
      onAuthSuccess: this.onAuthSuccess,
      loadApiData: () => this.loadApiData(),
      logout: this.logout,
      errors,
      localStorage,
    };

    return context;
  }


  onAuthSuccess = (data) => {

    const {
      token,
      user,
    } = data;

    token && localStorage.setItem("token", `Bearer ${token}`);

    this.setState({
      user,
    }, async () => {

      const {
        client,
      } = this.state;

      await client.resetStore();

      this.forceUpdate();

    });

  }


  logout = () => {

    localStorage.setItem("token", ``);

    this.setState({
      user: null,
    });

  }



  onError = (response) => {

    // console.log("onError response", response);

    const { networkError, graphQLErrors } = response;
  
    if (networkError && networkError.statusCode === 401) {
      ;
    }

    // console.log("onError networkError", networkError);
    // console.log("onError graphQLErrors", graphQLErrors);
    
    graphQLErrors && graphQLErrors.map(n => {

      const {
        message,
      } = n || {};

      const {
        errors = [],
      } = this.state;

      if(message){

        const error = {
          message,
        };

        errors.push(error);

        setTimeout(() => {

          const {
            errors,
          } = this.state;

          const index = errors && errors.indexOf(error);

          if(index !== -1){
            
            errors.splice(index, 1);

            this.setState({
              errors,
            });

          }

        }, 3000);

      }

      if(errors && errors.length){

        this.setState({
          errors,
        });

      }

      return n;

    });
    

    return graphQLErrors;
  }


  componentDidMount(){

    this.loadApiData();

  }


  async loadApiData(){

    const {
      apiQuery,
    } = this.props;

    if(!apiQuery){
      return false;
    }

    const {
      client,
    } = this.state;


    const result = await client.query({
      query: gql`${apiQuery}`,
      fetchPolicy: "network-only",
    },{
    }).then(r => {
      return r;
    })
    .catch(e => {
      console.error(e);
    });
    
    const {
      data,
    } = result || {};

    if(data){
      this.setState({
        ...data
      });
    }

    return result;
  }

  
  render(){
    
    const {
      client,
    } = this.state;

    const {
      // children,
      Renderer,
      ...other
    } = this.props;
    

    return (
      <ApolloProvider
        client={client}
      >
        
        <Renderer
          {...other}
        />

      </ApolloProvider>
    );


  }

}



