import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ConnectorIcon from "material-ui-icons/SwapHoriz";
import { Select } from 'material-ui';
import { FormControl } from 'material-ui';
import { InputLabel } from 'material-ui';
import { MenuItem } from 'material-ui';

import {
  createContext,
} from 'react';

import Context from "@prisma-cms/context";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import EditorComponent from '..';

export const ConnectorContext = createContext({});

class Connector extends EditorComponent {


  static defaultProps = {
    ...EditorComponent.defaultProps,
    query: "",
    pagevariable: "page",
  };


  // canBeDropped(dragItem) {



  //   return dragItem && dragItem instanceof ConnectorView ? true : false;
  // }


  renderPanelView() {

    const {
      classes,
    } = this.context;


    return super.renderPanelView(<div
      className={classes.panelButton}
    >
      <ConnectorIcon
      /> Connector
    </div>);
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
      query,
    } = this.context;


    const activeItem = this.getActiveItem();


    const queryNames = Object.keys(query);



    let field;


    if (!field) {

      switch (name) {

        case "query":

          field = <FormControl
            key={key}
            fullWidth
          >
            <InputLabel>Query name</InputLabel>
            <Select
              value={value}
              onChange={event => this.onChangeProps(event)}
              inputProps={{
                name,
                // id: 'age-simple',
              }}
            >
              {queryNames.filter(n => n.endsWith && n.endsWith("Connection")).map(queryName => {

                return <MenuItem
                  key={queryName}
                  value={queryName}
                >
                  {queryName}
                </MenuItem>
              })}
            </Select>
          </FormControl>;
          break;

        // case "skip":
        // case "last":

        //   type = "number";

        //   break;
      }

    }


    if (!field) {


      if (activeItem) {

        const {
          props: {
            query: fieldName,
          },
        } = activeItem;

        if (fieldName) {

          const Field = this.getSchemaField(fieldName);




          if (Field) {

            const {
              args,
            } = Field;

            const arg = args ? args.find(n => n.name === name) : null;

            if (arg) {


              const {
                type: {
                  kind: typeKind,
                  name: typeName,
                },
              } = arg;

              switch (typeKind) {

                case "ENUM":


                  const Type = this.getSchemaType(n => n.name === typeName && n.kind === typeKind);

                  if (Type) {



                    const {
                      enumValues,
                    } = Type;

                    field = <FormControl
                      key={key}
                      fullWidth
                    >
                      <InputLabel>{name}</InputLabel>
                      <Select
                        value={value || ""}
                        onChange={event => this.onChangeProps(event)}
                        inputProps={{
                          name,
                          // id: 'age-simple',
                        }}
                      >
                        {enumValues.map(n => {

                          const {
                            name: fieldName,
                          } = n;

                          return <MenuItem
                            key={fieldName}
                            value={fieldName}
                          >
                            {fieldName}
                          </MenuItem>
                        })}
                      </Select>
                    </FormControl>;

                  }

                  break;

                case "SCALAR":

                  // console.log("arg", arg);

                  switch (typeName) {

                    case "Int":
                    case "Float":

                      type = "number";
                      break;

                  }

                  break;

              }

            }

          }

        }

      }

    }


    Object.assign(props, {
      type,
      name,
      value,
    });


    if (name === "skip") {
    }


    return field !== undefined ? field : super.getEditorField(props);

  }


  updateComponentProps(component, name, value) {



    let newProps = {};

    switch (name) {

      case "query":

        {

          const Field = this.getSchemaField(value);

          if (Field) {

            const {
              args,
            } = Field;


            args.map(n => {



              let {
                name: argName,
                defaultValue,
                type: {
                  kind: typeKind,
                  name: typeName,
                  ofType,
                },
              } = n;


              let propName;
              let propValue;

              switch (typeKind) {

                case "SCALAR":

                  switch (typeName) {

                    case "Int":
                    case "Float":

                      propName = argName;
                      propValue = defaultValue ? parseFloat(defaultValue) : defaultValue;

                      break;

                    case "String":


                      break;

                  }

                  break;

                case "ENUM":

                  propName = argName;
                  propValue = defaultValue;

                  break;

              }


              if (propName) {
                Object.assign(newProps, {
                  [propName]: propValue,
                });
              }


            });

          }
          else {
            return false;
          }

        }

        break;

    }




    return this.updateComponent(component, {
      ...newProps,
      [name]: value,
    });
  }


  getSchemaField(fieldName) {

    const {
      schema,
    } = this.context;



    const {
      queryType: {
        name: queryTypeName,
      },
      types,
    } = schema;

    const query = schema.types.find(n => n.kind === "OBJECT" && n.name === queryTypeName);



    const Field = query.fields.find(n => n.name === fieldName);



    return Field;

  }


  getSchemaType(filter) {

    const {
      schema,
    } = this.context;



    const {
      types,
    } = schema;


    const Field = types.find(filter);


    return Field;

  }


  renderMainView() {

    const {
      orderBy,
      query,
      ...other
    } = this.getRenderProps();

    return <div
      {...other}
    >
      <Viewer
        key={query}
        {...this.getComponentProps(this)}
      >
        {super.renderMainView()}
      </Viewer>

    </div>
  }

}



class Viewer extends Component {

  static contextType = Context;


  componentWillMount() {


    const {
      query,
    } = this.props;


    if (query) {

      const {
        query: {
          [query]: apiQuery,
        },
      } = this.context;

      this.Renderer = graphql(gql(apiQuery))(props => {



        const {
          children,
          ...other
        } = props;

        return <ConnectorContext.Consumer>
          {context => <ConnectorContext.Provider
            value={{
              ...context,
              ...other,
            }}
          >
            {children}
          </ConnectorContext.Provider>}
        </ConnectorContext.Consumer>;

      });

    }

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      query,
      children,
      first,
      pagevariable: pageVariable = "page",
      ...other
    } = this.props;

    const {
      Renderer,
    } = this;


    const {
      uri,
    } = this.context;


    let {
      [pageVariable]: page,
    } = uri.query(true);


    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * first : 0;




    return <ConnectorContext.Provider
      value={{
        query,
        pageVariable,
      }}
    >
      {Renderer ?
        <Renderer
          page={page}
          skip={skip}
          first={first}
          {...other}
        >
          {children}
        </Renderer> :
        children
      }
    </ConnectorContext.Provider>

  }
}


export default Connector;