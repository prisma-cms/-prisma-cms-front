import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Typography } from 'material-ui';

import PrismaCmsComponent from "@prisma-cms/component";

import { Button } from 'material-ui';

import AuthForm from "../";


import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';


class AuthUsers extends AuthForm {

  static propTypes = {
    ...AuthForm.propTypes,
    data: PropTypes.object,
    setFilters: PropTypes.func.isRequired,
    getFilters: PropTypes.func.isRequired,
    getFilters: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    loginComplete: PropTypes.func.isRequired,
  }


  renderSearchForm() {

    const {
      getFilters,
    } = this.props;

    const name = "search"

    const {
      [name]: search,
    } = getFilters() || {}

    console.log("getFilters", getFilters());

    return this.renderField(<TextField
      label="Логин"
      helperText="Логин, емейл, телефон или ID пользователя"
      fullWidth
      name={name}
      value={search || ""}
      onChange={event => {

        const {
          value,
          name,
        } = event.target;

        this.setFilters({
          [name]: value ? value : undefined,
        });

      }}
    />)
  }


  setFilters(filters) {

    const {
      setFilters,
    } = this.props;

    return setFilters(filters);
  }


  async signin(options) {

    const {
      query: {
        signin,
      },
    } = this.context;

    // console.log("signin", signin);
    // console.log("context", this.context.query);

    // return;

    return await this.mutate({
      mutation: gql(signin),
      ...options
    })
      .then(r => {

        this.onAuth(r);

        return r;
      })
      .catch(console.error);

  }


  async resetPassword(options) {

    const {
      query: {
        resetPasswordProcessor,
      },
    } = this.context;


    const {
      resetPasswordInRequest,
    } = this.state;


    if (resetPasswordInRequest) {
      return;
    }


    this.setState({
      resetPasswordInRequest: true,
    });

    // console.log("signin", signin);
    // console.log("context", this.context.query);

    // return;

    const result = await this.mutate({
      mutation: gql(resetPasswordProcessor),
      ...options
    })
      .then(r => {

        this.onAuth(r);

        return r;
      })
      .catch(console.error);

    this.setState({
      resetPasswordInRequest: false,
    });

    return result;

  }


  onAuth(result) {

    const {
      response,
    } = result && result.data || {};

    const {
      success,
      message,
      errors: responseErrors,
      token,
      data: user,
    } = response || {};


    if (success && token && user) {

      const {
        loginComplete,
      } = this.props;

      loginComplete({
        token,
        user,
      });

    }

    this.closeForm();

    return result;

  }


  // getSubmit() {


  //   let onSubmit;

  //   const {
  //     password,
  //   } = this.state;


  //   const user = this.getUser();

  //   console.log("getSubmit user", user);

  //   if (user) {


  //     const {
  //       id: userId,
  //     } = user;

  //     onSubmit = () => {

  //       this.signin({
  //         variables: {
  //           where: {
  //             id: userId,
  //           },
  //           data: {
  //             password,
  //           },
  //         },
  //       });

  //     }
  //   }


  //   return onSubmit;
  // }


  // getUser() {

  //   let user;

  //   const {
  //     data,
  //   } = this.props;

  //   if (data) {

  //     const {
  //       objectsConnection,
  //       variables: {
  //         first,
  //       },
  //     } = data;

  //     const users = objectsConnection ? objectsConnection.edges.map(n => n.node) : [];
  //     const count = objectsConnection ? objectsConnection.aggregate.count : 0;

  //     if (count) {
  //       user = users[0];
  //     }

  //   }

  //   return user;
  // }


  closeForm() {
    const {
      cleanFilters,
      loginCanceled,
    } = this.props;

    cleanFilters()

    loginCanceled();

    this.setState({
      resetPasswordId: null,
      resetPasswordCode: null,
    });

  }


