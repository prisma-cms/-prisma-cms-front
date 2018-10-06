'use strict';

var _global = global,
    fetch = _global.fetch;

var _require = require('apollo-link'),
    ApolloLink = _require.ApolloLink,
    Observable = _require.Observable;

var _require2 = require('apollo-link-http-common'),
    selectURI = _require2.selectURI,
    selectHttpOptionsAndBody = _require2.selectHttpOptionsAndBody,
    fallbackHttpConfig = _require2.fallbackHttpConfig,
    serializeFetchParameter = _require2.serializeFetchParameter,
    createSignalIfSupported = _require2.createSignalIfSupported,
    parseAndCheckHttpResponse = _require2.parseAndCheckHttpResponse;

var _require3 = require('extract-files/lib/index'),
    extractFiles = _require3.extractFiles,
    ReactNativeFile = _require3.ReactNativeFile;

/**
 * A React Native [`File`](https://developer.mozilla.org/docs/web/api/file)
 * substitute.
 * @kind typedef
 * @name ReactNativeFileSubstitute
 * @type {Object}
 * @see [`extract-files` docs](https://github.com/jaydenseric/extract-files#type-reactnativefilesubstitute).
 * @see [React Native `FormData` polyfill source](https://github.com/facebook/react-native/blob/v0.45.1/Libraries/Network/FormData.js#L34).
 * @prop {String} uri Filesystem path.
 * @prop {String} [name] File name.
 * @prop {String} [type] File content type.
 * @example <caption>A camera roll file.</caption>
 * ```js
 * {
 *   uri: uriFromCameraRoll,
 *   name: 'a.jpg',
 *   type: 'image/jpeg'
 * }
 * ```
 */

/**
 * Used to mark a
 * [React Native `File` substitute]{@link ReactNativeFileSubstitute}.
 * It’s too risky to assume all objects with `uri`, `type` and `name` properties
 * are files to extract. Re-exported from [`extract-files`](https://npm.im/extract-files)
 * for convenience.
 * @kind class
 * @name ReactNativeFile
 * @param {ReactNativeFileSubstitute} file A React Native [`File`](https://developer.mozilla.org/docs/web/api/file) substitute.
 * @example <caption>A React Native file that can be used in query or mutation variables.</caption>
 * ```js
 * const { ReactNativeFile } = require('apollo-upload-client')
 *
 * const file = new ReactNativeFile({
 *   uri: uriFromCameraRoll,
 *   name: 'a.jpg',
 *   type: 'image/jpeg'
 * })
 * ```
 */


exports.ReactNativeFile = ReactNativeFile;

/**
 * GraphQL request `fetch` options.
 * @kind typedef
 * @name FetchOptions
 * @type {Object}
 * @see [Polyfillable fetch options](https://github.github.io/fetch#options).
 * @prop {Object} headers HTTP request headers.
 * @prop {string} [credentials] Authentication credentials mode.
 */

/**
 * Creates a terminating [Apollo Link](https://apollographql.com/docs/link)
 * capable of file uploads. Options match [`createHttpLink`](https://apollographql.com/docs/link/links/http#options).
 * @see [GraphQL multipart request spec](https://github.com/jaydenseric/graphql-multipart-request-spec).
 * @see [apollo-link on GitHub](https://github.com/apollographql/apollo-link).
 * @kind function
 * @name createUploadLink
 * @param {Object} options Options.
 * @param {string} [options.uri=/graphql] GraphQL endpoint URI.
 * @param {function} [options.fetch] [`fetch`](https://fetch.spec.whatwg.org) implementation to use, defaulting to the `fetch` global.
 * @param {FetchOptions} [options.fetchOptions] `fetch` options; overridden by upload requirements.
 * @param {string} [options.credentials] Overrides `options.fetchOptions.credentials`.
 * @param {Object} [options.headers] Merges with and overrides `options.fetchOptions.headers`.
 * @param {boolean} [options.includeExtensions=false] Toggles sending `extensions` fields to the GraphQL server.
 * @returns {ApolloLink} A terminating [Apollo Link](https://apollographql.com/docs/link) capable of file uploads.
 * @example <caption>A basic Apollo Client setup.</caption>
 * ```js
 * const { ApolloClient } = require('apollo-client')
 * const { InMemoryCache } = require('apollo-cache-inmemory')
 * const { createUploadLink } = require('apollo-upload-client')
 *
 * const client = new ApolloClient({
 *   cache: new InMemoryCache(),
 *   link: createUploadLink()
 * })
 * ```
 */
exports.createUploadLink = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$uri = _ref.uri,
      fetchUri = _ref$uri === undefined ? '/graphql' : _ref$uri,
      _ref$fetch = _ref.fetch,
      linkFetch = _ref$fetch === undefined ? fetch : _ref$fetch,
      fetchOptions = _ref.fetchOptions,
      credentials = _ref.credentials,
      headers = _ref.headers,
      includeExtensions = _ref.includeExtensions;

  var linkConfig = {
    http: { includeExtensions: includeExtensions },
    options: fetchOptions,
    credentials: credentials,
    headers: headers
  };

  return new ApolloLink(function (operation) {
    var uri = selectURI(operation, fetchUri);
    var context = operation.getContext();
    var contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: context.headers
    };

    var _selectHttpOptionsAnd = selectHttpOptionsAndBody(operation, fallbackHttpConfig, linkConfig, contextConfig),
        options = _selectHttpOptionsAnd.options,
        body = _selectHttpOptionsAnd.body;

    var files = extractFiles(body);
    var payload = serializeFetchParameter(body, 'Payload');

    if (files.length) {
      // Automatically set by fetch when the body is a FormData instance.
      delete options.headers['content-type'];

      // GraphQL multipart request spec:
      // https://github.com/jaydenseric/graphql-multipart-request-spec
      options.body = new FormData();
      options.body.append('operations', payload);
      options.body.append('map', JSON.stringify(files.reduce(function (map, _ref2, index) {
        var path = _ref2.path;

        map['' + index] = [path];
        return map;
      }, {})));
      files.forEach(function (_ref3, index) {
        var file = _ref3.file;
        return options.body.append(index, file, file.name);
      });
    } else options.body = payload;

    return new Observable(function (observer) {
      // Allow aborting fetch, if supported.
      var _createSignalIfSuppor = createSignalIfSupported(),
          controller = _createSignalIfSuppor.controller,
          signal = _createSignalIfSuppor.signal;

      if (controller) options.signal = signal;

      linkFetch(uri, options).then(function (response) {
        // Forward the response on the context.
        operation.setContext({ response: response });
        return response;
      }).then(parseAndCheckHttpResponse(operation)).then(function (result) {
        observer.next(result);
        observer.complete();
      }).catch(function (error) {
        if (error.name === 'AbortError')
          // Fetch was aborted.
          return;

        if (error.result && error.result.errors && error.result.data)
          // There is a GraphQL result to forward.
          observer.next(error.result);

        observer.error(error);
      });

      // Cleanup function.
      return function () {
        // Abort fetch.
        if (controller) controller.abort();
      };
    });
  });
};