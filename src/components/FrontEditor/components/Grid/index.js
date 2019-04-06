import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';

import GridIcon from "material-ui-icons/GridOn";
import { Button } from 'material-ui';


class Grid extends EditorComponent {


  // static propTypes = {
  //   ...EditorComponent.propTypes,
  // }


  static defaultProps = {
    ...EditorComponent.defaultProps,
  }


  onBeforeDrop = () => {

  }


  getEditorField(props) {

    const {
      key,
      name,
      value,
    } = props;


    switch (name) {

      case "container":
      case "item":

        return <Button
          key={key}
          size="small"
          variant="raised"
          onClick={event => {

            const component = this.getActiveComponent();

            this.updateComponentProps(component, name === "container" ? "item" : "container", true);

          }}
        >
          {name}
        </Button>

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

      // case "container":

      //   break;

    }


    return super.updateComponentProps(component, name, value);
  }


  updateComponent(component, data) {

    if (data.container) {

      Object.assign(data, {
        item: undefined,
        xs: undefined,
        sm: undefined,
        md: undefined,
        lg: undefined,
        xl: undefined,
        alignItems: "flex-end",
      });

    }
    else if (data.item) {
      Object.assign(data, {
        container: undefined,
        alignItems: undefined,
        ...this.getItemDefaultProps(),
      });
    }

    return super.updateComponent(component, data);
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
            ...this.getItemDefaultProps(),
            item: true,
          });
        }
        else {
          Object.assign(newItem, {
            container: true,
            alignItems: "flex-end",
            spacing: 0,
          });
        }


        break;

    }


    return newItem;

  }


  getItemDefaultProps() {

    return {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2,
    };
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
