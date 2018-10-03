import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'

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


let { ...propTypes } = View.propTypes;

Object.assign(propTypes, {
  mutate: PropTypes.func.isRequired,
  _dirty: PropTypes.object,
  errorDelay: PropTypes.number.isRequired,
});

const defaultProps = Object.assign({ ...View.defaultProps }, {
  errorDelay: 10000,
});

export default class EditableView extends View {

  static propTypes = propTypes;


  static defaultProps = defaultProps;


  constructor(props) {

    super(props);

    const {
    } = props;



    this.state = {
      inEditMode: false,
      notifications: [],
    }

  }


  componentWillMount(){

    const {
      _dirty = null,
    } = this.props;

    // this.state = {
    //   ...this.state,
    //   _dirty: _dirty || this.getCache(),
    // };
    
    Object.assign(this.state, {
      _dirty: _dirty || this.getCache(),
    });

    return super.componentWillMount ? super.componentWillMount() : true;
  }

  getCacheKey() {

    const {
      id,
    } = this.props;

    return id ? `item_${id}` : null;
  }

  setCache(data) {

    if(typeof window === "undefined"){
      return false;
    }

    let cacheData;

    const key = this.getCacheKey();

    if (key) {
      try {

        
        if (cacheData) {
          cacheData = JSON.stringify(cacheData);
          window.localStorage.setItem(key, cacheData);
        }

      }
      catch (error) {

      }
    }

  }

  getCache() {

    if(typeof window === "undefined"){
      return false;
    }

    let cacheData;

    const key = this.getCacheKey();

    if (key) {
      try {

        cacheData = window.localStorage.getItem(key);

        if (cacheData) {
          cacheData = JSON.parse(cacheData);
        }

      }
      catch (error) {

      }
    }

    // console.log("getCacheKey", cacheData);

    return cacheData;
  }

  clearCache() {

    if(typeof window === "undefined"){
      return false;
    }

    const key = this.getCacheKey();

    if (key) {
      window.localStorage.removeItem(key);
    }

  }


  startEdit() {

    this.setState({
      inEditMode: true,
    });

  }

  resetEdit() {

    this.clearCache();

    this.setState({
      inEditMode: false,
      _dirty: null,
    });

  }




  async save() {

    const {
      _dirty,
    } = this.state;

    const {
      client,
    } = this.context;


    // const result = await saveObject(_dirty);

    // console.log("EditView result", result);


    const result = await this.saveObject(_dirty)
      .then(async result => {



        // console.log("await this.saveObject 2", typeof result, result instanceof Error, result);

        if (result instanceof Error) {

          // console.log("await this.saveObject result", result);

        }
        else {

          const {
            data: resultData,
          } = result || {};

          const {
            response,
          } = resultData || {};

          // console.log("result", result);
          // console.log("resultData", resultData);

          let {
            success,
            message,
            errors = null,
            ...other
          } = response || {};


          let newState = {
            errors,
          };

          if (success === undefined) {

            success = true;

          }

          if (!success) {

            this.addError(message || "Request error");

            // errors && errors.map(error => {
            //   this.addError(error);
            // });

          }
          else {

            Object.assign(newState, {
              _dirty: null,
              inEditMode: false,
            });

            const {
              onSave,
            } = this.props;

            if (onSave) {
              onSave(result);
            }

            this.clearCache();

            await client.resetStore();

          }

          this.setState(newState);

        }


        return result;
      })
      .catch(e => {
        console.error(e);
        return e;
      });

    // console.log("await this.saveObject", result);

    return result;

  }


  async saveObject(data) {

    // const {
    //   object,
    //   saveObject,
    // } = this.props;

    // if(saveObject){
    //   return saveObject(data);
    // }

    // console.log("saveObject data", data);

    const {
      mutate,
    } = this.props;

    if (!mutate) {
      throw (new Error("Mutate not defined"));
    }

    const mutation = this.getMutation(data);

    const result = await mutate(mutation).then(r => r).catch(e => {

      // throw (e);
      return e;
    });

    // console.log("result 333", result);

    return result;

  }


  getMutation(data) {

    const variables = this.getMutationVariables(data);

    return {
      variables,
    }

  }


  getMutationVariables(data) {

    const object = this.getObjectWithMutations();

    const {
      id,
    } = object;

    let where = id ? {id} : undefined;

    return {
      where,
      data,
    };
  }


  isInEditMode() {

    const {
      inEditMode,
      _dirty,
    } = this.state;

    return inEditMode || _dirty ? true : false;

  }


  isDirty() {

    return this.state._dirty ? true : false;

  }


  onChange(event) {

    const {
      name,
      value,
    } = event.target;

    console.log("onChange", name, value);

    this.updateObject({
      [name]: value,
    });

  }


  updateObject(data) {

    const {
      _dirty = {},
    } = this.state;

    const newData = Object.assign({ ..._dirty }, data);

    const key = this.getCacheKey();

    if (key && newData) {

      window.localStorage.setItem(this.getCacheKey(), JSON.stringify(newData));
    }


    this.setState({
      _dirty: newData,
    });

  }


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

  getEditor(props) {

    const {
      Editor,
      name,
      helperText,
      onFocus,
      ...other
    } = props;


    const object = this.getObjectWithMutations();


    if (!object) {
      return null;
    }

    const value = object[name] || "";

    const {
      errors,
    } = this.state;

    const error = errors ? errors.find(n => n.key === name) : "";

    return Editor ? <Editor
      onChange={event => {
        this.onChange(event);
      }}
      name={name}
      value={value}
      style={{
        width: "100%",
      }}
      error={error ? true : false}
      helperText={error && error.message || helperText}
      onFocus={event => {

        if (error) {
          const index = errors.indexOf(error);
          if (index !== -1) {
            errors.splice(index, 1);
            this.setState({
              errors,
            });
          }
        }

        return onFocus ? onFocus(event) : null;
      }}
      {...other}
    /> : null;

  }


