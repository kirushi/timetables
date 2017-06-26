import React, { Component } from 'react';
import {
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  AnchorButton,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';
import { logoutUser } from '../actions';

import { INDEX, SESSIONS, USERS } from '../configuration';
import { hasAccess } from '../services/service_auth';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  isActive(route) {
    return this.props.currentRoute === route ? 'active' : '';
  }

  renderManageSessions() {
    if (hasAccess(INDEX, SESSIONS, this.props.user.type, this.props.user.admin)) {
      return (
        <a onClick={() => { browserHistory.push('/classes')}} className={`nav__link nav__link--border ${this.isActive('/classes')}`}>
          <span className="icon pt-icon-standard pt-icon-timeline-events"></span> Classes
        </a>
      );
    }
  }

  renderManageUsers() {
    if (hasAccess(INDEX, USERS, this.props.user.type, this.props.user.admin)) {
      return (
        <a onClick={() => { browserHistory.push('/users')}} className={`nav__link nav__link--border ${this.isActive('/users')}`}>
          <span className="icon pt-icon-standard pt-icon-user"></span> Users
        </a>
      );
    }
  }

  renderUser() {
    if (this.props.authenticated) {
      const menu = (
        <Menu>
          <MenuItem
            iconName="pt-icon-user"
            onClick={(e) => { browserHistory.push('/') }}
            text="My Account (UC)" />
          <MenuItem
            iconName="cog"
            onClick={(e) => { browserHistory.push('/') }}
            text="Settings (UC)" />
          <MenuDivider />
          <MenuItem
            onClick={(e) => { this.props.logoutUser() }}
            text="Logout" />
        </Menu>
      )
      return (
        <Popover className="nav__link--border" content={menu} position={Position.BOTTOM_RIGHT}>
          <a className="nav__link">{this.props.user.name} <span className="pt-icon-standard pt-icon-chevron-down"></span></a>
        </Popover>
      );
    }
  }

  render() {
    return (
      <nav className="nav main__nav container-max">
        <a onClick={() => { browserHistory.push('/')}} className="nav__link logo">Greyman Fitness Solutions</a>
        <div className="nav__link--right">
          { this.renderManageSessions() }
          { this.renderManageUsers() }
          { this.renderUser() }
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { authenticated, user } = state.auth
  return {
    authenticated,
    user
  }
}

export default connect(mapStateToProps, { logoutUser })(Navigation);
