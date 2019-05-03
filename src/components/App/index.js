// @flow

import React, { Component } from 'react'
import PropTypes from "prop-types";

import Renderer from './Renderer';

import {
  buildClientSchema,
  introspectionQuery,
} from "graphql";

import Context from "@prisma-cms/context";

import { MuiThemeProvider, createMuiTheme, getMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';

import UriProvider from "../../modules/uri-provider";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createTypography from 'material-ui/styles/createTypography';
import createPalette from 'material-ui/styles/createPalette';

let sheetsManager = new Map();

// const theme = createMuiTheme({
//   palette: {
//   },
//   typography: {
//     fontFamily: "Tahoma, Helvetica, sans-serif",
//     fontSize: 14,
//   },
// });


function getTheme(uiTheme) {


  const {
    direction,
    paletteType,
    typography: typographyNull,
    // overrides,
    ...other
  } = uiTheme;


  const palette = createPalette({
    type: paletteType,
    primary: {
      ...blue,
      // main: "#ff0000",
    },
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08),
    },
  });

  // let palette = {
  //   primary: {
  //     ...blue,
  //     // main: "#ff0000",
  //   },
  //   secondary: {
  //     // Darken so we reach the AA contrast ratio level.
  //     main: darken(pink.A400, 0.08),
  //   },
  //   type: paletteType,
  // }


  const typography = createTypography(palette, {
    fontFamily: '"Roboto"',
  });

  const theme = createMuiTheme({
    direction,
    nprogress: {
      color: paletteType === 'light' ? '#000' : '#fff',
    },
    palette,
    typography,
    // overrides: {
    //   // ...overrides,
    // },
    ...other,
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    global.theme = theme;
  }

  return theme;
}


let schema;

const SchemaLoaderQuery = graphql(gql`
  ${introspectionQuery}
`, {
    options: {
      fetchPolicy: typeof window === "undefined" ? "no-cache" : "cache-first",
      // fetchPolicy: (props) => {
      //   console.log("fetchPolicy", props);
      //   return typeof window === "undefined" ? "no-cache" : "cache-only";
      // },
    },
  })((props) => {

    const {
      data: {
        __schema,
      },
      children,
      onSchemaLoad,
    } = props;

    if (__schema && !schema) {
      schema = __schema;

      onSchemaLoad && onSchemaLoad();
    }

    return <Context.Consumer>
      {context => <Context.Provider
        value={{
          ...context,
          schema,
        }}
      >
        {children}
      </Context.Provider>}
    </Context.Consumer>;
  });


class SchemaLoader extends Component {


  // static contextType = Context;


  render() {

    const {
      children,
    } = this.props;


    return <Context.Consumer>
      {context => <Context.Provider
        value={{
          ...context,
          schema,
        }}
      >

        {/* 
          Если схема не была подгружена, то вызываем загрузчик.
          После того, как он схему подгрузит, он нам уже не нужен.
          На сервере надо соблюсти вложенность, чтобы обязательно в контакст попала схема
         */}
        {!schema ? <SchemaLoaderQuery
          onSchemaLoad={() => this.forceUpdate()}
        >
          1111111
        </SchemaLoaderQuery> : null}

        {children}

      </Context.Provider>}
    </Context.Consumer>;

  }

}


export default class App extends React.Component {


  static propTypes = {
    Renderer: PropTypes.func.isRequired,
    themeOptions: PropTypes.object.isRequired,
    queryFragments: PropTypes.object.isRequired,
    lang: PropTypes.string,
    sheetsManager: PropTypes.object,
    assetsBaseUrl: PropTypes.string,
  }


  static defaultProps = {
    Renderer,
    themeOptions: {
      direction: 'ltr',
      // paletteType: 'dark',
      paletteType: 'light',
    },
    lang: null,
    sheetsManager,
  }


  static contextTypes = {
    client: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    loadApiData: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    theme: PropTypes.object,
    updateTheme: PropTypes.func,
    getQuery: PropTypes.func,
    getQueryFragment: PropTypes.func,
    lang: PropTypes.string,
    setLanguage: PropTypes.func,
    getLanguage: PropTypes.func,
  }


  constructor(props) {

    super(props);

    let {
      themeOptions,
    } = props;

    this.state = {
      ...this.state,
      themeOptions,
    }

    this.initLanguage();

    Object.assign(this.state, {
      theme: this.getTheme(),
    });

  }

  getChildContext() {

    const {
      theme,
    } = this.state;


    const lang = this.getLanguage();

    return {
      theme,
      updateTheme: themeOptions => this.updateTheme(themeOptions),
      getQuery: operation => this.getQuery(operation),
      getQueryFragment: fragmentName => this.getQueryFragment(fragmentName),
      setLanguage: this.setLanguage.bind(this),
      getLanguage: this.getLanguage.bind(this),
      lang,
    }
  }


  initLanguage() {

    let {
      lang,
    } = this.props;


    if (!lang) {

      const {
        navigator,
        localStorage,
      } = global;

      lang = (localStorage && localStorage.prismaCmsLang) || (navigator && navigator.language) || "en-En";

    }


    lang = lang && lang.substr(0, 2) || "en-En";


    Object.assign(this.state, {
      lang,
    });

  }

  setLanguage(lang) {

    const {
      localStorage,
    } = global;

    if (localStorage) {
      localStorage.setItem("prismaCmsLang", lang);
    }

    this.setState({
      lang,
    });

  }

  getLanguage() {

    const {
      lang,
    } = this.state;

    return lang;

  }


  getTheme() {

    const {
      themeOptions,
    } = this.state;

    return getTheme({
      ...themeOptions,
    });
  }


  updateTheme(options) {

    const {
      themeOptions,
    } = this.state;

    this.setState({
      themeOptions: {
        ...themeOptions,
        ...options,
      },
    }, () => {
      this.setState({
        theme: this.getTheme(),
      });
    });

  }


  getQuery(operation) {

  }


  getQueryFragment(fragmentName) {

    const {
      queryFragments: {
        [fragmentName]: fragment,
      },
    } = this.props;

    if (!fragment) {
      throw new Error(`Can not get query fragment "${fragmentName}"`);
    }

    return fragment;

  }


  componentWillMount() {

    if (typeof window !== "undefined") {

      // Удаляем стили, сгенерированные сервером, так как они могут не соответствовать реальным стилям
      let styles = document.querySelector("#server-side-jss");

      styles && styles.remove();

    }

    super.componentWillMount && super.componentWillMount();
  }



  render() {

    let {
      queryFragments,
      themeOptions,
      Renderer,
      sheetsManager,
      assetsBaseUrl,
      ...other
    } = this.props;

    const {
      theme,
    } = this.state;



    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};


    return (
      <SchemaLoader>
        <MuiThemeProvider
          theme={theme}
          sheetsManager={sheetsManager}
        >
          <Context.Consumer>
            {context => <Context.Provider
              value={Object.assign(context, this.context, {
                ...this.getChildContext(),
                queryFragments,
                query: {},
                assetsBaseUrl,
              })}
            >
              <UriProvider>
                <Renderer
                  // key={currentUserId}
                  {...other}
                />
              </UriProvider>
            </Context.Provider>
            }
          </Context.Consumer>
        </MuiThemeProvider>
      </SchemaLoader>
    )
  }
}
