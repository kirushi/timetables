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
  NonIdealState
} from "@blueprintjs/core";
import { browserHistory } from 'react-router';
import { INDEX, SESSIONS } from '../configuration';
import { hasAccess } from '../services/service_auth';
import { deleteSession } from '../actions';
import { getCorrectTextColor } from '../utilities';
import NavigationContainer from './navigation_container';
import CustomDialog from '../components/common/custom_dialog';

class AllSessionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_session: null
    }
    this.handleSessionDelete = this.handleSessionDelete.bind(this);
  }

  componentWillMount() {
    if (this.props.all_sessions.length && this.props.all_sessions.length > 0) {
      this.setState({ selected_session: this.props.all_sessions[0] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.all_sessions.length === 0 && this.props.all_sessions.length) {
      this.setState({ selected_session: this.props.all_sessions[0] });
    }
  }

  componentDidMount() {
    if (!hasAccess(INDEX, SESSIONS, this.props.user.type, this.props.user.admin)) {
      browserHistory.push('/not-found');
    }
  }

  renderDescription(desc) {
    if (desc.length) {
      return (
        <p>{desc}</p>
      )
    }
    return (
      <p>
        No description provided...
      </p>
    )
  }

  handleSessionDelete(id) {
    this.props.deleteSession(id, this.props.token);
    this.setState({ selected_session: this.props.all_sessions[0] });
  }

  renderActions(session) {
    return (
      <div>
        <CustomDialog
          iconName="pt-icon-trash"
          itemName={session.name}
          id={session.id}
          onConfirm={this.handleSessionDelete}
          warning="This will remove this class from the timetable." />
      </div>
    )
  }

  renderSelectedSession() {
    if (this.state.selected_session) {
      return (
        <div className="pt-card__body">
          <div className="pt-card__delete">
            { this.renderActions(this.state.selected_session) }
          </div>
          <h4 className="margin__bottom--md">
            <span className="pt-card__circle" style={{ backgroundColor: this.state.selected_session.color }}></span>
            { this.state.selected_session.name }
            <span className="pt-card__edit">
              <Button
                className="pt-minimal"
                onClick={() => console.log("Edit: ", session.name)}
                iconName="pt-icon-edit" />
            </span>
          </h4>
          { this.renderDescription(this.state.selected_session.description) }
        </div>
      );
    }
    return (
      <div className="pt-card__body">
        Please select a class
      </div>
    )
  }

  renderSessions() {
    let componentArray = [];
    if (this.props.all_sessions) {
      this.props.all_sessions.map(session => {
        componentArray.push(
          <a
            onClick={() => this.setState({ selected_session: session })}
            key={`session_${session.id}`}>
            <div className="pt-card__body">
              <span className="pt-card__circle" style={{ backgroundColor: session.color }}></span>
              { session.name }
            </div>
          </a>
        )
      })
    }
    return componentArray
  }

  renderMain() {
    if (this.props.all_sessions.length) {
      return (
          <div className="vertical__tabs">
            <div className="vertical__tabs__nav">
              { this.renderSessions() }
            </div>
            <div className="vertical__tabs__content">
              { this.renderSelectedSession() }
            </div>
          </div>
      )
    }
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <NonIdealState
            className="margin__top--xl margin__bottom--xl"
            title="No classes have been added yet."
            description="Please add a class by clicking the 'ADD' button above."
            visual="pt-icon-timeline-events"/>
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
                    All Classes
                    <Button
                      className="margin__left--md"
                      onClick={() => browserHistory.push('/classes/new')}
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
  const { all_sessions, auth } = state;
  return {
    all_sessions,
    user: auth.user,
    token: auth.token
  };
}

export default connect(mapStateToProps, { deleteSession })(AllSessionsContainer);
