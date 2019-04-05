import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";
import { Button, IconButton, TextField } from 'material-ui';

import DeleteIcon from "material-ui-icons/Delete";
import CloseIcon from "material-ui-icons/Close";
import { FormControlLabel } from 'material-ui';
import { Switch } from 'material-ui';


class EditorComponent extends Component {

  static contextType = Context;

  static propTypes = {
    mode: PropTypes.oneOf(["main", "panel", "settings"]).isRequired,

    /**
     * Родительский инстанс компонента.
     * Нужен для того, чтобы получить доступ к родительским элементам
     */
    parent: PropTypes.object,
    deleteItem: PropTypes.func,
    deletable: PropTypes.bool.isRequired,
  };


  static defaultProps = {
    deletable: true,
  }

  onDragStart() {

    const {
      onDragStart,
    } = this.context;



    onDragStart(this.prepareDragItem());

  }


  /**
   * Создаем новый элемент, который будет добавлен в схему при перетаскивании
   */
  prepareDragItem() {

    return {
      component: this,
      type: this.constructor.name,
    };
  }


  onDragEnd(event) {


    const {
      onDragEnd
    } = this.context;

    onDragEnd(event);

  }


  onDrop(event) {


    const {
      dragItem,
      dragTarget,
      components,
      updateObject,
    } = this.context;


    let {
      component,
      // container,
    } = this.props;


    if (dragItem && dragTarget && dragTarget === this) {

      event.preventDefault();
      event.stopPropagation();


      const newItem = this.prepareNewItem();



      if (newItem) {

        let {
          components: itemComponents,
        } = component;

        itemComponents = itemComponents || [];


        itemComponents.push(newItem);


        // Object.assign(component, {
        //   components: itemComponents,
        // });

        // updateObject({
        //   components,
        // });

        this.updateComponent(component, {
          components: itemComponents,
        });

      }

      return true;
    }

  }


  prepareNewItem() {

    const {
      dragItem,
    } = this.context;


    let {
      component: componentProto,
      ...newItem
    } = dragItem;


    return newItem;

  }

  /**
   * При клике по активному элементу в документе,
   * отмечаем его, чтобы можно было редактировать его свойства
   */
  onClick(event) {



    event.preventDefault();
    event.stopPropagation();

    const {
      setActiveItem,
    } = this.context;

    setActiveItem(this);

  }


  onMouseOver(event) {



    event.preventDefault();
    event.stopPropagation();

    const {
      setHoveredItem,
    } = this.context;

    setHoveredItem(this);

  }


  onMouseLeave(event) {



    event.preventDefault();
    event.stopPropagation();

    const {
      setHoveredItem,
      hoveredItem,
    } = this.context;

    if (hoveredItem && hoveredItem === this) {

      setHoveredItem(null);

    }

  }


  canBeDropped(dragItem) {

    return false;
  }


  onDragEnter(event) {


    const {
      setDragTarget,
      dragItem,
    } = this.context;

    if (dragItem && this.canBeDropped(dragItem.component)) {

      event.preventDefault();
      event.stopPropagation();

      setDragTarget(this);

      return true;

    }


  }

  onDragOver(event) {

    const {
      dragTarget,
    } = this.context;

    if (dragTarget === this) {

      event.preventDefault();
      event.stopPropagation();

      return true;
    }

  }


  getComponentProps(component) {


    // const {
    //   component: {
    //     type,
    //     components,
    //     ...props
    //   },
    // } = this.props;

    const {
      mode,
      deletable,
      deleteItem,
      parent,
      components,
      component: {
        type,
        components: itemComponents,
        ...props
      },
      ...other
    } = component.props;


    return {
      ...other,
      ...props,
    };
  }


