import React, { Component } from 'react';
import { Button, Intent } from "@blueprintjs/core";
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';

import Input from '../components/common/input';
import { loginUser } from '../actions';

class LoginContainer extends Component {

  handleLoginSubmit({ email, password }) {
    this.props.loginUser(email, password);
  }

  renderError() {
    console.log(this.props);
    if (this.props.error) {
      return (
        <div style={{ color: 'red' }}>
          { this.props.error }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className="width__login width--center margin__top--xxl" onSubmit={handleSubmit(this.handleLoginSubmit.bind(this))}>
        <div className="pt-card pt-elevation-0">
          <h3 className="text-center margin__bottom--lg">Greyman Fitness Solutions</h3>
          <hr />
          <div className="margin__bottom--md">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              component={Input}
              type="email"/>
          </div>

          <div className="margin__bottom--md">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              component={Input}
              type="password"/>
          </div>
          { this.renderError() }
          <Button
            className="pt-fill pt-large "
            type="submit"
            disabled={pristine}
            loading={submitting}
            intent={Intent.SUCCESS}>
            LOGIN
          </Button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}

LoginContainer = reduxForm({ form: 'loginForm' })(LoginContainer)
LoginContainer = connect(mapStateToProps, { loginUser })(LoginContainer)

export default LoginContainer;