  renderForm() {

    const {
      Grid,
      UserLink,
      Pagination,
      Avatar,
      uri,
    } = this.context;

    const {
      data,
      password,
      onPasswordChange,
      cleanFilters,
    } = this.props;


    const {
      resetPasswordId,
      resetPasswordCode,
    } = this.state;


    let users = [];
    let count = 0;

    /**
     * Если найдено более одного пользователя, требуем уточнения, 
     * какой именно пользователь нужен
     */

    let searchForm;

    let usersList;

    // let user = this.getUser();

    let user;


    if (!resetPasswordId) {

      searchForm = this.renderSearchForm();

    }


    const {
      authPage,
    } = uri.query(true);

    if (data) {

      const {
        objectsConnection,
        variables: {
          first,
        },
      } = data;

      users = objectsConnection ? objectsConnection.edges.map(n => n.node) : [];
      count = objectsConnection ? objectsConnection.aggregate.count : 0;

      // console.log("users", users, count);

      if (users.length) {

        if (count === 1) {

          user = users[0];

        }

        else {

          usersList = <Grid
            container
            spacing={8}
          >
            <Grid
              item
              xs={12}
            >

              <Typography
                variant="caption"
              >
                Выберите пользователя из списка
              </Typography>

            </Grid>
            {users.map(n => {

              const {
                id: userId,
                username,
                email,
              } = n;

              return <Grid
                key={userId}
                item
                xs={12}
              >
                <UserLink
                  user={n}
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();

                    this.setFilters({
                      search: userId,
                    });
                  }}
                />
              </Grid>

            })}
            <Grid
              item
              xs={12}
            >
              <Pagination
                authPage={authPage}
                pageVariable="authPage"
                limit={first}
                total={count}
              />
            </Grid>
          </Grid>

        }

      }

    }


    let userAvatar;


    if (user) {

      const {
        username,
        fullname,
        id: userId,
      } = user;

      userAvatar = <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Avatar
          size="big"
          user={user}
        />

        <Typography
          variant="subheading"
        >
          {username || userId} {fullname ? `(${fullname})` : null}
        </Typography>

        {/* <form
          style={{
            width: "100%",
          }}
          onSubmit={event => {

            event.preventDefault();

            this.signin({
              variables: {
                where: {
                  id: userId,
                },
                data: {
                  password,
                },
              },
            });

          }}
        > */}

        <Grid
          container
          spacing={8}
        >

          <Grid
            item
            xs={12}
          >
          </Grid>

          {/* <Grid
              item
              xs={12}
            >
              {this.renderField(<TextField
                fullWidth
                name="password"
                value={password || ""}
                label="Пароль"
                helperText="Введите свой пароль"
                onChange={event => {

                  const {
                    value,
                  } = event.target;

                  onPasswordChange(value);

                }}
              />)}
            </Grid> */}

        </Grid>


      </div>

    }



    let onSubmit;


    let actions = [];


    actions.push(<Button
      key="cancel"
      // color="primary"
      onClick={event => {

        this.closeForm();

      }}
    >
      Отмена
    </Button>);


    // const user = this.getUser();

    // console.log("getSubmit user", user);



    let mainAction;

    if (user) {


      if (resetPasswordId) {

        mainAction = this.renderField(<TextField
          fullWidth
          name="code"
          value={resetPasswordCode || ""}
          label="Код"
          helperText="Введите код подтверждения"
          // type="password"
          onChange={event => {

            const {
              value,
            } = event.target;

            this.setState({
              resetPasswordCode: value,
            });

          }}
        />)


        onSubmit = () => {

          this.resetPassword({
            variables: {
              where: {
                id: userId,
              },
              data: {
                code: resetPasswordCode || "",
              },
            },
          });

        }



        actions.push(<Button
          key="submit"
          color="primary"
          type="submit"
        >
          Сбросить пароль
        </Button>);

      }
      else {

        mainAction = this.renderField(<TextField
          fullWidth
          name="password"
          value={password || ""}
          label="Пароль"
          helperText="Введите свой пароль"
          type="password"
          onChange={event => {

            const {
              value,
            } = event.target;

            onPasswordChange(value);

          }}
        />)


        onSubmit = () => {

          this.signin({
            variables: {
              where: {
                id: userId,
              },
              data: {
                password,
              },
            },
          });

        }



        actions.push(<Button
          // color="primary"
          key="newPassword"
          onClick={async event => {

            const {
              query: {
                createResetPasswordProcessor,
              },
            } = this.context;

            // console.log("createResetPasswordProcessor", createResetPasswordProcessor);

            this.mutate({
              mutation: gql(createResetPasswordProcessor),
              variables: {
                data: {
                  User: {
                    connect: {
                      id: userId,
                    },
                  },
                },
              },
            })
              .then(r => {

                console.log("createResetPasswordProcessor result", r);

                console.log("createResetPasswordProcessor resetPasswordId", resetPasswordId);

                const {
                  id: resetPasswordId,
                } = r.data.response && r.data.response.data || {};


                if (resetPasswordId) {
                  this.setState({
                    resetPasswordId,
                  });
                }

                return r;
              });

          }}
        >
          Новый пароль
        </Button>);


        actions.push(<Button
          key="submit"
          color="primary"
          type="submit"
        >
          Войти
        </Button>);

      }


      const {
        id: userId,
      } = user;


    }


    let title = "Авторизация";








    return (

      <form
        style={{
          width: "100%",
        }}
        onSubmit={event => {

          event.preventDefault();

          console.log("onSubmit", onSubmit);

          if (onSubmit) {
            onSubmit();
          }


        }}
      >

        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogContent
        // classes={{
        //   root: classes.DialogContentRoot,
        // }}
        >
          <Grid
            container
            spacing={8}
          >

            <Grid
              item
              xs={12}
            >
              {userAvatar}
            </Grid>

            <Grid
              item
              xs={12}
            >
              {usersList}
            </Grid>

            <Grid
              item
              xs={12}
            >
              {searchForm}
            </Grid>

            <Grid
              item
              xs={12}
            >
            </Grid>

            <Grid
              item
              xs={12}
            >
              {mainAction}
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions>
          {actions}
        </DialogActions>

      </form>




    );


    // return (
    //   <div>

    //     {usersList}

    //     {searchForm}

    //   </div>
    // );
  }

}


