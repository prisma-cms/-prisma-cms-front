import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';

import GridIcon from "material-ui-icons/GridOn";


class Grid extends EditorComponent {


  // static propTypes = {
  //   ...EditorComponent.propTypes,
  // }


  static defaultProps = {
    ...EditorComponent.defaultProps,
  }


  onBeforeDrop = () => {

  }


  canBeDropped(dragItem) {

    return true;
  }


  getEditorField(props) {

    const {
      name,
    } = props;

    switch (name) {

      case "container":
      case "item":

        Object.assign(props, {
          disabled: true,
        });

        break;

    }

    return super.getEditorField(props);
  }

 

  updateComponentProps(component, name, value) {


    switch (name) {

      case "xs":
      case "sm":
      case "md":
      case "lg":
      case "xl":

        if (value === 0) {
          value = true;
        }
        else if (!value || typeof value !== "number" || value < 0 || value > 12) {
          return false;
        }

        break;

    }


    return super.updateComponentProps(component, name, value);
  }


  removeProps(name) {


    switch (name) {

      case "container":
      case "item":

        return false;

        break;

    }


    return super.removeProps(name);
  }


  renderPanelView() {

    const {
      classes,
    } = this.context;

    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <GridIcon /> Grid
    </div>);
  }


  prepareNewItem() {


    let newItem = super.prepareNewItem();



    if (!newItem) {
      return false;
    }

    const {
      dragItem,
    } = this.context;



    let {
      container,
    } = this.props;



    const {
      type,
    } = dragItem;


    switch (type) {

      case "Grid":

        if (container) {

          delete newItem.container;

          Object.assign(newItem, {
            item: true,
            xs: 12,
            sm: 6,
            md: 4,
            lg: 4,
            xl: 4,
          });
        }
        else {
          Object.assign(newItem, {
            container: true,
          });
        }


        break;

    }


    return newItem;

  }


  prepareDragItem() {

    let newItem = super.prepareDragItem();

    Object.assign(newItem, {
      container: true,
    });

    return newItem;
  }


  renderMainView() {

    const {
      Grid: MaterialUiGrid,
    } = this.context;



    return <MaterialUiGrid

      {...this.getRenderProps()}
    >

      {super.renderMainView()}

    </MaterialUiGrid>;
  }

}

export default Grid;
