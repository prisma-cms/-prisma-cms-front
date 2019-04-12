import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Switch,
} from 'react-router-dom'

import Context from "@prisma-cms/context";

// import MainMenu from './MainMenu';

import Errors from './Errors';
// import { Typography, withStyles } from 'material-ui';

import Auth from '../../Auth';

// import MainPage from "../../pages/MainPage";

// import UsersPage from '../../pages/UsersPage';
// import UserPage from '../../pages/UsersPage/UserPage';

import PageNotFound from '../../pages/404';
import RoutedPage from "../../pages/RoutedPage";

// import GraphqlVoyagerPage from "../../pages/GraphqlVoyager";

import AdminRenderer from "./Admin";

import ContextProvider from "./ContextProvider";
import SubscriptionProvider from "./SubscriptionProvider";
// import AdminPage from '../../pages/admin';
// import Root from '../../pages/Root';


export const styles = {
  root: {
    // width: "100%",
    flexBasis: "100%",
    height: "100%",
    // maxWidth: 1260,
    // padding: "0 20px",
    // margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    width: "100%",
    maxWidth: 1260,
    padding: "0 20px",
    margin: "0 auto",
  },
  body: {},
}


export class Renderer extends Component {

  static propTypes = {
    PageNotFound: PropTypes.func.isRequired,
    AdminRenderer: PropTypes.func.isRequired,
    Auth: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    PageNotFound,
    AdminRenderer,
    Auth,
    classes: {},
  };

  static contextType = Context;

  static childContextTypes = {
    openLoginForm: PropTypes.func,
  }


  constructor(props) {

    super(props);

    this.state = {
      authOpen: false,
    };

  }



  getChildContext() {

    return {
      openLoginForm: event => this.openLoginForm(event),
    }
  }


  componentDidMount() {

    this.initCounters();

    super.componentDidMount && super.componentDidMount();
  }


  initCounters() {

    const {
      router: {
        history,
      },
    } = this.context;


    if (typeof window !== "undefined") {


      history.listen(function (location) {

        // Это надо чтобы при смене страницы отправлялась статистика в гугл
        let {
          // yaCounter20622142: yaCounter,
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

      });

    }

    return;
  }


  openLoginForm(event) {
    this.setState({
      authOpen: true,
    });
  }



  onAuthSuccess(data) {

    const {
      onAuthSuccess,
    } = this.context;

    return onAuthSuccess(data);

  }


  renderErrors() {

    const {
      errors,
    } = this.context;

    return <Errors
      errors={errors}
    />

  }

  renderAuth() {

    const {
      Auth,
    } = this.props;

    const {
      authOpen,
    } = this.state;


    return <Auth
      open={authOpen}
      loginComplete={data => {
        this.setState({
          authOpen: false,
        });
        this.onAuthSuccess(data);
      }}
      loginCanceled={data => {
        this.setState({
          authOpen: false,
        });
      }}
    />
  }


  renderMenu() {

    // return <MainMenu />
    return null;
  }


  getRoutes() {

    const {
      getQueryFragment,
    } = this.context;

    return [
      // {
      //   exact: false,
      //   path: "/",
      //   component: Root,
      // },
      // {
      //   exact: true,
      //   path: "/",
      //   component: MainPage,
      // },
      // {
      //   exact: true,
      //   path: "/users",
      //   component: UsersPage,
      // },
      // {
      //   exact: true,
      //   path: "/users/:userId",
      //   render: (props) => {
      //     const {
      //       params,
      //     } = props.match;

      //     const {
      //       userId,
      //     } = params || {};

      //     return <UserPage
      //       key={userId}
      //       getQueryFragment={getQueryFragment}
      //       where={{
      //         id: userId,
      //       }}
      //       {...props}
      //     />
      //   }
      // },
      // {
      //   exact: true,
      //   path: "/graphql-voyager",
      //   component: GraphqlVoyagerPage,
      // },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ];

  }

  renderOtherPages(props) {

    const {
      uri,
    } = this.context;

    return <RoutedPage
      {...this.props}
      {...props}
      where={{
        path: uri.path(),
      }}
    />
  }


  renderRoutes() {

    return <Switch>

      {this.getRoutes().map(n => {
        const {
          path,
        } = n;

        return <Route
          key={path}
          {...n}
        />
      })}

    </Switch>;
  }


  renderWrapper() {

    return this.renderRoutes();

  }


  /**
   * Deprecated
   */
  renderWrapperOld() {

    const {
      classes,
      AdminRenderer,
      ...other
    } = this.props;

    let wrapper = <Fragment
    >

      <div
        id="Renderer--header"
        className={classes.wrapper}
      >

        {this.renderMenu()}

      </div>


      <div
        // item
        // xs={12}
        id="Renderer--body"
        className={classes.body}
      >

        {this.renderRoutes()}

      </div>

    </Fragment>;

    const {
      user: currentUser,
    } = this.context;

    const {
      sudo,
    } = currentUser || {};

    return sudo ? this.renderAdmin(wrapper) : wrapper || null;
  }


  renderAdmin(wrapper) {

    const {
      classes,
      AdminRenderer,
      ...other
    } = this.props;

    return <AdminRenderer
      {...other}
    >

      {wrapper}

    </AdminRenderer>

  }


  render() {



    // return <Context.Consumer>
    //   {context => {



    //     return <Context.Provider
    //       // value={Object.assign(context, this.context, {
    //       //   ...this.getChildContext(),
    //       //   Avatar,
    //       //   UserLink,
    //       // })}
    //       value={context}
    //     >
    //       "wefwef"
    //     </Context.Provider>
    //   }}
    // </Context.Consumer>

    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};

    return <Context.Consumer>
      {context => <Context.Provider
        value={Object.assign(context, this.context, {
          ...this.getChildContext(),
          rendererForceUpdate: () => this.forceUpdate(),
        })}
      >
        <ContextProvider>
          <SubscriptionProvider
          // key={currentUserId}
          >
            <Fragment>

              {this.renderWrapper()}

              {this.renderErrors()}

              {this.renderAuth()}

            </Fragment>
          </SubscriptionProvider>
        </ContextProvider>
      </Context.Provider>}
    </Context.Consumer>

  }
}

export default Renderer;

// export default withStyles(styles)(Renderer);