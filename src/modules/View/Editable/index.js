import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import EditIcon from 'material-ui-icons/ModeEdit';
import ResetIcon from 'material-ui-icons/Restore';
import SaveIcon from 'material-ui-icons/Save';

import View from '../';

export default class EditableView extends View {

  static propTypes = {
    object: PropTypes.object.isRequired,
    saveObject: PropTypes.func.isRequired,
  }


  static contextTypes = {
    user: PropTypes.object,
  }


  constructor(props){

    super(props);

    this.state = {
      inEditMode: false,
      _dirty: null,
      notifications: [],
    }

  }


  startEdit(){

    this.setState({
      inEditMode: true,
    });

  }

  resetEdit(){

    this.setState({
      inEditMode: false,
      _dirty: null,
    });

  }


  async save(){

    const {
      saveObject,
    } = this.props;

    const {
      _dirty,
    } = this.state;


    // const result = await saveObject(_dirty);




    const result = await saveObject(_dirty)
    .then(r => {

      this.setState({
        _dirty: null,
        inEditMode: false,
        errors: null,
      });

      return r;
    })
    .catch(e => {
      console.error(e);
    });

    return result;

  }


  isInEditMode(){

    const {
      inEditMode,
      _dirty,
    } = this.state;

    return inEditMode || _dirty ? true : false;

  }


  isDirty(){

    return this.state._dirty ? true : false;

  }


  onChange(event){

    const {
      name,
      value,
    } = event.target;

    this.updateObject({
      [name]: value,
    });

  }


  updateObject(data){

    const {
      _dirty = {},
    } = this.state;

    this.setState({
      _dirty: Object.assign({..._dirty}, data),
    });

  }


  getEditor(props){

    const {
      Editor,
      name,
      ...other
    } = props;


    const object = this.getObjectWithMutations();

    
    if(!object){
      return null;
    }

    const value = object[name] || "";



    // return null;

    return Editor && <Editor
      onChange={event => {
        this.onChange(event);
      }}
      name={name}
      value={value}
      {...other}
    /> || null;

  }


  getTextField(props = {}){

    props = Object.assign({
      Editor: TextField,
    }, props);

    return this.getEditor(props);

  }


  getObjectWithMutations(){

    const {
      object,
    } = this.props;

    if(!object){
      return object;
    }

    const {
      _dirty,
    } = this.state;

    if(_dirty){

      const draftObject = {...object}

      return Object.assign(draftObject, _dirty);

    }
    else{
      return object;
    }

  }

  
  getButtons(){


    const inEditMode = this.isInEditMode();

    const isDirty = this.isDirty();

    let buttons = [];

    if(this.canEdit()){

      if(inEditMode){

        buttons.push(<IconButton
          key="reset"
          onClick={event => {
            this.resetEdit();
          }}
        >
          <ResetIcon 
          />
        </IconButton>);


        if(isDirty){

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
      else{
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


  canEdit(){

    return false;

  }


  getTitle(){
    
    const {
      object,
    } = this.props;
  
    const {
      name,
    } = object;

    return name;

  }


  renderHeader(){
    

    return <Typography
      type="title"
    >
      {this.getTitle()}

      {this.getButtons()}

    </Typography>
  }


  renderDefaultView(){

    return null;

  }


  renderEditableView(){

    return null;
    
  }


  addError(error){

    const {
      notifications = [],
    } = this.state;

    notifications.push(error);

    setTimeout(() => {

      const {
        notifications,
      } = this.state;

      if(notifications){

        const index = notifications.indexOf(error);

        if(index !== -1){

          notifications.splice(index, 1);

          this.setState({
            notifications,
          });

        }

      }

    }, 5000);


    this.setState({
      notifications,
    });

  }


  renderErrors(){

    const {
      notifications,
    } = this.state;

    if(notifications && notifications.length){

      return <div>
        {notifications.map((error, index) => {
          
          return <p
            key={index}
            style={{
              color: 'red',
            }}
          >

            {error}

          </p>

        })}
      </div>

    }
    else{
      return null;
    }

  }


  render() {


    const {
      object,
    } = this.props;

    if(!object){
      return null;
    }

    const draftObject = this.getObjectWithMutations();

    
    const inEditMode = this.isInEditMode();




    let defaultView;
    let editView;

    const isDirty = this.isDirty();

    

    let content;


    if(inEditMode){

      content = this.renderEditableView();

    }
    else{

      content = this.renderDefaultView();

    }


    return (
      <div>
        
        {this.renderHeader()}

        {this.renderErrors()}

        {content}

      </div>
    )
  }

}