  getRenderProps() {

    const {
      dragTarget,
      activeItem,
      hoveredItem,
      inEditMode,
      classes,
    } = this.context;


    const {
      className,
      mode,
      deleteItem,
      deletable,
      component,
      ...other
    } = this.props;


    let classNames = [
      className,
      // propsClassName,
    ];

    let componentProps = {
      ...component,
      ...other,
      // ...otherProps,
    };


    if (inEditMode) {

      const isDragOvered = dragTarget === this ? true : false;
      const isActive = activeItem === this ? true : false;
      const isHovered = hoveredItem === this ? true : false;


      classNames = classNames.concat([
        classes.item,
        inEditMode ? "inEditMode" : "",
        isDragOvered ? "dragOvered" : "",
        isActive ? "active" : "",
        isHovered ? "hovered" : "",

      ]);

      Object.assign(componentProps, {
        onDrop: event => this.onDrop(event),
        onDragEnter: event => this.onDragEnter(event),
        onDragOver: event => this.onDragOver(event),
        onClick: event => this.onClick(event),
        onMouseOver: event => this.onMouseOver(event),
        onMouseLeave: event => this.onMouseLeave(event),

      });
    }

    Object.assign(componentProps, {
      className: classNames.filter(n => n).join(" "),
    });

    return componentProps;
  }


  renderPanelView(content) {

    const {
      classes,
      Grid,
    } = this.context;

    // const isActive = this.isActive();

    return <Grid
      item
    >
      <div
        // className={[classes.panelItem, isActive ? "active" : ""].join(" ")}
        className={classes.panelItem}
        draggable
        onDragStart={event => this.onDragStart(event)}
        onDragEnd={event => this.onDragEnd(event)}
      >
        {content || this.constructor.name}
      </div>
    </Grid>
  }


