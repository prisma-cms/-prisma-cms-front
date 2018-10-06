var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var ObjectView = (_temp = _class = function (_React$Component) {
  _inherits(ObjectView, _React$Component);

  function ObjectView() {
    _classCallCheck(this, ObjectView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  // eslint-disable-line react/prefer-stateless-function

  ObjectView.prototype.canEdit = function canEdit() {

    var object = this.getObjectWithMutations();

    if (!object) {
      return false;
    }

    var currentUser = this.getCurrentUser();

    var id = object.id;


    var canEdit = currentUser && currentUser.id === id ? true : false;

    return canEdit;
  };

  ObjectView.prototype.getCurrentUser = function getCurrentUser() {
    var currentUser = this.context.user;


    return currentUser;
  };

  ObjectView.prototype.render = function render() {
    return null;
  };

  return ObjectView;
}(React.Component), _class.contextTypes = {
  user: PropTypes.object,
  client: PropTypes.object.isRequired
}, _temp);
export { ObjectView as default };
ObjectView.propTypes = process.env.NODE_ENV !== "production" ? {
  data: PropTypes.object.isRequired
  // saveObject: PropTypes.func,
  // mutate: PropTypes.func.isRequired,
  // refetch: PropTypes.func.isRequired,
} : {};