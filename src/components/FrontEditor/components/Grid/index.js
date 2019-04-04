import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';

import GridIcon from "material-ui-icons/GridOn";


class Grid extends EditorComponent {



  onBeforeDrop = () => {

  }


  canBeDropped(dragItem) {

    return true;
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
          Object.assign(newItem, {
            container: undefined,
            item: true,
            xs: 12,
            sm: 6,
            md: 4,
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

    // console.log("Grid props", this.props);

    return <MaterialUiGrid

      {...this.getRenderProps()}
    >

      {super.renderMainView()}

    </MaterialUiGrid>;
  }

}

export default Grid;
