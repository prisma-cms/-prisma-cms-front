import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Typography } from 'material-ui';


import PrismaCmsComponent from "@prisma-cms/component";
import { Button } from 'material-ui';


class AuthUsers extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    data: PropTypes.object,
    setFilters: PropTypes.func.isRequired,
    getFilters: PropTypes.func.isRequired,
    cleanFilters: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
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
      .catch(console.error);

  }

  render() {

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



    let users = [];
    let count = 0;

    /**
     * Если найдено более одного пользователя, требуем уточнения, 
     * какой именно пользователь нужен
     */

    let searchForm = this.renderSearchForm();

    let usersList;

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

      if (users.length) {

        if (count === 1) {

          const user = users[0];

          const {
            username,
            fullname,
            id: userId,
          } = user;

          usersList = <div
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

            {/* <Typography
              variant="subheading"
            >
              {fullname || username || userId}
            </Typography> */}

            <form
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
            >
              {this.renderField(<TextField
                fullWidth
                name="password"
                value={password || ""}
                label="Пароль"
                onChange={event => {

                  const {
                    value,
                  } = event.target;

                  onPasswordChange(value);

                }}
              />)}

              <Grid
                container
                spacing={8}
              >

                <Grid
                  item
                >
                  <Button
                  // color="primary"
                  >
                    Новый пароль
                  </Button>
                </Grid>

                <Grid
                  item
                >
                  <Button
                    // color="primary"
                    onClick={cleanFilters}
                  >
                    Отмена
                  </Button>
                </Grid>

                <Grid
                  item
                  xs
                >
                </Grid>

                <Grid
                  item
                >
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Войти
                  </Button>
                </Grid>

              </Grid>
            </form>

          </div>

        }

        else {

          usersList = <Grid
            container
            spacing={8}
          >
            {users.map(n => {

              const {
                id: userId,
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


    return super.render(
      <div>

        {usersList}
        
        {searchForm}

      </div>
    );
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

export default AuthUsersConnector;