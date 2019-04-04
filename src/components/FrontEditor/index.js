import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import Context from "@prisma-cms/context";

import Page from './components/Page';
import Grid from './components/Grid';
import TextArea from './components/TextArea';
import UsersGrid from './components/UsersGrid';

const styles = {

  root: {
    // border: "1px solid red",
    flex: 1,
    display: "flex",
  },
  toolbar: {
    // border: "1px solid blue",
  },
  editor: {
    // border: "1px solid red",
    flex: 1,
    overflow: "auto",
    height: "100%",
  },
  panel: {
    // border: "1px solid green",
    // flex: 1,
    width: 250,
    height: "100%",
    overflow: "auto",
  },
  panelItem: {
    border: "1px solid #ddd",
    // cursor: "grab",
    padding: 10,
  },
  bordered: {
    border: "1px solid #ddd",
  },

  item: {

    "&.inEditMode": {
      minHeight: "30px",
      border: "1px dotted #ddd",
      padding: 5,

      "&.dragOvered": {
        border: "1px solid red",
      },
      "&.active": {
        border: "1px solid #b806bb",
      },
      "&.hovered": {
        border: "1px solid #7509da",
      },
    },

  },

}

class FrontEditor extends Component {

  static contextType = Context;

  static propTypes = {
    debug: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    // onDrop: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    components: PropTypes.array,
    Components: PropTypes.arrayOf(PropTypes.func).isRequired,
    CustomComponents: PropTypes.arrayOf(PropTypes.func).isRequired,
  };

  static defaultProps = {
    debug: false,
    Components: [
      Grid,
      // TextArea,
      // UsersGrid,
    ],
    CustomComponents: [],
  }


  constructor(props) {

    super(props);

    this.state = {

      /**
       * Элемент в панели управления, который может быть перетянут на страницу
       */
      dragItem: null,

      /**
       * Текущий элемент на странице, в который может быть заброшен новый элемент
       */
      dragTarget: null,

      /**
       * Текущий элемент на странице, свойства которого можно редактировать (выбирается по клику)
       */
      activeItem: null,

      /**
       * Элемент, на который наведена мышь
       */
      hoveredItem: null,

      Components: this.prepareComponents(),
    }

  }


  prepareComponents() {

    const {
      Components,
      CustomComponents,
    } = this.props;

    // console.log("Components", Components);

    let baseComponents = [Page].concat(Components)
      .filter(n => n && !CustomComponents.find(i => i.name === n.name));

    // console.log("baseComponents", baseComponents);

    return baseComponents.concat(CustomComponents).filter(n => n);
  }

  // onDragOver(event) {

  //   const {
  //     dragItem,
  //   } = this.state;

  //   if (!dragItem) {
  //     return;
  //   }

  //   event.preventDefault();



  // }


  // onDragEnter(event) {

  //   const {
  //     dragItem,
  //   } = this.state;

  //   if (!dragItem) {
  //     return;
  //   }



  // }

  // onDrop(event) {

  //   const {
  //     dragItem,
  //   } = this.state;

  //   if (!dragItem) {
  //     return;
  //   }




  // }


  // renderPanels() {

  //   const {
  //     Grid,
  //   } = this.context;

  //   const {
  //     classes,
  //   } = this.props;


  //   let items = [
  //     {
  //       type: "Text",
  //       label: "Текст",
  //     },
  //     {
  //       type: "EditorGrid",
  //       label: "Три колонки",
  //     },
  //   ];

  //   return <Grid
  //     container
  //     spacing={8}
  //   >

  //     {items.map(n => {

  //       const {
  //         type,
  //         label,
  //       } = n;

  //       return <Grid
  //         key={type}
  //         item
  //         className={classes.panelItem}
  //         draggable
  //         onDragStart={event => {



  //           this.setState({
  //             dragItem: n,
  //           });

  //         }}
  //         onDragEnd={event => {



  //           this.setState({
  //             dragItem: null,
  //           });
  //         }}
  //       >
  //         {label || type}
  //       </Grid>
  //     })}

  //   </Grid>

  // }


  getParent(item) {

    const {
      components,
    } = this.props;




    // let parent;
    // let current = findParent(item, components);

    // if (components && components.length) {

    //   components.reduce((current, next) => {




    //     return current;

    //   });

    // }

  }


  // findParent(item, components){

  //   let parent;

  //   components.map(n => {

  //     const {
  //       children,
  //     } = n;

  //     if(children && children.length) {
  //       this.findParent(item, children);
  //     }

  //   });

  //   return parent;

  // }


