'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('material-ui/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Pagination = require('Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApolloDataView = (_temp = _class = function (_Component) {
  _inherits(ApolloDataView, _Component);

  function ApolloDataView() {
    _classCallCheck(this, ApolloDataView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  return ApolloDataView;
}(_react.Component), _class.defaultProps = {}, _temp);
exports.default = ApolloDataView;
ApolloDataView.propTypes = process.env.NODE_ENV !== "production" ? {} : {};
module.exports = exports['default'];