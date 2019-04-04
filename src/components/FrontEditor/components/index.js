import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";
import { Button, IconButton } from 'material-ui';

import DeleteIcon from "material-ui-icons/Delete";
import CloseIcon from "material-ui-icons/Close";


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

    console.log("this.prepareDragItem()", this.prepareDragItem());

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


        Object.assign(component, {
          components: itemComponents,
        });

        updateObject({
          components,
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


  getComponentProps() {



    const {
      component: {
        type,
        components,
        ...props
      },
    } = this.props;


    return props;
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
        style,
        ...props
      },
    } = activeItem;


    style = style || {}


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


    </Grid>;
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