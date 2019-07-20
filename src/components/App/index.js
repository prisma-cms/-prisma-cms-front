// @flow

import React, { Component } from 'react'
import PropTypes from "prop-types";

import Renderer from './Renderer';

import {
  buildClientSchema,
  introspectionQuery,
} from "graphql";

import Context from "@prisma-cms/context";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import blue from 'material-ui/colors/blue';
// import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';
import { darken } from 'material-ui/styles/colorManipulator';

// import UriProvider from "../../modules/uri-provider";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createTypography from 'material-ui/styles/createTypography';
import createPalette from 'material-ui/styles/createPalette';

import URI from "urijs";

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
      // fetchPolicy: typeof window === "undefined" ? "no-cache" : "cache-first",
      fetchPolicy: "no-cache",
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

      // console.log("__schema loaded");

      schema = __schema;

      onSchemaLoad && onSchemaLoad(__schema);
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

  componentWillMount() {

    const {
      __PRISMA_CMS_API_SCHEMA__,
    } = global;


    if (__PRISMA_CMS_API_SCHEMA__) {
      schema = __PRISMA_CMS_API_SCHEMA__;
    }

    super.componentWillMount && super.componentWillMount();

  }


  render() {

    const {
      children,
      onSchemaLoad,
    } = this.props;


    /* 
    Если схема не была подгружена, то вызываем загрузчик.
    После того, как он схему подгрузит, он нам уже не нужен.
    На сервере надо соблюсти вложенность, чтобы обязательно в контакст попала схема
    */

    // if (false || typeof window === "undefined") {

    //   return <SchemaLoaderQuery
    //     onSchemaLoad={(schema) => {
    //       onSchemaLoad && onSchemaLoad(schema);
    //       this.forceUpdate();
    //     }}
    //   >
    //     {children}
    //   </SchemaLoaderQuery>;
    // }
    // else {
    return <Context.Consumer>
      {context => <Context.Provider
        value={!schema || (context && context.schema === schema) ? context : {
          ...context,
          schema,
        }}
      >
        {!schema ? <SchemaLoaderQuery
          onSchemaLoad={(schema) => {
            onSchemaLoad && onSchemaLoad(schema);
            this.forceUpdate();
          }}
        >
        </SchemaLoaderQuery> : null}

        {children}

      </Context.Provider>}
    </Context.Consumer>;
    // }

  }

}


export default class App extends React.Component {


  static propTypes = {
    Renderer: PropTypes.func.isRequired,
    themeOptions: PropTypes.object.isRequired,
    queryFragments: PropTypes.object,
    lang: PropTypes.string,
    sheetsManager: PropTypes.object,
    assetsBaseUrl: PropTypes.string,

    /**
     * Это надо для сохранения схемы в режиме SSR
     */
    onSchemaLoad: PropTypes.func,
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
      query,
    } = props;

    const {
      location,
    } = global;

    const uri = new URI(location);

    this.state = {
      ...this.state,
      themeOptions,
      query: query || {},
      uri,
    }

    this.initLanguage();

    Object.assign(this.state, {
      theme: this.getTheme(),
    });

    // console.log("Front App constructor", this.props);

    this.updateTheme = this.updateTheme.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.getQueryFragment = this.getQueryFragment.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.getLanguage = this.getLanguage.bind(this);


  }

  getChildContext() {

    const {
      theme,
    } = this.state;


    const lang = this.getLanguage();

    return {
      theme,
      updateTheme: this.updateTheme,
      getQuery: this.getQuery,
      getQueryFragment: this.getQueryFragment,
      setLanguage: this.setLanguage,
      getLanguage: this.getLanguage,
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



  componentDidMount() {

    this.initCounters();

    super.componentDidMount && super.componentDidMount();
  }


  initCounters() {

    const {
      router,
    } = this.context;

    const {
      history,
    } = router;


    if (typeof window !== "undefined") {


      history.listen(() => {

        const {
          location,
        } = global;

        if (location) {

          const newUri = new URI(location);

          const newHref = newUri.resource();

          if (newHref) {

            const {
              uri,
            } = this.state;

            const currentHref = uri.resource();


            if (currentHref && newHref && currentHref !== newHref) {

              // console.log("history location changed currentHref", uri, currentHref, newHref, currentHref === newHref);

              this.setState({
                uri: newUri,
              }, () => {

                try {
                  // Это надо чтобы при смене страницы отправлялась статистика в гугл
                  let {
                    // yaCounter000001: yaCounter,
                    Ya,
                    gtag,
                    dataLayer,
                  } = global;


                  const {
                    // Metrika,
                    _metrika,
                  } = Ya || {};

                  // const yaCounters = Metrika && Metrika.counters() || [];

                  const {
                    counter: yaCounter,
                  } = _metrika || {};

                  // Отправка данных в яндекс.метрику
                  yaCounter && yaCounter.clickmap && yaCounter.clickmap().hit(location.pathname);


                  // Отправка данных в гугл
                  const googleAnalyticsConfig = dataLayer && dataLayer.find(n => n && n[0] === "config" && n[1]);

                  const {
                    1: googleAnalyticsId,
                  } = googleAnalyticsConfig || {};

                  gtag && googleAnalyticsId && gtag('event', 'page_view', {
                    send_to: googleAnalyticsId,
                    page_path: location.pathname,
                    page_title: window.document.tittle,
                    page_location: location.toString(),
                  });

                }
                catch (error) {
                  console.error(error);
                }

              });

            }

          }

        }


      });

    }

    return;
  }




  render() {

    let {
      queryFragments,
      themeOptions,
      Renderer,
      sheetsManager,
      assetsBaseUrl,
      onSchemaLoad,
      ...other
    } = this.props;

    const {
      theme,
      query,
      uri,
    } = this.state;



    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};


    return (
      <SchemaLoader
        onSchemaLoad={onSchemaLoad}
      >
        <MuiThemeProvider
          theme={theme}
          sheetsManager={sheetsManager}
        >
          <Context.Consumer>
            {context => <Context.Provider
              value={Object.assign(context, this.context, {
                ...this.getChildContext(),
                queryFragments,
                query,
                assetsBaseUrl,
                uri,
              })}
            >
              {/* <UriProvider> */}
              <Renderer
                // key={currentUserId}
                {...other}
              />
              {/* </UriProvider> */}
            </Context.Provider>
            }
          </Context.Consumer>
        </MuiThemeProvider>
      </SchemaLoader>
    )
  }
}
