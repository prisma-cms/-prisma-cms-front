
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HighlightIcon from 'material-ui-icons/Highlight';
import UsersIcon from 'material-ui-icons/People';
import OrdersIcon from 'material-ui-icons/ShoppingBasket';
import ShopIcon from 'material-ui-icons/Shop';

import Divider from 'material-ui/Divider';
import List from 'material-ui/List';


class AdminMenu extends Component {

  static propTypes = {

  };

  static contextTypes = {
    updateTheme: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  goTo(path) {

    const {
      router: {
        history,
      },
    } = this.context;

    history.push(path);

  }

  render() {
    return (
      <div>

        <Divider />
        <List>
          <ListItem
            button
            onClick={event => this.goTo("/orders")}
          >
            <ListItemIcon>
              <OrdersIcon />
            </ListItemIcon>
            <ListItemText primary="Заказы" />
          </ListItem>

          <ListItem
            button
            onClick={event => this.goTo("/products")}
          >
            <ListItemIcon>
              <ShopIcon />
            </ListItemIcon>
            <ListItemText primary="Товары" />
          </ListItem>

          {/* <ListItem button>
            <ListItemIcon>
              <CategoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Категории" />
          </ListItem> */}

          {/* <ListItem button>
            <ListItemIcon>
              <ResourcesIcon />
            </ListItemIcon>
            <ListItemText primary="Ресурсы" />
          </ListItem> */}

          <ListItem
            button
            onClick={event => this.goTo("/users")}
          >
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>

        </List>
        <Divider />

        {/* <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>

        </List>
        <Divider /> */}

        <List>

          {/* <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
          </ListItem> */}
          <ListItem button
            onClick={event => {

              const {
                updateTheme,
                theme: {
                  palette: {
                    type: paletteType,
                  },
                },
              } = this.context;

              updateTheme({
                paletteType: paletteType === 'dark' ? "light" : "dark",
              });

            }}
          >
            <ListItemIcon>
              <HighlightIcon />
            </ListItemIcon>
            <ListItemText primary="Highlight" />
          </ListItem>
        </List>



      </div >
    );
  }
}


export default AdminMenu;