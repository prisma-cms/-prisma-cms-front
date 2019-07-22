
import UserLink from "../../ui/Link/User";

export * from "../../ui/Link/User";
export default UserLink;

console.error("User/Link deprecated. User ui/Link/User instead.");


// import React, { Component } from 'react'
// import PropTypes from 'prop-types'


// // import Avatar from 'Avatar';

// import { Link } from 'react-router-dom';

// import { withStyles } from 'material-ui/styles';

// export const styles = {
//   row: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     textDecoration: "none",
//   },
//   // avatar: {
//   //   margin: 10,
//   // },
//   // smallAvatar: {
//   //   width: 30,
//   //   height: 30,
//   // },
//   // bigAvatar: {
//   //   width: 120,
//   //   height: 120,
//   // },
//   // editable: {
//   //   cursor: 'pointer',
//   // },
// };


// export class UserLink extends Component {

//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
//     withAvatar: PropTypes.bool.isRequired,
//     fullname: PropTypes.bool.isRequired,
//     nameClassName: PropTypes.string,
//   }


//   static defaultProps = {
//     withAvatar: true,
//     fullname: true,
//   };

//   static contextTypes = {
//     Avatar: PropTypes.func.isRequired,
//   }

//   getAvatar() {

//     const {
//       user,
//       withAvatar,
//       avatarProps,
//     } = this.props;

//     const {
//       Avatar,
//     } = this.context;


//     return withAvatar
//       ?
//       <Avatar
//         user={user}
//         size="small"
//         {...avatarProps}
//       /> : null;
//   }


//   getName() {

//     const {
//       user,
//       fullname,
//     } = this.props;

//     const {
//       id,
//       username,
//       firstname,
//       middlename,
//       lastname,
//       photo,
//     } = user;

//     let name = [firstname];

//     if (fullname) {
//       name.push(middlename);
//     }

//     name.push(lastname);

//     name = name.filter(n => n).join(" ") || username;


//     return name;

//   }

//   getUrl() {

//     const {
//       user: {
//         username,
//       },
//     } = this.props;


//     const url = `/profile/${username}`;

//     return url;
//   }

//   getCountry() {

//     const {
//       user: {
//         Country,
//       },
//     } = this.props;

//     if (!Country) {
//       return null;
//     }

//     const {
//       id,
//       name,
//     } = Country;

//     // const url = `/profile/${username}`;

//     return name;
//   }


//   render() {

//     const {
//       user,
//       withAvatar,
//       fullname,
//       classes,
//       nameClassName,
//       ...other
//     } = this.props;


//     if (!user) {
//       return null;
//     }

//     const {
//       id,
//       // username,
//       // firstname,
//       // middlename,
//       // lastname,
//       // photo,
//     } = user;

//     // const url = `/profile/${username}`;

//     // let name = [firstname];

//     // if (fullname) {
//     //   name.push(middlename);
//     // }

//     // name.push(lastname);

//     // name = name.filter(n => n).join(" ") || username;


//     const name = this.getName();

//     const avatar = this.getAvatar();

//     const url = this.getUrl();

//     return (
//       <Link
//         key={id}
//         to={url}
//         href={url}
//         // style={{
//         //   display: "inline-flex",
//         //   alignItems: "baseline",
//         // }}
//         className={classes.row}
//         {...other}
//       >

//         {avatar} <span
//           className={nameClassName}
//         >
//           {name}
//         </span>

//       </Link>
//     )
//   }
// }


// export default withStyles(styles)(UserLink);