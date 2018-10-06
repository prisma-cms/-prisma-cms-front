'use strict';

exports.__esModule = true;
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _class, _temp, _initialiseProps;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import { createUploadLink } from 'apollo-upload-client'


var _templateObject = _taggedTemplateLiteralLoose(['', ''], ['', '']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApollo = require('react-apollo');

var _apolloClient = require('apollo-client');

var _apolloUploadClient = require('../external/apollo-upload-client');

var _apolloCacheInmemory = require('apollo-cache-inmemory');

var _apolloLink = require('apollo-link');

var _apolloLinkError = require('apollo-link-error');

var _apolloLinkHttp = require('apollo-link-http');

var _apolloLinkWs = require('apollo-link-ws');

var _apolloUtilities = require('apollo-utilities');

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _bundle = require('apollo-boost/lib/bundle.umd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var localStorage = global.localStorage;

var authMiddleware = new _apolloLink.ApolloLink(function (operation, forward) {
  // eslint-disable-line react/prefer-stateless-function
  // add the authorization to the headers
  operation.setContext(function (_ref) {
    var _ref$headers = _ref.headers,
        headers = _ref$headers === undefined ? {} : _ref$headers;
    return {
      headers: _extends({}, headers, {
        Authorization: localStorage && localStorage.getItem('token') || null
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

    _initialiseProps.call(_this);

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

    var httpLink = (0, _apolloUploadClient.createUploadLink)({
      uri: endpoint
    });

    // const httpLink = createHttpLink({ 
    //   uri: endpoint,
    // });

    wsLink = new _apolloLinkWs.WebSocketLink({
      // uri: `${ws_protocol}://${endpoint}/`,
      uri: endpoint.replace(/^http/, 'ws'),
      options: {
        reconnect: true
      }
    });

    var wsHttpLink = (0, _apolloLink.split)(
    // split based on operation type
    function (request) {

      // console.log("request", request);

      var query = request.query;

      var _getMainDefinition = (0, _apolloUtilities.getMainDefinition)(query),
          kind = _getMainDefinition.kind,
          operation = _getMainDefinition.operation;

      return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);

    var errorLink = (0, _apolloLinkError.onError)(_this.onError);

    var link = errorLink.concat(wsHttpLink);
    // const link = errorLink.concat(httpLink);

    var client = new _apolloClient.ApolloClient({
      link: (0, _apolloLink.from)([authMiddleware, link]),
      cache: new _apolloCacheInmemory.InMemoryCache().restore(global.__APOLLO_STATE__),
      connectToDevTools: true
    });

    _this.state = {
      client: client,
      errors: []
    };

    return _this;
  } // eslint-disable-line react/prefer-stateless-function


  ApolloCmsApp.prototype.getChildContext = function getChildContext() {
    var _this2 = this;

    var _state = this.state,
        token = _state.token,
        user = _state.user,
        errors = _state.errors;


    var context = {
      token: token,
      user: user,
      onAuthSuccess: this.onAuthSuccess,
      loadApiData: function loadApiData() {
        return _this2.loadApiData();
      },
      logout: this.logout,
      errors: errors,
      localStorage: localStorage
    };

    return context;
  };

  ApolloCmsApp.prototype.componentDidMount = function componentDidMount() {

    this.loadApiData();
  };

  ApolloCmsApp.prototype.loadApiData = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var apiQuery, client, result, _ref3, data;

      return _regenerator2.default.wrap(function _callee$(_context) {
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
                query: (0, _graphqlTag2.default)(_templateObject, apiQuery),
                fetchPolicy: "network-only"
              }, {}).then(function (r) {
                return r;
              }).catch(function (e) {
                console.error(e);
              });

            case 6:
              result = _context.sent;
              _ref3 = result || {}, data = _ref3.data;


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
      return _ref2.apply(this, arguments);
    }

    return loadApiData;
  }();

  ApolloCmsApp.prototype.render = function render() {
    var client = this.state.client;

    var _props = this.props,
        Renderer = _props.Renderer,
        other = _objectWithoutProperties(_props, ['Renderer']);

    return _react2.default.createElement(
      _reactApollo.ApolloProvider,
      {
        client: client
      },
      _react2.default.createElement(Renderer, other)
    );
  };

  return ApolloCmsApp;
}(_react2.default.Component), _class.defaultProps = {
  Renderer: _Renderer2.default,
  apiQuery: '{\n      user:me{\n        id\n        username\n      }\n    }'
}, _class.childContextTypes = {
  onAuthSuccess: _propTypes2.default.func,
  loadApiData: _propTypes2.default.func,
  logout: _propTypes2.default.func,
  token: _propTypes2.default.string,
  user: _propTypes2.default.object,
  errors: _propTypes2.default.array,
  localStorage: _propTypes2.default.object
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onAuthSuccess = function (data) {
    var token = data.token,
        user = data.user;


    token && localStorage.setItem("token", 'Bearer ' + token);

    _this3.setState({
      user: user
    }, _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var client;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              client = _this3.state.client;
              _context2.next = 3;
              return client.resetStore();

            case 3:

              _this3.forceUpdate();

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this3);
    })));
  };

  this.logout = function () {

    localStorage.setItem("token", '');

    _this3.setState({
      user: null
    });
  };

  this.onError = function (response) {

    // console.log("onError response", response);

    var networkError = response.networkError,
        graphQLErrors = response.graphQLErrors;


    if (networkError && networkError.statusCode === 401) {
      ;
    }

    // console.log("onError networkError", networkError);
    // console.log("onError graphQLErrors", graphQLErrors);

    graphQLErrors && graphQLErrors.map(function (n) {
      var _ref5 = n || {},
          message = _ref5.message;

      var _state$errors = _this3.state.errors,
          errors = _state$errors === undefined ? [] : _state$errors;


      if (message) {

        var error = {
          message: message
        };

        errors.push(error);

        setTimeout(function () {
          var errors = _this3.state.errors;


          var index = errors && errors.indexOf(error);

          if (index !== -1) {

            errors.splice(index, 1);

            _this3.setState({
              errors: errors
            });
          }
        }, 3000);
      }

      if (errors && errors.length) {

        _this3.setState({
          errors: errors
        });
      }

      return n;
    });

    return graphQLErrors;
  };
}, _temp);
exports.default = ApolloCmsApp;
ApolloCmsApp.propTypes = process.env.NODE_ENV !== "production" ? {
  endpoint: _propTypes2.default.string.isRequired,
  Renderer: _propTypes2.default.func.isRequired,
  apiQuery: _propTypes2.default.string
} : {};
module.exports = exports['default'];