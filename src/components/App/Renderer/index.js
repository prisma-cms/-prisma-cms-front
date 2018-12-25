import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Switch,
} from 'react-router-dom'

import MainMenu from './MainMenu';

import Errors from './Errors';
import { Typography, withStyles } from 'material-ui';

import Auth from '../../../modules/Auth';

import MainPage from "../../../modules/pages/MainPage";

import UsersPage from '../../../modules/pages/UsersPage';
import UserPage from '../../../modules/pages/UsersPage/UserPage';

import PageNotFound from '../../../modules/pages/404';
import RoutedPage from "../../../modules/pages/RoutedPage";

import GraphqlVoyagerPage from "../../../modules/pages/GraphqlVoyager";

import AdminRenderer from "./Admin";


import Avatar from "../../../modules/ui/Avatar";
import UserLink from "../../../modules/ui/Link/User";
// import UserLink from "../../../modules/User/Link";

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
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    PageNotFound,
    AdminRenderer,
    classes: {},
  };

  static contextTypes = {
    getQueryFragment: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    uri: PropTypes.object.isRequired,
    user: PropTypes.object,
  };
  
  static childContextTypes = {
    openLoginForm: PropTypes.func,
    Avatar: PropTypes.func,
    UserLink: PropTypes.func,
  }


  constructor(props) {

    super(props);

    this.state = {
      authOpen: false,
    };

  }



  getChildContext() {

    return {
      openLoginForm: this.openLoginForm,
      Avatar,
      UserLink,
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


  openLoginForm = (event) => {
    this.setState({
      authOpen: true,
    });
  }



  onAuthSuccess = data => {

    const {
      onAuthSuccess,
    } = this.context;

    onAuthSuccess(data);

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

    return <MainMenu />
  }


  getRoutes() {

    const {
      getQueryFragment,
    } = this.context;

    return [{
      exact: true,
      path: "/",
      component: MainPage,
    },
    {
      exact: true,
      path: "/users",
      component: UsersPage,
    },
    {
      exact: true,
      path: "/users/:userId",
      render: (props) => {
        const {
          params,
        } = props.match;

        const {
          userId,
        } = params || {};

        return <UserPage
          key={userId}
          getQueryFragment={getQueryFragment}
          where={{
            id: userId,
          }}
          {...props}
        />
      }
    },
    {
      exact: true,
      path: "/graphql-voyager",
      component: GraphqlVoyagerPage,
    },
    {
      path: "*",
      render: props => this.renderOtherPages(props),
    },];

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


    return <Fragment>

      {this.renderWrapper()}

      {this.renderErrors()}

      {this.renderAuth()}

    </Fragment>

  }
}

export default Renderer;

// export default withStyles(styles)(Renderer);