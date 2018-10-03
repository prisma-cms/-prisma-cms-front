'use strict';

exports.__esModule = true;
exports.createUploadLink = exports.ReactNativeFile = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _extractFiles = require('extract-files');

Object.defineProperty(exports, 'ReactNativeFile', {
  enumerable: true,
  get: function get() {
    return _extractFiles.ReactNativeFile;
  }
});

var _apolloLink = require('apollo-link');

var _printer = require('graphql/language/printer');

var _extractFiles2 = _interopRequireDefault(_extractFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = global.fetch;

var createUploadLink = exports.createUploadLink = function createUploadLink() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      includeExtensions = _ref.includeExtensions,
      _ref$uri = _ref.uri,
      linkUri = _ref$uri === undefined ? '/graphql' : _ref$uri,
      linkCredentials = _ref.credentials,
      linkHeaders = _ref.headers,
      _ref$fetchOptions = _ref.fetchOptions,
      linkFetchOptions = _ref$fetchOptions === undefined ? {} : _ref$fetchOptions,
      _ref$fetch = _ref.fetch,
      linkFetch = _ref$fetch === undefined ? fetch : _ref$fetch;

  return new _apolloLink.ApolloLink(function (_ref2) {
    var operationName = _ref2.operationName,
        variables = _ref2.variables,
        query = _ref2.query,
        extensions = _ref2.extensions,
        getContext = _ref2.getContext,
        setContext = _ref2.setContext;
    return new _apolloLink.Observable(function (observer) {
      var requestOperation = { query: (0, _printer.print)(query) };

      if (operationName) requestOperation.operationName = operationName;
      if (Object.keys(variables).length) requestOperation.variables = variables;
      if (extensions && includeExtensions) requestOperation.extensions = extensions;

      var files = (0, _extractFiles2.default)(requestOperation);

      var _getContext = getContext(),
          _getContext$uri = _getContext.uri,
          uri = _getContext$uri === undefined ? linkUri : _getContext$uri,
          _getContext$credentia = _getContext.credentials,
          credentials = _getContext$credentia === undefined ? linkCredentials : _getContext$credentia,
          contextHeaders = _getContext.headers,
          _getContext$fetchOpti = _getContext.fetchOptions,
          contextFetchOptions = _getContext$fetchOpti === undefined ? {} : _getContext$fetchOpti;

      var fetchOptions = _extends({}, linkFetchOptions, contextFetchOptions, {
        headers: _extends({}, linkFetchOptions.headers, contextFetchOptions.headers, linkHeaders, contextHeaders),
        method: 'POST'
      });

      if (credentials) fetchOptions.credentials = credentials;

      if (files.length) {
        // GraphQL multipart request spec:
        // https://github.com/jaydenseric/graphql-multipart-request-spec

        fetchOptions.body = new FormData();

        fetchOptions.body.append('operations', JSON.stringify(requestOperation));

        fetchOptions.body.append('map', JSON.stringify(files.reduce(function (map, _ref3, index) {
          var path = _ref3.path;

          map['' + index] = [path];
          return map;
        }, {})));

        files.forEach(function (_ref4, index) {
          var file = _ref4.file;
          return fetchOptions.body.append(index, file, file.name);
        });
      } else {
        fetchOptions.headers['content-type'] = 'application/json';
        fetchOptions.body = JSON.stringify(requestOperation);
      }

      linkFetch(uri, fetchOptions).then(function (response) {
        setContext({ response: response });

        return response.json();
      }).then(function (result) {

        observer.next(result);
        observer.complete();
      }).catch(function (error) {
        return observer.error(error);
      });
    });
  });
};