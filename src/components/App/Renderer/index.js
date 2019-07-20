import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Switch,
} from 'react-router-dom'

import Context from "@prisma-cms/context";

// import MainMenu from './MainMenu';

import Errors from './Errors';

import Auth from '../../Auth';

// import MainPage from "../../pages/MainPage";

// import UsersPage from '../../pages/UsersPage';
// import UserPage from '../../pages/UsersPage/UserPage';

import PageNotFound from '../../pages/404';
// import RoutedPage from "../../pages/RoutedPage";

// import GraphqlVoyagerPage from "../../pages/GraphqlVoyager";

// import AdminRenderer from "./Admin";

import ContextProvider from "./ContextProvider";
import SubscriptionProvider from "./SubscriptionProvider";
// import AdminPage from '../../pages/admin';
// import Root from '../../pages/Root';

// import {
//   ContextProvider as FrontEditorContextProvider,
//   SubscriptionProvider as FrontEditorSubscriptionProvider,
//   // FrontEditorRoot,
// } from "@prisma-cms/front-editor"
// import RootPage from '../../pages/Root';


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
    Auth: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    useMetamask: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    PageNotFound,
    Auth,
    classes: {},
    routes: [],
    useMetamask: true,
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

    this.openLoginForm = this.openLoginForm.bind(this);
    this.loginComplete = this.loginComplete.bind(this);
    this.loginCanceled = this.loginCanceled.bind(this);

  }


  getChildContext() {

    return {
      openLoginForm: this.openLoginForm,
    }
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
      useMetamask,
    } = this.props;

    const {
      authOpen,
    } = this.state;


    return <Auth
      open={authOpen}
      useMetamask={useMetamask}
      loginComplete={this.loginComplete}
      loginCanceled={this.loginCanceled}
    />
  }


  loginComplete(data) {
    this.setState({
      authOpen: false,
    });
    this.onAuthSuccess(data);
  };


  loginCanceled() {
    this.setState({
      authOpen: false,
    });
  };


  renderMenu() {

    // return <MainMenu />
    return null;
  }


  getRoutes() {

    const {
      routes,
    } = this.props;

    return routes || [];

    // return [
    //   // {
    //   //   exact: true,
    //   //   path: "/graphql-voyager",
    //   //   component: GraphqlVoyagerPage,
    //   // },
    // ];

  }


  // getRoutesOld() {

  //   const {
  //     getQueryFragment,
  //   } = this.context;

  //   return [
  //     // {
  //     //   exact: false,
  //     //   path: "/",
  //     //   component: Root,
  //     // },
  //     // {
  //     //   exact: true,
  //     //   path: "/",
  //     //   component: MainPage,
  //     // },
  //     {
  //       exact: true,
  //       path: "/users",
  //       component: UsersPage,
  //     },
  //     {
  //       exact: true,
  //       path: "/users/:userId",
  //       render: (props) => {
  //         const {
  //           params,
  //         } = props.match;

  //         const {
  //           userId,
  //         } = params || {};

  //         return <UserPage
  //           key={userId}
  //           getQueryFragment={getQueryFragment}
  //           where={{
  //             id: userId,
  //           }}
  //           {...props}
  //         />
  //       }
  //     },
  //     {
  //       exact: true,
  //       path: "/graphql-voyager",
  //       component: GraphqlVoyagerPage,
  //     },
  //     // {
  //     //   path: "*",
  //     //   render: props => this.renderOtherPages(props),
  //     // },
  //   ];

  // }

  // renderOtherPages(props) {

  //   const {
  //     uri,
  //   } = this.context;

  //   return <RoutedPage
  //     {...this.props}
  //     {...props}
  //     where={{
  //       path: uri.path(),
  //     }}
  //   />
  // }


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

    // const {
    //   uri,
    //   history,
    // } = this.context;

    // console.log("uri", uri);

    // console.log("uri.toString()", uri.toString());

    // console.log("uri.domain()", uri.domain());

    return this.renderRoutes();

  }


  /**
   * Deprecated
   */
  renderWrapperOld__() {

    const {
      classes,
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

    return wrapper || null;
  }


  renderAdmin(wrapper) {

    return wrapper;
  }


  forceUpdateBind = () => this.forceUpdate();


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
          rendererForceUpdate: this.forceUpdateBind,
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