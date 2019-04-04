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
    cursor: "grab",
    padding: 10,
    border: "1px solid #ddd",
    "&.active": {
      border: "1px solid #b806bb",
    },
    "&:hover": {
      border: "1px solid #7509da",
    },
  },
  panelButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    toolbar: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    debug: false,
    Components: [
      Grid,
      TextArea,
      UsersGrid,
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


    let baseComponents = [Page].concat(Components)
      .filter(n => n && !CustomComponents.find(i => i.name === n.name));


    return baseComponents.concat(CustomComponents).filter(n => n);
  }


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

        return <Component
          key={name}
          mode="panel"
          className={classes.panelItem}
        />
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
      components,
    } = this.props;

    const Components = this.getComponents();

    let output = [];


    if (components && Array.isArray(components)) {

      components.map((n, index) => {

        const {
          type,
          props,
          children,
          ...other
        } = n;

        let Component = Components.find(n => n.name === type);


        if (Component) {

          output.push(<Component
            key={index}
            mode="main"
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


  renderToolbar() {

    const {
      toolbar,
    } = this.props;

    return toolbar ? toolbar : null;
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