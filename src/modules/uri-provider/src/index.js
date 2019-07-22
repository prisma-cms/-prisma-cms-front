// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

// import URI from "urijs";

// import Context from "@prisma-cms/context";

// export default class UriProvider extends PureComponent {

//   static contextType = Context;

//   static childContextTypes = {
//     uri: PropTypes.object,
//   };


//   getChildContext() {

//     const {
//       location,
//     } = global;

//     let uri;

    
//     if (location) {
//       uri = new URI(location);
//     }
//     else {
//       const {
//         router: {
//           history,
//         },
//       } = this.context;

//       const {
//         location,
//       } = history;

//       uri = new URI(history.createHref(location));
//     }


//     return {
//       uri,
//     }

//   }


//   render() {

//     const {
//       children,
//     } = this.props;

//     return <Context.Consumer>
//       {context => <Context.Provider
//         value={Object.assign(context, {
//           ...this.getChildContext(),
//         })}
//       >
//         {children || null}
//       </Context.Provider>}
//     </Context.Consumer>

//     // return null;

//     // const {
//     //   children: {
//     //     type: Type,
//     //     props,
//     //   },
//     // } = this.props;

//     // return <Type
//     //   {...props}
//     // />

//   }
// }

