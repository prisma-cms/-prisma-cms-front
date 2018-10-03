'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApolloCmsRenderer = (_temp = _class = function (_React$Component) {
  _inherits(ApolloCmsRenderer, _React$Component);

  function ApolloCmsRenderer() {
    _classCallCheck(this, ApolloCmsRenderer);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ApolloCmsRenderer.prototype.render = function render() {
    var children = this.props.children;


    return children || null;
  };

  return ApolloCmsRenderer;
}(_react2.default.Component), _class.contextTypes = {
  user: _propTypes2.default.object
}, _temp);
exports.default = ApolloCmsRenderer;
ApolloCmsRenderer.propTypes = process.env.NODE_ENV !== "production" ? {} : {};
module.exports = exports['default'];