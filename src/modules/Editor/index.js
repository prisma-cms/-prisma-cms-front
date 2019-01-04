
import {
  Editor,
} from "../ui";

console.log("@prisma-cms/front/src/modules/Editor is deprecated. Use {Editor}$prisma-cms/context instead");

export default Editor;

// import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'

// import { Editor as DraftEditor } from '@fi1osof/react-draft-wysiwyg';
// import '@fi1osof/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

// import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';


// const {
//   createEmpty,
//   createWithContent,
// } = EditorState;


// const styles = {
//   // row: {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   // },
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     flexBasis: "100%",
//     // flexWrap: "wrap",
//     // border: "1px solid black",
//     margin: 0,
//   },
//   toolbar: {
//     // border: "1px solid red",
//     flexDirection: "row",
//     // '& > *': {
//     //   // flexDirection: "column",
//     //   boxSizing: "border-box",
//     // },
//     // flexBasis: "100%",
//   },
//   editor: {
//     height: "auto",
//     // border: "1px solid blue",
//     flexDirection: "row",
//     flexGrow: 1,
//     // flexBasis: "100%",
//   },
//   editable: {
//     height: 400,
//   },
//   // bigAvatar: {
//   //   width: 120,
//   //   height: 120,
//   // },
//   // editable: {
//   //   cursor: 'pointer',
//   // },
// };


// export const createEditorState = function (value) {

//   let editorState;
//   let contentState;

//   if (value) {

//     contentState = convertFromRaw(value);
//     editorState = createWithContent(contentState);

//   }

//   if (!editorState) {
//     editorState = createEmpty();
//   }

//   return editorState;

// }


// export class Editor extends Component {


//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     readOnly: PropTypes.bool.isRequired,
//     send: PropTypes.func,
//     value: PropTypes.object,
//     minLength: PropTypes.number,
//     maxLength: PropTypes.number,
//   }


//   constructor(props) {

//     super(props);

//     const {
//       value,
//     } = props;


//     // let editorState;
//     // let contentState;

//     // if(value){

//     //   contentState = convertFromRaw(value);
//     //   editorState = createWithContent(contentState);

//     // }

//     // if(!editorState){
//     //   editorState = createEmpty();
//     // }

//     this.state = {
//       // editorState,
//     };



//   }



//   // getTextLength(){

//   //   const {
//   //     // editorState,
//   //   } = this.state;
//   //   // } = this.props;

//   //   let plainText = editorState ? editorState.getCurrentContent().getPlainText() : "";

//   //   let textLength = plainText.length;

//   //   return textLength;

//   // }


//   // onEditorStateChange(editorState){


//   //   const {
//   //     maxLength,
//   //     onChange,
//   //   } = this.props;

//   //   // return false;




//   //   // let plainText = editorState ? editorState.getCurrentContent().getPlainText() : "";

//   //   // if(maxLength && maxLength <= plainText.length){
//   //   //   return false;
//   //   // }

//   //   this.setState({
//   //     editorState,
//   //   }, () => {

//   //     onChange && onChange(editorState, convertToRaw(editorState.getCurrentContent()) );

//   //   });
//   // }


//   send() {

//     const {
//       send,
//     } = this.props;

//     const {
//       editorState,
//     } = this.state;

//     const content = convertToRaw(editorState.getCurrentContent());
//     // const content = editorState.getCurrentContent();



//     return send(content, editorState);

//   }


//   render() {

//     const {
//       classes,
//       send,
//       readOnly,
//       // onChange,
//       // editorState,
//       ...other
//     } = this.props;


//     const {
//       // editorState,
//     } = this.state;


//     const wrapperClassName = [classes.wrapper];
//     const toolbarClassName = [classes.toolbar];
//     const editorClassName = [classes.editor];

//     let buttons = [];

//     if (!readOnly && send) {

//       buttons.push(<Button
//         key="send"
//         onClick={event => {
//           this.send();
//         }}
//       >
//         Send
//       </Button>);

//       wrapperClassName.push(classes.editable);

//     }

//     return (
//       <Fragment>

//         <DraftEditor
//           wrapperClassName={wrapperClassName.join(" ")}
//           toolbarClassName={toolbarClassName.join(" ")}
//           editorClassName={editorClassName.join(" ")}
//           // editorState={editorState}
//           // onEditorStateChange={newState => this.onEditorStateChange(newState)}
//           // toolbar={{
//           //   // list: { inDropdown: true },
//           // }}
//           // toolbarCustomButtons={[<span>ef</span>]}
//           // toolbarHidden={true}
//           toolbarStyle={{
//             display: "none",
//           }}
//           readOnly={readOnly}
//           {...other}
//         // wrapperStyle={{
//         //   height: 500
//         // }}
//         />

//         {buttons}

//       </Fragment>
//     )
//   }
// }

// export default withStyles(styles)(Editor);