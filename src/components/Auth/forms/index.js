import React from 'react';
import PropTypes from 'prop-types';



import Dialog, {
  // DialogActions,
  // DialogContent,
} from 'material-ui/Dialog';

import PrismaCmsComponent from "@prisma-cms/component";



const defaultLocales = {
  ru: {
    values: {
      "Authorization": "Авторизация",
      "Login, email, phone or user ID": "Логин, емейл, телефон или ID пользователя",
      "Choose user from list": "Выберите пользователя из списка",
      "Type confirm code": "Введите код подтверждения",
      "Type password": "Введите свой пароль",
      "Login": "Логин",
      "Email": "Емейл",
      "Phone": "Телефон",
      "Fullname": "Полное имя",
      "Password": "Пароль",
      "Signin": "Авторизоваться",
      "Signup": "Регистрация",
      "Cancel": "Отмена",
      "Reset password": "Новый пароль",
      "Code": "Код",
    },
  },
};



class AuthForm extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    dialogProps: PropTypes.object,
    loginCanceled: PropTypes.func.isRequired,
    switchForm: PropTypes.func.isRequired,
  };


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    open: true,
    fullWidth: true,
    maxWidth: "xs",
    locales: defaultLocales
  }


  renderForm() {

    return null;
  }

  renderActions() {

    return [];
  }

  // getSubmit() {

  // }

  onRequestClose(event) {

    const {
      loginCanceled,
    } = this.props;

    return loginCanceled();
  }


  cleanForm() {

  }


  closeForm() {
    const {
      cleanFilters,
      loginCanceled,
    } = this.props;

    this.cleanForm()

    loginCanceled();

  }


  switchForm(form) {

    const {
      switchForm,
    } = this.props;

    // this.cleanForm();

    return switchForm(form);

  }



  onAuth(result) {

    const {
      response,
    } = result && result.data || {};

    const {
      success,
      message,
      errors: responseErrors,
      token,
      data: user,
    } = response || {};


    if (success && token && user) {

      const {
        loginComplete,
      } = this.props;

      loginComplete({
        token,
        user,
      });

    }

    this.closeForm();

    return result;

  }


  mutate(params) {

    this.setState({
      inRequest: true,
    });

    return super.mutate(params)
      .then(result => {

        this.setState({
          inRequest: false,
        });

        return result;

      })
      .catch(error => {

        this.setState({
          inRequest: false,
        });

        throw error;
      });

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
        onClose={event => this.onRequestClose(event)}
        // onEntering={this.handleEntering}
        {...dialogProps}
      >

        {this.renderForm()}

      </Dialog>
    )


  }
}


export default AuthForm;