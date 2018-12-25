

import UserLink from "../../Link/User";

export * from "../../Link/User";
export default UserLink;

console.error("ui/User/Link deprecated. User ui/Link/User instead.");

// import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'


// // import Avatar from '../../Avatar';

// import { Link } from 'react-router-dom';

// import { withStyles } from 'material-ui/styles';
// import Grid from 'material-ui/Grid';

// import Typography from 'material-ui/Typography';

// const styles = {
//   root: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     textDecoration: "none",
//   },
//   row: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     textDecoration: "none",
//   },
// };


// export class UserLink extends Component {

//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
//     withAvatar: PropTypes.bool.isRequired,
//     // fullname: PropTypes.bool.isRequired,
//   }


//   static defaultProps = {
//     withAvatar: true,
//     // fullname: true,
//   };

//   static contextTypes = {
//     Avatar: PropTypes.func.isRequired,
//   }


//   render() {

//     const {
//       user,
//       withAvatar,
//       classes,
//       secondary,
//       ...other
//     } = this.props;


//     if (!user) {
//       return null;
//     }

//     const {
//       Avatar,
//     } = this.context;

//     const {
//       id,
//       username,
//       fullname,
//       // lastname,
//     } = user;

//     const name = fullname || username;

//     // const url = `/users/${username}/`;
//     const url = `/users/${id}`;

//     return (
//       <Grid
//         container
//         className={classes.root}
//       >

//         <Grid
//           item
//         >
//           {withAvatar && <Link
//             key={id}
//             to={url}
//             href={url}
//             title={fullname || username}
//             {...other}
//           >

//             <Avatar
//               user={user}
//               size="small"
//             />

//           </Link> || null}

//         </Grid>

//         <Grid
//           item
//           xs
//         >

//           <Link
//             key={id}
//             to={url}
//             href={url}
//             {...other}
//           >

//             <Typography
//               component="span"
//             >
//               {name}
//             </Typography>

//           </Link>

//           {secondary}

//         </Grid>

//       </Grid>
//     )
//   }
// }


// export default withStyles(styles)(UserLink);