// @flow

import React from 'react'
import PropTypes from "prop-types";

import Renderer from './Renderer';


import { MuiThemeProvider, createMuiTheme, getMuiTheme } from 'material-ui/styles';

import UriProvider from "../../modules/uri-provider";


const theme = createMuiTheme({
  palette: {
  },
  typography: {
    fontFamily: "Tahoma, Helvetica, sans-serif",
    fontSize: 14,
  },
});



export default class App extends React.Component {

  static propTypes = {
    Renderer: PropTypes.func.isRequired,
  }


  static defaultProps = {
    Renderer,
  }


  static childContextTypes = {
    muiTheme: PropTypes.object
  }


  getChildContext() {
    return {
      muiTheme: theme,
    }
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
