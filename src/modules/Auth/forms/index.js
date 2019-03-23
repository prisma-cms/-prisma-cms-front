import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

import PrismaCmsComponent from "@prisma-cms/component";

class AuthForm extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    dialogProps: PropTypes.object,
    loginCanceled: PropTypes.func.isRequired,
  };


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    open: true,
    fullWidth: true,
    maxWidth: "xs",
  }


  renderForm() {

    return null;
  }

  renderActions() {

    return [];
  }

  // getSubmit() {

  // }

  onRequestClose = event => {

    const {
      loginCanceled,
    } = this.props;

    return loginCanceled();
  }


  render() {


    let {

      fullWidth,
      maxWidth,
      dialogProps,
      open,
      // classes,
      // step,
      ...other
    } = this.props;


    return super.render(
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={this.onRequestClose}
        // onEntering={this.handleEntering}
        {...dialogProps}
      >

        {this.renderForm()}

      </Dialog>
    )



    const onSubmit = this.getSubmit();

    console.log("getSubmit onSubmit", onSubmit);

    return super.render(
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={this.onRequestClose}
        onEntering={this.handleEntering}
        {...dialogProps}
      >
        <form
          style={{
            width: "100%",
          }}
          onSubmit={event => {

            event.preventDefault();

            console.log("onSubmit", onSubmit);

            if (onSubmit) {
              onSubmit();
            }


          }}
        >

          <DialogContent
          // classes={{
          //   root: classes.DialogContentRoot,
          // }}
          >

            {this.renderForm()}

          </DialogContent>

          <DialogActions>
            {this.renderActions()}
          </DialogActions>

        </form>

      </Dialog>
    )

  }
}


export default AuthForm;