  renderPanels() {

    const {
      Grid,
    } = this.context;

    const {
      classes,
      // Components,
    } = this.props;

    const Components = this.getComponents();

    const {
      activeItem,
    } = this.state;




    // return null

    // let items = [
    //   // {
    //   //   type: "Text",
    //   //   label: "Текст",
    //   // },
    //   {
    //     type: "Page",
    //     label: "Основная страница",
    //     Component: Page,
    //   },
    //   {
    //     type: "TextArea",
    //     label: "Текстовая область",
    //     Component: TextArea,
    //   },
    //   {
    //     type: "EditorGrid",
    //     label: "Три колонки",
    //     Component: EditorGrid,
    //   },
    // ];

    /**
     * Если выбран активный элемент, выводим настройки для него
     */

    let settingsView;

    if (activeItem) {



      const Element = activeItem.constructor;



      settingsView = <div>
        <Element
          mode="settings"
        />
      </div>

    }

    return <Grid
      container
      spacing={8}
    >

      {Components.map(Component => {

        const name = Component.name;

        return <Grid
          key={name}
          item
        >
          <Component
            mode="panel"
            className={classes.panelItem}
          // draggable
          // onDragStart={event => {



          //   this.setState({
          //     dragItem: n,
          //   });

          // }}
          // onDragEnd={event => {



          //   this.setState({
          //     dragItem: null,
          //   });
          // }}

          />
        </Grid>
      })}

      <Grid
        item
        xs={12}
      >
        {settingsView}
      </Grid>

    </Grid>

  }


  renderItems() {

    const {
      Grid,
    } = this.context;

    const {
      // inEditMode,
      components,
      // Components,
      classes,
    } = this.props;

    const Components = this.getComponents();

    let output = [];



    // return null;

    if (components && Array.isArray(components)) {

      components.map((n, index) => {

        const {
          type,
          props,
          children,
          ...other
        } = n;


        // console.log("Components", Components);

        // return;

        let Component = Components.find(n => n.name === type);



        // switch (type) {

        //   case "Page":
        //     Component = Page;

        //     break;

        //   case "Text":
        //     Component = TextArea;

        //     break;

        //   case "EditorGrid":


        //     Component = EditorGrid;

        //     break;

        // }

        if (Component) {

          output.push(<Component
            key={index}
            // inEditMode={inEditMode}
            // components={data || {}}
            onChange={data => {



            }}
            mode="main"
            // props={props}
            component={n}
            deleteItem={() => {




              components.splice(index, 1);

              this.updateObject({
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


  updateObject(data) {

    // console.log("onChange", data);

    const {
      components,
    } = data;

    const {
      onChange,
    } = this.props;

    if (onChange && components !== undefined) {

      return onChange(components);

    }

  }


  getComponents() {

    const {
      Components,
    } = this.state;

    return Components;

  }


  renderToolbar(){

    return null;
  }


  render() {

    const {
      classes,
      children,
      components,
      updateObject,
      // Components,
      inEditMode,
      debug,
    } = this.props;

    const {
      dragItem,
      dragTarget,
      activeItem,
      hoveredItem,
    } = this.state;

    const Components = this.getComponents();

    let items = this.renderItems();

    return (
      <Context.Consumer>
        {context => <Context.Provider
          value={Object.assign(context, {
            inEditMode,
            classes,
            components,
            updateObject: data => this.updateObject(data),
            dragItem,
            dragTarget,
            activeItem,
            hoveredItem,
            onDragStart: item => {

              this.setState({
                dragItem: item,
              });

            },
            onDragEnd: item => {

              this.setState({
                dragItem: null,
                dragTarget: null,
                activeItem: null,
                hoveredItem: null,
              });
            },
            setDragTarget: component => {
              this.setState({
                dragTarget: component,
              });
            },
            setActiveItem: component => {
              this.setState({
                activeItem: component,
              });
            },
            setHoveredItem: component => {
              this.setState({
                hoveredItem: component,
              });
            },
            getParent: item => this.getParent(item),
            // Components: {
            //   EditorGrid: EditorGrid,
            //   TextArea: TextArea,
            //   Page: Page,
            // },
            Components,
          })}
        >
          {inEditMode
            ? <Fragment>
              <div
                className={[classes.toolbar, classes.bordered].join(" ")}
              >
                {this.renderToolbar()}
              </div>
              <div
                className={classes.root}
              >
                <div
                  className={[classes.editor, classes.bordered].join(" ")}
                // onDragOver={event => this.onDragOver(event)}
                // onDragEnter={event => this.onDragEnter(event)}
                // onDrop={event => this.onDrop(event)}
                >
                  {items}

                  {children}

                  {debug && components ? <div
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {JSON.stringify(components, true, 2)}
                  </div> : null}

                </div>
                <div
                  className={[classes.panel, classes.bordered].join(" ")}
                >
                  {this.renderPanels()}
                </div>
              </div>
            </Fragment>
            : items
          }
        </Context.Provider>}
      </Context.Consumer>
    );
  }
}


export default withStyles(styles)(props => <FrontEditor
  {...props}
/>);