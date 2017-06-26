import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Button,
  PopoverInteractionKind,
  Position,
  Intent,
  Tag,
  NonIdealState
} from "@blueprintjs/core";
import { browserHistory } from 'react-router';

import { fetchUsers, deleteUser } from '../actions';
import { INDEX, USERS } from '../configuration';
import { hasAccess } from '../services/service_auth';
import NavigationContainer from './navigation_container';
import CustomDialog from '../components/common/custom_dialog';

class AllUsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_user: null
    }
    this.handleUserDelete = this.handleUserDelete.bind(this);
  }

  componentWillMount() {
    if (this.props.all_users.length && this.props.all_users.length > 0) {
      this.setState({ selected_user: this.props.all_users[0] });
    }
  }

  componentDidMount() {
    if (hasAccess(INDEX, USERS, this.props.user.type, this.props.user.admin)) {
      this.props.fetchUsers(this.props.token);
    } else {
      browserHistory.push('/not-found');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.all_users.length === 0 && this.props.all_users.length) {
      this.setState({ selected_user: this.props.all_users[0] });
    }
  }

  handleUserDelete(id) {
    this.props.deleteUser(id, this.props.token);
    this.setState({ selected_user: this.props.all_users[0] });
  }

  renderActions(user) {
    return (
      <div>
        <CustomDialog
          iconName="pt-icon-trash"
          itemName={user.name}
          id={user.id}
          onConfirm={this.handleUserDelete}
          warning="Permanently remove this user?" />
      </div>
    )
  }

  renderSelectedUser() {
    const { selected_user } = this.state
    if (selected_user) {
      let isMe = this.props.user.id === selected_user.id;
      return (
        <div className="pt-card__body">
          <div className="pt-card__delete">
            { this.renderActions(selected_user) }
          </div>
          <h4 className="margin__bottom--sm">
            {`${selected_user.name} ${isMe ? '(YOU)' : '' }`}
            <span className="pt-card__edit">
              <Button
                className="pt-minimal"
                onClick={() => console.log("Edit: ", selected_user.name)}
                iconName="pt-icon-edit" />
            </span>
          </h4>
          <div className="tagsContainer">
            { this.renderRoleTag(selected_user) }
          </div>
          <p>
            { selected_user.email }
          </p>
        </div>
      );
    }
    return (
      <div className="pt-card__body">
        Select a user
      </div>
    )
  }

  renderRoleTag(user) {
    let componentArray = [];
    if (user.admin) {
      componentArray.push(<Tag intent={Intent.DANGER} key={`user_admin_${user.id}`}>Admin</Tag>);
    }
    switch (user.type) {
      case "Trainer":
        componentArray.push(<Tag intent={Intent.PRIMARY} key={`user_trainer_${user.id}`}>Trainer</Tag>);
        break;
      default:
        componentArray.push(<Tag intent={Intent.SUCCESS} key={`user_member_${user.id}`}>Member</Tag>);
        break;
    }
    return componentArray;
  }

  renderRoleCircle(user) {
    let componentArray = [];
    if (user.admin) {
      componentArray.push(<span key={`user_admin_${user.id}`} className="pt-card__text pt-card__text--admin">A</span>);
    }
    switch (user.type) {
      case "Trainer":
        componentArray.push(<span key={`user_trainer_${user.id}`} className="pt-card__text pt-card__text--trainer">T</span>)
        break;
      case "Member":
        componentArray.push(<span key={`user_member_${user.id}`} className="pt-card__text pt-card__text--member">M</span>)
        break;
    }
    return componentArray;
  }

  renderUsers() {
    let componentArray = [];
    if (this.props.all_users) {
      this.props.all_users.map(user => {
        let isMe = this.props.user.id === user.id;
        componentArray.push(
          <a
            onClick={() => this.setState({ selected_user: user })}
            key={`user_${user.id}`}>
            <div className="pt-card__body">
              { this.renderRoleCircle(user) }
              {`${user.name} ${isMe ? '(YOU)' : '' }`}
            </div>
          </a>
        )
      })
    }
    return componentArray
  }

  renderMain() {
    if (this.props.all_users.length) {
      return (
          <div className="vertical__tabs">
            <div className="vertical__tabs__nav">
              { this.renderUsers() }
            </div>
            <div className="vertical__tabs__content">
              { this.renderSelectedUser() }
            </div>
          </div>
      )
    }
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <NonIdealState
            className="margin__top--xl margin__bottom--xl"
            title="No users have been added yet."
            description="Please add a user by clicking the 'ADD' button above."
            visual="pt-icon-user"/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavigationContainer currentRoute={this.props.route.path} />
        <div className="container-max">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="pt-card pt-card--base pt-elevation-1">
                <div className="pt-card__header">
                  <h4>
                    All Users
                    <Button
                      className="margin__left--md"
                      onClick={() => browserHistory.push('/users/new')}
                      intent={Intent.SUCCESS}>
                      ADD
                    </Button>
                  </h4>
                </div>
                { this.renderMain() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { all_users, auth } = state;
  return {
    all_users,
    user: auth.user,
    token: auth.token
  };
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(AllUsersContainer);
