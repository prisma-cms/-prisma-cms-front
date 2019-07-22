
import Avatar from "../ui/Avatar";

export * from "../ui/Avatar";

export default Avatar;

console.error("modules/Avatar deprecated. Use ui/Avatar instead");


// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// import Avatar from 'material-ui/Avatar';

// import { withStyles } from 'material-ui/styles';

// const styles = {
//   row: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   avatar: {
//     margin: 10,
//     textDecoration: "none",
//     // maxWidth: "100%",
//     // height: "auto",
//   },
//   smallAvatar: {
//     width: 40,
//     height: 40,
//   },
//   mediumAvatar: {
//     width: 60,
//     height: 60,
//   },
//   bigAvatar: {
//     width: 120,
//     height: 120,
//   },
//   editable: {
//     cursor: 'pointer',
//   },
// };


// export class UserAvatar extends Component {

//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     user: PropTypes.object.isRequired,
//     size: PropTypes.string.isRequired,
//     editable: PropTypes.bool.isRequired,
//   }


//   static defaultProps = {
//     size: "normal",
//     // size: "big",
//     editable: false,
//   };


//   render() {

//     const {
//       user,
//       classes,
//       size,
//       editable,
//       className,
//       ...other
//     } = this.props;


//     if(!user){
//       return null;
//     }


//     const {
//       image,
//       username,
//       fullname,
//     } = user;

//     const name = fullname || username;

//     let classNames = [classes.avatar];

//     if(className){
//       classNames.push(className);
//     }

//     let url;

//     if(image){

//       url = `/images/resized/thumb/${image}`;

//     }

//     switch(size){

//       case 'small': 

//         classNames.push(classes.smallAvatar);
//         break;

//       case 'medium': 

//         classNames.push(classes.mediumAvatar);
//         break;

//       case 'big': 

//         classNames.push(classes.bigAvatar);
//         break;

//     }

//     if(editable){
//       classNames.push(classes.editable);
//     }

//     return (
//       <Avatar
//         alt={name}
//         src={url || undefined}
//         className={classNames.join(" ")}
//         {...other}
//       >
//         {url ? "" : (name && name.substr(0, 1).toLocaleUpperCase() || "A")}
//       </Avatar>
//     )
//   }
// }

// export default withStyles(styles)(UserAvatar);
