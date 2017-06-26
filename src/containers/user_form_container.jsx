import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  Button,
  Intent,
  Checkbox,
  Tooltip,
  Position
} from "@blueprintjs/core";
import Select from 'react-select';

import { postMember, postTrainer } from '../actions';

import { INDEX, USERS, CREATE } from '../configuration';
import { hasAccess } from '../services/service_auth';

import NavigationContainer from './navigation_container';

class UserFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      admin: false,
      password: '',
      confirm_password: '',
      profile: "Member"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
  }

  componentDidMount() {
    if (!hasAccess(CREATE, USERS, this.props.user.type, this.props.user.admin)) {
      browserHistory.push('/not-found');
    }
  }

  handleSubmit() {
    const { name, email, admin, profile, password } = this.state;
    const dataObj = {
      user_attributes: { name, email, admin, password }
    }
    switch (profile.value) {
      case "Member":
        this.props.postMember(dataObj, this.props.token);
        break;
      case "Trainer":
        this.props.postTrainer(dataObj, this.props.token);
        break;
    }
  }

  onProfileChange(val) {
    this.setState({ profile: val });
  }

  renderProfileSelect() {
    let options = [];
    options.push({
      label: "Member",
      value: "Member"
    })
    options.push({
      label: "Trainer",
      value: "Trainer"
    })

    return (
      <Select
        className="margin__bottom--md"
        name="profile"
        value={this.state.profile}
        options={options}
        onChange={this.onProfileChange} />
    )
  }

  render() {
    const { name, email, admin, password, confirm_password } = this.state;
    return (
      <div>
        <NavigationContainer />
        <div className="container-max container-max--form">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="pt-card pt-elevation-1">
                <h4>New User</h4>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <fieldset>
                        <label className="pt-label">Select type</label>
                        { this.renderProfileSelect() }
                      </fieldset>
                      <fieldset>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <label className="pt-label">Name
                              <input onChange={(e) => { this.setState({ name: e.target.value })}} className="pt-input pt-fill pt-large" name="name" type="text" value={name} dir="auto" />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <hr />
                      <fieldset>
                        <label className="pt-label">Email</label>
                        <input onChange={(e) => { this.setState({ email: e.target.value })}} className="pt-input pt-fill pt-large" name="email" type="email" value={email} dir="auto" />
                      </fieldset>
                      <fieldset>
                        <label className="pt-label">Password</label>
                        <input onChange={(e) => { this.setState({ password: e.target.value })}} className="pt-input pt-fill pt-large" name="password" type="password" value={password} dir="auto" />
                      </fieldset>
                      <fieldset>
                        <label className="pt-label">Confirm password</label>
                        <input onChange={(e) => { this.setState({ confirm_password: e.target.value })}} className="pt-input pt-fill pt-large" name="email" type="password" value={confirm_password} dir="auto" />
                      </fieldset>
                      <hr />
                      <fieldset className="margin__top--xl">
                        <Tooltip content="Provide full access for this user." position={Position.BOTTOM}>
                          <Checkbox
                            checked={this.state.admin}
                            label="Make this user an administrator?"
                            onChange={() => this.setState({ admin: !admin })} />
                        </Tooltip>
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    </div>
                  </div>
                  <div className="main__footer">
                    <div className="container-max container-max--footer">
                      <div className="pull-right">
                        <Button
                          className="pt-minimal pt-large margin__right--md"
                          onClick={() => { browserHistory.push('/users') }}>
                          Cancel
                        </Button>
                        <Button
                          className="pt-large"
                          onClick={this.handleSubmit}
                          intent={Intent.SUCCESS}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    token: auth.token,
    user: auth.user
  }
}

export default connect(mapStateToProps, { postMember, postTrainer })(UserFormContainer);
