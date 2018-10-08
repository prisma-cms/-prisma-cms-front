
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import HighlightIcon from 'material-ui-icons/Highlight';
import UsersIcon from 'material-ui-icons/People';
import OrdersIcon from 'material-ui-icons/ShoppingBasket';
import CategoriesIcon from 'material-ui-icons/Folder';
import ResourcesIcon from 'material-ui-icons/FontDownload';
import ShopIcon from 'material-ui-icons/Shop';

import { Divider, List } from 'material-ui';



class AdminMenu extends Component {

  static propTypes = {

  };

  static contextTypes = {
    updateTheme: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  goTo(path){

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
          <ListItem button>
            <ListItemIcon>
              <OrdersIcon />
            </ListItemIcon>
            <ListItemText primary="Заказы" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShopIcon />
            </ListItemIcon>
            <ListItemText primary="Товары" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CategoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Категории" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ResourcesIcon />
            </ListItemIcon>
            <ListItemText primary="Ресурсы" />
          </ListItem>
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
                muiTheme: {
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