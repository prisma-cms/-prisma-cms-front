import _regeneratorRuntime from 'babel-runtime/regenerator';

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['', ''], ['', '']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import PropTypes from 'prop-types';

import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

// import { createUploadLink } from 'apollo-upload-client'
import { createUploadLink } from '../external/apollo-upload-client';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
// import { createHttpLink } from "apollo-link-http";

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import Renderer from './Renderer';

var authMiddleware = new ApolloLink(function (operation, forward) {
  // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(function (_ref) {
    var _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers;
    return {
      headers: _extends({}, headers, {
        Authorization: localStorage.getItem('token') || null
      })
    };
  });

  return forward(operation);
});

var ApolloCmsApp = (_temp = _class = function (_React$Component) {
  _inherits(ApolloCmsApp, _React$Component);

  function ApolloCmsApp(props) {
    _classCallCheck(this, ApolloCmsApp);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onAuthSuccess = function (data) {
      var token = data.token,
          user = data.user;


      token && localStorage.setItem("token", 'Bearer ' + token);

      _this.setState({
        user: user
      });
    };

    _this.logout = function () {

      localStorage.setItem("token", '');

      _this.setState({
        user: null
      });
    };

    _this.onError = function (response) {

      // console.log("onError response", response);

      var networkError = response.networkError,
          graphQLErrors = response.graphQLErrors;


      if (networkError && networkError.statusCode === 401) {
        ;
      }

      // console.log("onError networkError", networkError);
      // console.log("onError graphQLErrors", graphQLErrors);

      graphQLErrors && graphQLErrors.map(function (n) {
        var _ref2 = n || {},
            message = _ref2.message;

        var _this$state$errors = _this.state.errors,
            errors = _this$state$errors === undefined ? [] : _this$state$errors;


        if (message) {

          var error = {
            message: message
          };

          errors.push(error);

          setTimeout(function () {
            var errors = _this.state.errors;


            var index = errors && errors.indexOf(error);

            if (index !== -1) {

              errors.splice(index, 1);

              _this.setState({
                errors: errors
              });
            }
          }, 3000);
        }

        if (errors && errors.length) {

          _this.setState({
            errors: errors
          });
        }

        return n;
      });

      return graphQLErrors;
    };

    var endpoint = _this.props.endpoint;


    if (!endpoint) {
      throw new Error("Endpoind required");
    }

    var wsLink = void 0;

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

    var httpLink = createUploadLink({
      uri: endpoint
    });

    // const httpLink = createHttpLink({ 
    //   uri: `${protocol}://${endpoint}/`,
    // });

    wsLink = new WebSocketLink({
      // uri: `${ws_protocol}://${endpoint}/`,
      uri: endpoint.replace(/^http/, 'ws'),
      options: {
        reconnect: true
      }
    });

    var wsHttpLink = split(
    // split based on operation type
    function (request) {

      // console.log("request", request);

      var query = request.query;

      var _getMainDefinition = getMainDefinition(query),
          kind = _getMainDefinition.kind,
          operation = _getMainDefinition.operation;

      return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);

    var errorLink = onError(_this.onError);

    var link = errorLink.concat(wsHttpLink);
    // const link = errorLink.concat(httpLink);

    var client = new ApolloClient({
      link: from([authMiddleware, link]),
      cache: new InMemoryCache(),
      connectToDevTools: true
    });

    _this.state = {
      client: client,
      errors: []
    };

    return _this;
  } // eslint-disable-line react/prefer-stateless-function


  ApolloCmsApp.prototype.getChildContext = function getChildContext() {
    var _state = this.state,
        token = _state.token,
        user = _state.user,
        errors = _state.errors;


    var context = {
      token: token,
      user: user,
      onAuthSuccess: this.onAuthSuccess,
      logout: this.logout,
      errors: errors
    };

    return context;
  };

  ApolloCmsApp.prototype.componentDidMount = function componentDidMount() {

    this.loadApiData();
  };

  ApolloCmsApp.prototype.loadApiData = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var apiQuery, client, result, _ref4, data;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              apiQuery = this.props.apiQuery;

              if (apiQuery) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', false);

            case 3:
              client = this.state.client;
              _context.next = 6;
              return client.query({
                query: gql(_templateObject, apiQuery),
                fetchPolicy: "network-only"
              }, {}).then(function (r) {
                return r;
              }).catch(function (e) {
                console.error(e);
              });

            case 6:
              result = _context.sent;
              _ref4 = result || {}, data = _ref4.data;


              if (data) {
                this.setState(_extends({}, data));
              }

              return _context.abrupt('return', result);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadApiData() {
      return _ref3.apply(this, arguments);
    }

    return loadApiData;
  }();

  ApolloCmsApp.prototype.render = function render() {
    var client = this.state.client;

    var _props = this.props,
        Renderer = _props.Renderer,
        other = _objectWithoutProperties(_props, ['Renderer']);

    return React.createElement(
      ApolloProvider,
      {
        client: client
      },
      React.createElement(Renderer, other)
    );
  };

  return ApolloCmsApp;
}(React.Component), _class.defaultProps = {
  Renderer: Renderer,
  apiQuery: '{\n      user:me{\n        id\n        username\n      }\n    }'
}, _class.childContextTypes = {
  onAuthSuccess: PropTypes.func,
  logout: PropTypes.func,
  token: PropTypes.string,
  user: PropTypes.object,
  errors: PropTypes.array
}, _temp);
export { ApolloCmsApp as default };
ApolloCmsApp.propTypes = process.env.NODE_ENV !== "production" ? {
  endpoint: PropTypes.string.isRequired,
  Renderer: PropTypes.func.isRequired,
  apiQuery: PropTypes.string
} : {};