import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { Link } from 'react-router-dom';

import {
  UserLink,
  styles,
} from '../';


const defaultProps = Object.assign({...UserLink.defaultPropts}, {
  className: "avatar circle",
});

export class OfferOwnerLink extends UserLink {

  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {

    const {
      user,
    } = this.props;

    const {
      id,
    } = user;

    const name = this.getName();

    const avatar = this.getAvatar();

    const url = this.getUrl();

    const country = this.getCountry();


    return (
      <Link 
        to={url}
        href={url}
        className="author noselect"
      >

        <Grid
          container
        >

          <Grid
            item
            >

            {avatar}
          </Grid>

          <Grid
            item
            xs
          >
            <div 
              className="details v-parent"
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <div className="v-child">
                <span className="name">
                  {name}    
                </span>
                <span className="location">
                  {country}
                </span>
              </div>
            </div>

          </Grid>

        </Grid>


      </Link>
    )
  }
}

export default withStyles(styles)(props => <OfferOwnerLink 
  {...props}
/>);