  getTextField(props = {}) {

    props = {
      Editor: TextField,
      autoComplete: "off",
      ...props,
    };

    return this.getEditor(props);

  }


  getObjectWithMutations() {

    const {
      data: {
        object,
      },
    } = this.props;


    if (!object) {
      return object;
    }

    const {
      _dirty,
    } = this.state;

    if (_dirty) {

      const draftObject = { ...object }

      return Object.assign(draftObject, _dirty);

    }
    else {
      return object;
    }

  }


  getButtons() {


    const inEditMode = this.isInEditMode();

    const isDirty = this.isDirty();

    let buttons = [];

    if (this.canEdit()) {

      if (inEditMode) {

        buttons.push(<IconButton
          key="reset"
          onClick={event => {
            this.resetEdit();
          }}
        >
          <ResetIcon
          />
        </IconButton>);


        if (isDirty) {

          buttons.push(<IconButton
            key="save"
            onClick={event => {
              this.save();
            }}
          >
            <SaveIcon
              style={{
                color: "red",
              }}
            />
          </IconButton>);

        }

      }
      else {
        buttons.push(<IconButton
          key="edit"
          onClick={event => {
            this.startEdit()
          }}
        >
          <EditIcon
          />
        </IconButton>);
      }

    }

    return buttons && buttons.length ? buttons : null;
  }






  getTitle() {

    // const {
    //   object,
    // } = this.props;

    const object = this.getObjectWithMutations();

    const {
      name,
    } = object;

    return name;

  }


  renderHeader() {


    return <Typography
      variant="title"
    >
      {this.getTitle()}

      {this.getButtons()}

    </Typography>
  }


  renderEmpty() {
    return null;
  }


  renderDefaultView() {

    return null;

  }


  renderEditableView() {

    return null;

  }


  addError(error) {

    const {
      errorDelay,
    } = this.props;

    if (typeof error !== "object") {
      error = {
        message: error,
      };
    }

    Object.assign(error, {
      _id: new Date().getTime(),
    });

    const {
      notifications = [],
    } = this.state;

    notifications.push(error);

    setTimeout(() => {

      const {
        notifications,
      } = this.state;

      if (notifications) {

        const index = notifications.indexOf(error);

        if (index !== -1) {

          notifications.splice(index, 1);

          this.setState({
            notifications,
          });

        }

      }

    }, errorDelay);


    this.setState({
      notifications,
    });

  }


  closeError(error) {

    // let {
    //   errors,
    // } = this.state;

    Object.assign(error, {
      open: false,
    });


    console.log("click event 2", error, this.state.notifications);

    this.forceUpdate();

  }

  onCloseError(error) {

    let {
      notifications,
    } = this.state;

    if (!notifications) {
      return;
    }

    const index = notifications.indexOf(error);

    if (index !== -1) {
      notifications.splice(index, 1);

      this.setState({
        notifications,
      });
    }

  }


  renderErrors() {

    const {
      errorDelay,
    } = this.props;

    const {
      notifications,
    } = this.state;

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

      return ReactDOM.createPortal(<Fragment
      // style={{
      //   minHeight: 200,
      //   overflow: "hidden",
      //   position: "relative",
      // }}
      >
        {notifications.map((error, index) => {

          let {
            _id,
            message,
            open = true,
          } = error;

          return <Snackbar
            key={_id}
            open={open}
            autoHideDuration={errorDelay}
            // onClose={event => this.onCloseError(error)}
            SnackbarContentProps={{
              // 'aria-describedby': 'snackbar-fab-message-id',
              // className: classes.snackbarContent,
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            message={<span
            // id="snackbar-fab-message-id"
            >
              {message}
            </span>}
            action={
              <Fragment>

                <Button
                  color="primary"
                  variant="raised"
                  size="small"
                  onClick={event => {
                    // console.log("click event", event.target);
                    event.stopPropagation();
                    this.closeError(error)
                  }}
                >
                  Отмена
              </Button>

              </Fragment>
            }
          // style={{
          //   position: "absolute",
          //   width: "100%",
          //   height: "100%",
          //   margin: 0,
          //   padding: 0,
          //   // bottom: 0,
          // }}
          // className={classes.snackbar}
          />

          // return <p
          //   key={index}
          //   style={{
          //     color: 'red',
          //   }}
          // >

          //   {message}

          // </p>

        })}
      </Fragment>, window.document.body);

    }
    else {
      return null;
    }

  }



  render() {


    const {
      data,
    } = this.props;

    const {
      object,
    } = data;


    let output;

    if (!object) {
      output = this.renderEmpty();
    }

    else {

      // const draftObject = this.getObjectWithMutations();


      const inEditMode = this.isInEditMode();




      // let defaultView;
      // let editView;

      // const isDirty = this.isDirty();



      let content;


      if (inEditMode) {

        content = this.renderEditableView();

      }
      else {

        content = this.renderDefaultView();

      }


      output = (
        <Fragment>

          {this.renderHeader()}

          {content}

        </Fragment>
      )

    }

    return <Fragment>

      {output}

      {this.renderErrors()}

    </Fragment>

  }

}
