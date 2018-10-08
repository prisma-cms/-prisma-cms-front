// @flow

import React from 'react'
import PropTypes from "prop-types";

import Renderer from './Renderer';


import { MuiThemeProvider, createMuiTheme, getMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
// import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';

import UriProvider from "../../modules/uri-provider";


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
  }


  static defaultProps = {
    Renderer,
    themeOptions: {
      direction: 'ltr',
      paletteType: 'light',
    },
  }


  static childContextTypes = {
    muiTheme: PropTypes.object,
    updateTheme: PropTypes.func,
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

    Object.assign(this.state, {
      theme: this.getTheme(),
    });


  }

  getChildContext() {

    const {
      theme,
    } = this.state;

    return {
      muiTheme: theme,
      updateTheme: themeOptions => this.updateTheme(themeOptions),
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
      Renderer,
    } = this.props;

    const {
      theme,
    } = this.state;

    return (
      <MuiThemeProvider
        theme={theme}
        sheetsManager={typeof window === "undefined" ? new Map() : undefined}
      >

        <UriProvider>
          <Renderer
          />
        </UriProvider>
      </MuiThemeProvider>
    )
  }
}
