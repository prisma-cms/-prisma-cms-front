var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

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
}(React.Component), _class.contextTypes = {
  user: PropTypes.object
}, _temp);
export { ApolloCmsRenderer as default };
ApolloCmsRenderer.propTypes = process.env.NODE_ENV !== "production" ? {} : {};