class AuthUsersConnector extends Component {

  static contextType = Context;


  static propTypes = {
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    View: AuthUsers,
  }


  componentWillMount() {

    const {
      query: {
        usersConnection,
      },
    } = this.context;

    // console.log("usersConnection", usersConnection);

    const {
      View,
    } = this.props;

    this.Renderer = compose(
      graphql(gql(usersConnection), {
        skip: (props) => !props.where ? true : false,
      }),
    )(View);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      Renderer,
    } = this;

    const {
      View,
      ...other
    } = this.props;

    return <Renderer
      {...other}
    />;
  }

}

export default class AuthUsersForm extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    first: PropTypes.number.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    first: 3,
  }

  getFilters() {


    const {
      uri,
    } = this.context;


    let {
      page,
      authFilters: filters,
    } = uri.query(true);

    if (filters) {

      try {
        filters = filters && JSON.parse(filters) || null;
      }
      catch (error) {
        console.error(console.error(error));
      }

    }

    return filters;
  }


  setFilters(filters) {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;

    // console.log("setFilters", filters);

    let newUri = uri.clone();

    const currentFilters = this.getFilters();

    filters = {
      ...currentFilters,
      ...filters,
    }


    try {
      filters = filters ? JSON.stringify(filters) : undefined;
    }
    catch (error) {
      console.error(error);
    }


    if (filters === "{}") {
      filters = undefined;
    }

    if (filters) {

      // if (newUri.hasQuery) {
      newUri = newUri.setQuery({
        authFilters: filters,
      });
      // }
      // else {
      //   newUri = newUri.addQuery({
      //     filters,
      //   });
      // }

    }
    else {

      newUri.removeQuery("authFilters");

    }

    newUri.removeQuery("authPage");


    const url = newUri.resource();

    // console.log("setFilters uri", newUri, url);

    history.push(url);

  }


  cleanFilters() {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;


    let newUri = uri.clone();


    newUri.removeQuery("authPage");
    newUri.removeQuery("authFilters");


    const url = newUri.resource();

    history.push(url);

  }


  prepareWhere() {

    const {
      search,
    } = this.getFilters() || {};

    let where;

    if (search) {

      where = {
        OR: [
          {
            id: search,
          },
          {
            username_contains: search,
          },
          {
            email_contains: search,
          },
          {
            fullname_contains: search,
          },
          {
            phone_contains: search,
          },
        ],
      };

    }

    return where;
  }

  render() {

    const {
      uri,
    } = this.context;

    const {
      first,
      ...other
    } = this.props;


    const {
      password,
    } = this.state;


    const {
      authPage,
    } = uri.query(true);

    let skip;

    if (authPage > 1 && first) {
      skip = (authPage - 1) * first;
    }


    return <AuthUsersConnector
      first={first}
      skip={skip}
      where={this.prepareWhere()}
      setFilters={filters => this.setFilters(filters)}
      getFilters={() => this.getFilters()}
      cleanFilters={() => this.cleanFilters()}
      password={password || ""}
      onPasswordChange={password => {
        this.setState({
          password,
        });
      }}
      {...other}
    />
  }
};
