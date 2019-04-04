import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditorComponent from '..';


class Grid extends EditorComponent {



  onBeforeDrop = () => {

  }


  canBeDropped(dragItem) {

    return true;
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
      props: {
        container,
      },
    } = this.props;


    let {
      props,
    } = newItem;


    const {
      type,
    } = dragItem;


    switch (type) {

      case "Grid":

        if (container) {
          Object.assign(newItem, {
            props: {
              ...props,
              container: undefined,
              item: true,
              xs: 12,
              sm: 6,
              md: 4,
            },
          });
        }
        else {
          Object.assign(newItem, {
            props: {
              ...props,
              container: true,
            },
          });
        }


        break;

    }


    return newItem;

  }


  prepareDragItem() {

    let newItem = super.prepareDragItem();

    let {
      props,
    } = newItem;

    newItem.props = {
      ...props,
      container: true,
    }

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
