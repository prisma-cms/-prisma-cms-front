import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

import Typography from "material-ui/Typography";

import { withStyles } from 'material-ui/styles';

export const styles = theme => {



  const {
    palette: {
      text: {
        primary,
        secondary,
      },
    },
  } = theme;

  return {
    root: {
    },
    text: {
      display: "inline-block",
      color: primary,

      "&:hover": {
        color: secondary,
      },
    },
  }

};

export class UiLink extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    textClassName: PropTypes.string,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: "inherit",
  }

  render() {

    const {
      className,
      textClassName,
      classes,
      children,
      color,
      ...other
    } = this.props;

    return (
      <Link
        className={[classes.root, className].join(" ")}
        {...other}
      >
        <Typography
          component="span"
          className={[classes.text, textClassName].join(" ")}
          color={color}
        >
          {children || ""}
        </Typography>
      </Link>
    )
  }
}


export default withStyles(styles)(props => <UiLink
  {...props}
/>);


// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import {Link} from 'react-router-dom';

// export default class UiLink extends PureComponent {

//   static propTypes = {
//     // prop: PropTypes
//   }


//   getUrl(){
//     return "javascript:;";
//   }


//   render() {

//     const {
//       ...other
//     } = this.props;

//     const url = this.getUrl();

//     return (
//       <Link
//         to={url}
//         href={url}
//         // activeClassName="fdgdgfd"
//         {...other}
//       />
//     )
//   }
// }
