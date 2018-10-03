var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import Pagination from 'Pagination';

import Table from './Table';

var ApolloDataView = (_temp = _class = function (_Component) {
  _inherits(ApolloDataView, _Component);

  function ApolloDataView() {
    _classCallCheck(this, ApolloDataView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  return ApolloDataView;
}(Component), _class.defaultProps = {}, _temp);
export { ApolloDataView as default };
ApolloDataView.propTypes = process.env.NODE_ENV !== "production" ? {} : {};