  renderSettingsView() {


    const activeItem = this.getActiveItem();

    if (!activeItem) {
      return null;
    }

    const {
      Grid,
      setActiveItem,
    } = this.context;


    let {
      props: {
        component,
        deleteItem,
        deletable,
        ...other
      },
      constructor: {
        propTypes,
        // defaultProps,
      },
    } = activeItem;


    let {
      style,
      type,
      components,
      // ...componentProps
    } = component;

    style = style || {}


    const componentProps = this.getComponentProps(activeItem);





    let settings = [];

    // if (propTypes) {

    //   const names = Object.keys(propTypes);



    //   names.map(name => {



    //     const propType = propTypes[name];



    //     if (propType === PropTypes.string || PropTypes.string.isRequired) {

    //       settings.push(<TextField
    //         key={name}
    //         name={name}
    //         label={name}
    //         value={component[name] || ""}
    //         fullWidth
    //         onChange={event => this.onChangeProps(event)}
    //       />);

    //     }

    //   })

    // }




    if (componentProps) {

      const names = Object.keys(componentProps);


      names.map(name => {


        // const propType = propTypes[name];

        let value = componentProps[name];

        const type = typeof value;


        const field = this.getEditorField({
          key: name,
          type,
          name,
          label: name,
          value,
        });

        if (field) {
          settings.push(field);
        }

        // if (type === "boolean") {

        //   settings.push(<FormControlLabel
        //     key={name}
        //     control={
        //       <Switch
        //         checked={value}
        //         // onChange={this.handleChange('checkedB')}
        //         // value="checkedB"
        //         color="primary"
        //       />
        //     }
        //     label={name}
        //   />);

        // }

        // else if (type === "string") {

        //   settings.push(<TextField
        //     key={name}
        //     name={name}
        //     label={name}
        //     value={component[name] || ""}
        //     fullWidth
        //     onChange={event => this.onChangeProps(event)}
        //   />);

        // }
        // else if (type === "number") {

        //   settings.push(this.getEditorField({
        //     key: name,
        //     type: "number",
        //     name: name,
        //     label: name,
        //     value: value || "",
        //     fullWidth: true,
        //   }));

        //   // settings.push(<TextField
        //   //   key={name}
        //   //   type="number"
        //   //   name={name}
        //   //   label={name}
        //   //   value={component[name] || ""}
        //   //   fullWidth
        //   //   onChange={event => this.onChangeProps(event)}
        //   // />);
        // }


      })

    }



    return <Grid
      container
      spacing={8}
    >

      <Grid
        item
        xs={12}
      >

        <Grid
          container
          spacing={8}
          style={{
            flexDirection: "row-reverse",
          }}
        >

          <Grid
            item
          >
            <IconButton
              title="Завершить редактирование элемента"
              onClick={event => {

                setActiveItem(null);

              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          {deleteItem && deletable ?
            <Grid
              item
            >
              <IconButton
                title="Удалить элемент"
                onClick={event => {

                  deleteItem();
                  setActiveItem(null);

                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            : null
          }

        </Grid>

      </Grid>


      {settings && settings.length ?
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            spacing={8}
            style={{
              borderTop: "1px solid #ddd",
            }}
          >
            {settings}
          </Grid>
        </Grid> :
        null
      }

    </Grid>;
  }


  getEditorField(props) {

    let {
      key,
      type,
      name,
      value,
      ...other
    } = props;


    const {
      Grid,
    } = this.context;

    let field = null;

    if (type === "object") {

      if (value === null) {
        type = "string";
      }

    }

    switch (type) {

      case "boolean":


        field = <Grid
          key={key}
          container
        >
          <Grid
            item
            xs
          >
            {/* <TextField
              // key={name}
              // type="number"
              // name={name}
              // label={name}
              // value={component[name] || ""}
              // fullWidth
              onChange={event => this.onChangeProps(event)}
              {...props}
            /> */}

            <FormControlLabel
              control={
                <Switch
                  name={name}
                  checked={value}
                  color="primary"
                  onChange={event => this.onChangeProps(event)}
                  {...other}
                />
              }
              label={name}
            />

          </Grid>
          <Grid
            item
          >
            <IconButton
              onClick={event => {
                this.removeProps(name);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
          ;

        break;

      case "number":
      case "string":
      case "undefined":

        field = <Grid
          key={key}
          container
        >
          <Grid
            item
            xs
          >
            <TextField
              // key={name}
              type={type}
              name={name}
              // label={name}
              value={value || ""}
              fullWidth
              onChange={event => this.onChangeProps(event)}
              {...other}
            />

          </Grid>
          <Grid
            item
          >
            <IconButton
              onClick={event => {
                this.removeProps(name);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
          ;

      default: ;
    }



    return field;
  }


  onChangeProps(event) {


    return this.updateProps(event.target);
  }

  updateProps(node) {

    let {
      name,
      value,
      type,
      checked,
    } = node;



    const activeItem = this.getActiveItem();

    const {
      components,
      updateObject,
    } = this.context;

    let {
      props: {
        component,
      },
    } = activeItem;


    switch (type) {

      case "boolean":
      case "checkbox":

        value = checked;
        break;

      case "number":



        // value = parseFloat(value);
        value = Number(value);


        break;

    }


    this.updateComponentProps(component, name, value);

  }


  updateComponentProps(component, name, value) {

    return this.updateComponent(component, {
      [name]: value,
    });
  }


  updateComponent(component, data) {

    let {
      components,
      updateObject,
    } = this.context;

    Object.assign(component, data);

    updateObject({
      components,
    });

  }


  removeProps(name) {

    const activeItem = this.getActiveItem();

    const {
      components,
      updateObject,
    } = this.context;

    let {
      props: {
        component,
      },
    } = activeItem;


    delete component[name];

    updateObject({
      components,
    })

  }


  getActiveItem() {

    const {
      activeItem,
    } = this.context;

    return activeItem;

  }


  isActive() {

    const activeItem = this.getActiveItem();

    return activeItem && activeItem instanceof this.constructor ? true : false;

  }


  renderMainView() {

    return this.renderChildren();
  }


  renderChildren() {


    const {
      Components,
      components,
      updateObject,
    } = this.context;

    const {
      component: {
        components: itemComponents,
      },
    } = this.props;


    let output = [];



    if (itemComponents && itemComponents.length) {

      itemComponents.map((n, index) => {

        const {
          type,
          props,
          ...other
        } = n;


        let Component = Components.find(n => n.name === type);

        if (Component) {

          output.push(<Component
            key={index}
            mode="main"
            component={n}
            parent={this}
            deleteItem={() => {

              itemComponents.splice(index, 1);

              updateObject({
                components,
              });

            }}
            {...other}
          />);

        }



      })



    }


    return output;
  }


  render() {

    const {
      mode,
      props,
      children,
      ...other
    } = this.props;

    let content = null;


    switch (mode) {

      case "panel":

        const activeItem = this.getActiveItem();

        if (!activeItem || this.isActive()) {
          content = this.renderPanelView();
        }

        break;

      case "main":

        content = this.renderMainView();
        break;

      case "settings":

        content = this.renderSettingsView();
        break;
    }

    if (!content) {
      return null;
    }


    return content;

  }
}


export default EditorComponent;