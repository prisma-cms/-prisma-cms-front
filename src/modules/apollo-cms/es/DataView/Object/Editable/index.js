import _regeneratorRuntime from 'babel-runtime/regenerator';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
// import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import EditIcon from 'material-ui-icons/ModeEdit';
import ResetIcon from 'material-ui-icons/Restore';
import SaveIcon from 'material-ui-icons/Save';

import Snackbar from 'material-ui/Snackbar';

import View from '../';

var propTypes = _objectWithoutProperties(View.propTypes, []);

Object.assign(propTypes, {
  mutate: PropTypes.func.isRequired,
  _dirty: PropTypes.object,
  errorDelay: PropTypes.number.isRequired
});

var defaultProps = Object.assign(_extends({}, View.defaultProps), {
  errorDelay: 10000
});

var EditableView = (_temp = _class = function (_View) {
  _inherits(EditableView, _View);

  function EditableView(props) {
    _classCallCheck(this, EditableView);

    var _this = _possibleConstructorReturn(this, _View.call(this, props));

    _objectDestructuringEmpty(props);

    _this.state = {
      inEditMode: false,
      notifications: []
    };

    return _this;
  }

  EditableView.prototype.componentWillMount = function componentWillMount() {
    var _props$_dirty = this.props._dirty,
        _dirty = _props$_dirty === undefined ? null : _props$_dirty;

    // this.state = {
    //   ...this.state,
    //   _dirty: _dirty || this.getCache(),
    // };

    Object.assign(this.state, {
      _dirty: _dirty || this.getCache()
    });

    return _View.prototype.componentWillMount ? _View.prototype.componentWillMount.call(this) : true;
  };

  EditableView.prototype.getCacheKey = function getCacheKey() {
    var id = this.props.id;


    return id ? 'item_' + id : null;
  };

  EditableView.prototype.setCache = function setCache(data) {

    if (typeof window === "undefined") {
      return false;
    }

    var cacheData = void 0;

    var key = this.getCacheKey();

    if (key) {
      try {

        if (cacheData) {
          cacheData = JSON.stringify(cacheData);
          window.localStorage.setItem(key, cacheData);
        }
      } catch (error) {}
    }
  };

  EditableView.prototype.getCache = function getCache() {

    if (typeof window === "undefined") {
      return false;
    }

    var cacheData = void 0;

    var key = this.getCacheKey();

    if (key) {
      try {

        cacheData = window.localStorage.getItem(key);

        if (cacheData) {
          cacheData = JSON.parse(cacheData);
        }
      } catch (error) {}
    }

    // console.log("getCacheKey", cacheData);

    return cacheData;
  };

  EditableView.prototype.clearCache = function clearCache() {

    if (typeof window === "undefined") {
      return false;
    }

    var key = this.getCacheKey();

    if (key) {
      window.localStorage.removeItem(key);
    }
  };

  EditableView.prototype.startEdit = function startEdit() {

    this.setState({
      inEditMode: true
    });
  };

  EditableView.prototype.resetEdit = function resetEdit() {

    this.clearCache();

    this.setState({
      inEditMode: false,
      _dirty: null
    });
  };

  EditableView.prototype.save = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _this2 = this;

      var _dirty, client, result;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _dirty = this.state._dirty;
              client = this.context.client;

              // const result = await saveObject(_dirty);

              // console.log("EditView result", result);


              _context2.next = 4;
              return this.saveObject(_dirty).then(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(result) {
                  var _ref3, resultData, _ref4, response, _ref5, success, message, _ref5$errors, errors, other, newState, onSave;

                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(result instanceof Error)) {
                            _context.next = 3;
                            break;
                          }

                          _context.next = 19;
                          break;

                        case 3:
                          _ref3 = result || {}, resultData = _ref3.data;
                          _ref4 = resultData || {}, response = _ref4.response;

                          // console.log("result", result);
                          // console.log("resultData", resultData);

                          _ref5 = response || {}, success = _ref5.success, message = _ref5.message, _ref5$errors = _ref5.errors, errors = _ref5$errors === undefined ? null : _ref5$errors, other = _objectWithoutProperties(_ref5, ['success', 'message', 'errors']);
                          newState = {
                            errors: errors
                          };


                          if (success === undefined) {

                            success = true;
                          }

                          if (success) {
                            _context.next = 12;
                            break;
                          }

                          _this2.addError(message || "Request error");

                          // errors && errors.map(error => {
                          //   this.addError(error);
                          // });

                          _context.next = 18;
                          break;

                        case 12:

                          Object.assign(newState, {
                            _dirty: null,
                            inEditMode: false
                          });

                          onSave = _this2.props.onSave;


                          if (onSave) {
                            onSave(result);
                          }

                          _this2.clearCache();

                          _context.next = 18;
                          return client.resetStore();

                        case 18:

                          _this2.setState(newState);

                        case 19:
                          return _context.abrupt('return', result);

                        case 20:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this2);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }()).catch(function (e) {
                console.error(e);
                return e;
              });

            case 4:
              result = _context2.sent;
              return _context2.abrupt('return', result);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function save() {
      return _ref.apply(this, arguments);
    }

    return save;
  }();

  EditableView.prototype.saveObject = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(data) {
      var mutate, mutation, result;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:

              // const {
              //   object,
              //   saveObject,
              // } = this.props;

              // if(saveObject){
              //   return saveObject(data);
              // }

              // console.log("saveObject data", data);

              mutate = this.props.mutate;

              if (mutate) {
                _context3.next = 3;
                break;
              }

              throw new Error("Mutate not defined");

            case 3:
              mutation = this.getMutation(data);
              _context3.next = 6;
              return mutate(mutation).then(function (r) {
                return r;
              }).catch(function (e) {

                // throw (e);
                return e;
              });

            case 6:
              result = _context3.sent;
              return _context3.abrupt('return', result);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveObject(_x2) {
      return _ref6.apply(this, arguments);
    }

    return saveObject;
  }();

  EditableView.prototype.getMutation = function getMutation(data) {

    var variables = this.getMutationVariables(data);

    return {
      variables: variables
    };
  };

  EditableView.prototype.getMutationVariables = function getMutationVariables(data) {

    var object = this.getObjectWithMutations();

    var id = object.id;


    var where = id ? { id: id } : undefined;

    return {
      where: where,
      data: data
    };
  };

  EditableView.prototype.isInEditMode = function isInEditMode() {
    var _state = this.state,
        inEditMode = _state.inEditMode,
        _dirty = _state._dirty;


    return inEditMode || _dirty ? true : false;
  };

  EditableView.prototype.isDirty = function isDirty() {

    return this.state._dirty ? true : false;
  };

  EditableView.prototype.onChange = function onChange(event) {
    var _updateObject;

    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;


    console.log("onChange", name, value);

    this.updateObject((_updateObject = {}, _updateObject[name] = value, _updateObject));
  };

  EditableView.prototype.updateObject = function updateObject(data) {
    var _state$_dirty = this.state._dirty,
        _dirty = _state$_dirty === undefined ? {} : _state$_dirty;

    var newData = Object.assign(_extends({}, _dirty), data);

    var key = this.getCacheKey();

    if (key && newData) {

      window.localStorage.setItem(this.getCacheKey(), JSON.stringify(newData));
    }

    this.setState({
      _dirty: newData
    });
  };

  // getEditor(props) {

  //   const {
  //     Editor,
  //     name,
  //     ...other
  //   } = props;


  //   const object = this.getObjectWithMutations();


  //   if (!object) {
  //     return null;
  //   }

  //   const value = object[name] || "";

  //   // console.log("Editor", Editor, props);

  //   // return null;

  //   return Editor ? <Editor
  //     onChange={event => {
  //       this.onChange(event);
  //     }}
  //     name={name}
  //     value={value}
  //     style={{
  //       width: "100%",
  //     }}
  //     {...other}
  //   /> : null;

  // }

  EditableView.prototype.getEditor = function getEditor(props) {
    var _this3 = this;

    var Editor = props.Editor,
        name = props.name,
        helperText = props.helperText,
        _onFocus = props.onFocus,
        other = _objectWithoutProperties(props, ['Editor', 'name', 'helperText', 'onFocus']);

    var object = this.getObjectWithMutations();

    if (!object) {
      return null;
    }

    var value = object[name] || "";

    var errors = this.state.errors;


    var error = errors ? errors.find(function (n) {
      return n.key === name;
    }) : "";

    return Editor ? React.createElement(Editor, _extends({
      onChange: function onChange(event) {
        _this3.onChange(event);
      },
      name: name,
      value: value,
      style: {
        width: "100%"
      },
      error: error ? true : false,
      helperText: error && error.message || helperText,
      onFocus: function onFocus(event) {

        if (error) {
          var index = errors.indexOf(error);
          if (index !== -1) {
            errors.splice(index, 1);
            _this3.setState({
              errors: errors
            });
          }
        }

        return _onFocus ? _onFocus(event) : null;
      }
    }, other)) : null;
  };

  EditableView.prototype.getTextField = function getTextField() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    props = _extends({
      Editor: TextField,
      autoComplete: "off"
    }, props);

    return this.getEditor(props);
  };

  EditableView.prototype.getObjectWithMutations = function getObjectWithMutations() {
    var object = this.props.data.object;


    if (!object) {
      return object;
    }

    var _dirty = this.state._dirty;


    if (_dirty) {

      var draftObject = _extends({}, object);

      return Object.assign(draftObject, _dirty);
    } else {
      return object;
    }
  };

  EditableView.prototype.getButtons = function getButtons() {
    var _this4 = this;

    var inEditMode = this.isInEditMode();

    var isDirty = this.isDirty();

    var buttons = [];

    if (this.canEdit()) {

      if (inEditMode) {

        buttons.push(React.createElement(
          IconButton,
          {
            key: 'reset',
            onClick: function onClick(event) {
              _this4.resetEdit();
            }
          },
          React.createElement(ResetIcon, null)
        ));

        if (isDirty) {

          buttons.push(React.createElement(
            IconButton,
            {
              key: 'save',
              onClick: function onClick(event) {
                _this4.save();
              }
            },
            React.createElement(SaveIcon, {
              style: {
                color: "red"
              }
            })
          ));
        }
      } else {
        buttons.push(React.createElement(
          IconButton,
          {
            key: 'edit',
            onClick: function onClick(event) {
              _this4.startEdit();
            }
          },
          React.createElement(EditIcon, null)
        ));
      }
    }

    return buttons && buttons.length ? buttons : null;
  };

  EditableView.prototype.getTitle = function getTitle() {

    // const {
    //   object,
    // } = this.props;

    var object = this.getObjectWithMutations();

    var name = object.name;


    return name;
  };

  EditableView.prototype.renderHeader = function renderHeader() {

    return React.createElement(
      Typography,
      {
        variant: 'title'
      },
      this.getTitle(),
      this.getButtons()
    );
  };

  EditableView.prototype.renderEmpty = function renderEmpty() {
    return null;
  };

  EditableView.prototype.renderDefaultView = function renderDefaultView() {

    return null;
  };

  EditableView.prototype.renderEditableView = function renderEditableView() {

    return null;
  };

  EditableView.prototype.addError = function addError(error) {
    var _this5 = this;

    var errorDelay = this.props.errorDelay;


    if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) !== "object") {
      error = {
        message: error
      };
    }

    Object.assign(error, {
      _id: new Date().getTime()
    });

    var _state$notifications = this.state.notifications,
        notifications = _state$notifications === undefined ? [] : _state$notifications;


    notifications.push(error);

    setTimeout(function () {
      var notifications = _this5.state.notifications;


      if (notifications) {

        var index = notifications.indexOf(error);

        if (index !== -1) {

          notifications.splice(index, 1);

          _this5.setState({
            notifications: notifications
          });
        }
      }
    }, errorDelay);

    this.setState({
      notifications: notifications
    });
  };

  EditableView.prototype.closeError = function closeError(error) {

    // let {
    //   errors,
    // } = this.state;

    Object.assign(error, {
      open: false
    });

    console.log("click event 2", error, this.state.notifications);

    this.forceUpdate();
  };

  EditableView.prototype.onCloseError = function onCloseError(error) {
    var notifications = this.state.notifications;


    if (!notifications) {
      return;
    }

    var index = notifications.indexOf(error);

    if (index !== -1) {
      notifications.splice(index, 1);

      this.setState({
        notifications: notifications
      });
    }
  };

  EditableView.prototype.renderErrors = function renderErrors() {
    var _this6 = this;

    var errorDelay = this.props.errorDelay;
    var notifications = this.state.notifications;


    if (notifications && notifications.length) {

      // return <div>
      //   {notifications.map(({
      //     message,
      //   }, index) => {

      //     return <p
      //       key={index}
      //       style={{
      //         color: 'red',
      //       }}
      //     >

      //       {message}

      //     </p>

      //   })}
      // </div>

      return ReactDOM.createPortal(React.createElement(
        Fragment
        // style={{
        //   minHeight: 200,
        //   overflow: "hidden",
        //   position: "relative",
        // }}
        ,
        null,
        notifications.map(function (error, index) {
          var _id = error._id,
              message = error.message,
              _error$open = error.open,
              open = _error$open === undefined ? true : _error$open;


          return React.createElement(Snackbar, {
            key: _id,
            open: open,
            autoHideDuration: errorDelay
            // onClose={event => this.onCloseError(error)}
            , SnackbarContentProps: {
              // 'aria-describedby': 'snackbar-fab-message-id',
              // className: classes.snackbarContent,
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            },
            message: React.createElement(
              'span',
              null,
              message
            ),
            action: React.createElement(
              Fragment,
              null,
              React.createElement(
                Button,
                {
                  color: 'primary',
                  variant: 'raised',
                  size: 'small',
                  onClick: function onClick(event) {
                    // console.log("click event", event.target);
                    event.stopPropagation();
                    _this6.closeError(error);
                  }
                },
                '\u041E\u0442\u043C\u0435\u043D\u0430'
              )
            )
            // style={{
            //   position: "absolute",
            //   width: "100%",
            //   height: "100%",
            //   margin: 0,
            //   padding: 0,
            //   // bottom: 0,
            // }}
            // className={classes.snackbar}
          });

          // return <p
          //   key={index}
          //   style={{
          //     color: 'red',
          //   }}
          // >

          //   {message}

          // </p>
        })
      ), window.document.body);
    } else {
      return null;
    }
  };

  EditableView.prototype.render = function render() {
    var data = this.props.data;
    var object = data.object;


    var output = void 0;

    if (!object) {
      output = this.renderEmpty();
    } else {

      // const draftObject = this.getObjectWithMutations();


      var inEditMode = this.isInEditMode();

      // let defaultView;
      // let editView;

      // const isDirty = this.isDirty();


      var content = void 0;

      if (inEditMode) {

        content = this.renderEditableView();
      } else {

        content = this.renderDefaultView();
      }

      output = React.createElement(
        Fragment,
        null,
        this.renderHeader(),
        content
      );
    }

    return React.createElement(
      Fragment,
      null,
      output,
      this.renderErrors()
    );
  };

  return EditableView;
}(View), _class.propTypes = propTypes, _class.defaultProps = defaultProps, _temp);
export { EditableView as default };