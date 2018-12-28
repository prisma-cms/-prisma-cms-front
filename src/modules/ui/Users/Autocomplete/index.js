import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Autocomplete, { styles as stylesProto } from 'autocomplete';
// import Avatar from 'Avatar';

import { ListItem } from 'material-ui/List';

import gql from 'graphql-tag';
// import { withState } from 'recompose';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';

import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';

const styles = {
  ...stylesProto,
  menuListItemText: {
    ...stylesProto.menuListItemText,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "normal",
    fontSize: "1rem",
  },
}


const usersQuery = gql`
  query users(
    $where: UserWhereInput!
    $orderBy: UserOrderByInput
  ){
    users(
      where: $where
      orderBy: $orderBy
    ){
      id
      username
      firstname
      lastname
      fullname
      photo
    }
  }
`;

export class UsersAutocomplete extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,

    // Кого исключить из результатов поиска
    exclude: PropTypes.array,

    // Выполнение при подтверждении
    onSubmit: PropTypes.func,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
    Avatar: PropTypes.func.isRequired,
  }

  state = {
    value: "",
    user: undefined,
    opened: false,
  }

  onChange(event) {

    const {
      value,
    } = event.target;

    this.setState({
      value,
    }, () => this.loadData());


  }


  async loadData() {

    const {
      value,
    } = this.state;

    const {
      client,
    } = this.context;

    const {
      exclude,
    } = this.props;

    let users = [];

    let $query = value;

    let where = {
      OR: [{
        username_contains: $query
      }, {
        firstname_contains: $query
      }, {
        lastname_contains: $query
      }, {
        email_contains: $query
      }]
    };

    if (exclude && exclude.length) {
      where.id_not_in = exclude;
    }

    if (value) {

      users = await client.query({
        query: usersQuery,
        variables: {
          where,
        },
      })
        .then(r => {


          const {
            users,
          } = r.data;

          return users;

        })
        .catch(console.error);

    }


    this.setState({
      users,
    });

  }


  onSelect = (value, item) => {

    this.setState({
      user: item,
    });
  }


  async submit() {

    const {
      user,
    } = this.state;

    const {
      onSubmit,
    } = this.props;

    await onSubmit(user)
      .catch(console.error);

    this.resetData();
  }


  resetData() {
    this.setState({
      user: null,
      value: "",
      users: [],
    });
  }


  renderUser(item) {

    const {
      fullname,
      username,
    } = item;

    const text = fullname || username;

    const {
      Avatar,
    } = this.context;

    return <Fragment>
      <Avatar
        user={item}
        size="small"
        style={{
          marginRight: 5,
        }}
      /> {text}
    </Fragment>
  }

  render() {

    const {
      classes,
      ...other
    } = this.props;

    const {
      value,
      users,
      user,
      opened,
    } = this.state;

    let items = [];

    if (users) {
      users.map(user => {

        const {
          id: value,
          fullname,
          username,
        } = user;

        items.push({
          ...user,
          value,
          label: fullname || username,
        });
        // items.push(user);
      })
    }

    return (
      <Autocomplete
        {...other}
        onChange={event => this.onChange(event)}
        value={value || ""}
        items={items}
        onSelect={this.onSelect}
        onMenuVisibilityChange={opened => this.setState({
          opened,
        })}
        renderInput={!opened && user
          ?
          props => {



            return <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              {this.renderUser(user)} <IconButton
                style={{
                  width: 34,
                  height: 34,
                }}
                onClick={event => this.submit()}
              >
                <DoneIcon
                  style={{
                    color: "green",
                  }}
                />
              </IconButton>
              <IconButton
                style={{
                  width: 34,
                  height: 34,
                }}
                onClick={event => this.resetData()}
              >
                <ClearIcon
                  style={{
                    color: "red",
                  }}
                />
              </IconButton>
            </div>
          }
          :
          undefined
        }
        renderItem={(item, isHighlighted, style) => {




          // const text = getItemText(item);

          const {
            label,
          } = item;

          const text = label;

          return <ListItem
            key={item.value}
            className={[classes.menuListItem, (isHighlighted || item.label === value || item.value === value) ? "actived" : ""].join(" ")}
          >
            <div
              className={classes.menuListItemText}
            >
              {this.renderUser(item)}
            </div>
          </ListItem>
        }}
      />
    )
  }
}

export default withStyles(styles)(UsersAutocomplete);