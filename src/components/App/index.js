// @flow

import React from 'react'
import PropTypes from "prop-types";

import Renderer from './Renderer';


import Context from "@prisma-cms/context";

import { MuiThemeProvider, createMuiTheme, getMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';

import UriProvider from "../../modules/uri-provider";

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
    typography,
    ...other
  } = uiTheme;

  const theme = createMuiTheme({
    direction,
    nprogress: {
      color: paletteType === 'light' ? '#000' : '#fff',
    },
    palette: {
      primary: {
        ...blue,
        // main: "#ff0000",
      },
      secondary: {
        // Darken so we reach the AA contrast ratio level.
        main: darken(pink.A400, 0.08),
      },
      type: paletteType,
    },
    typography: {
      fontFamily: "Tahoma, Helvetica, sans-serif",
      fontSize: 14,
      ...typography,
    },
    ...other,
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    global.theme = theme;
  }

  return theme;
}



export default class App extends React.Component {


  static propTypes = {
    Renderer: PropTypes.func.isRequired,
    themeOptions: PropTypes.object.isRequired,
    queryFragments: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    sheetsManager: PropTypes.object,
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
  }


  constructor(props) {

    super(props);

    let {
      themeOptions,
      lang,
    } = props;

    this.state = {
      ...this.state,
      themeOptions,
    }

    if (!lang) {

      const {
        navigator,
      } = global;

      lang = navigator && navigator.language || "";

    }

    lang = lang && lang.substr(0, 2) || "";

    Object.assign(this.state, {
      theme: this.getTheme(),
      lang,
    });

  }

  getChildContext() {

    const {
      theme,
      lang,
    } = this.state;

    return {
      theme,
      updateTheme: themeOptions => this.updateTheme(themeOptions),
      getQuery: operation => this.getQuery(operation),
      getQueryFragment: fragmentName => this.getQueryFragment(fragmentName),
      lang,
    }
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
      <MuiThemeProvider
        theme={theme}
        sheetsManager={sheetsManager}
      >
        <Context.Provider
          value={Object.assign(this.context, {
            ...this.getChildContext(),
            queryFragments,
            query: {},
          })}
        >
          <UriProvider>
            <Renderer
              key={currentUserId}
              {...other}
            />
          </UriProvider>
        </Context.Provider>
      </MuiThemeProvider>
    )
  }
}
