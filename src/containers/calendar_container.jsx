import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDayForDate } from '../services/service_time';
import { checkUserTypeForAll } from '../services/service_auth';
import NavigationContainer from './navigation_container';

import Timetable from '../components/timetable/timetable';
import SessionListItem from '../components/sessions/session_list_item';

import {
  fetchNextWeek,
  fetchPreviousWeek,
  fetchCurrentWeek,
  setSelectedDate,
  enableSession,
  disableSession
} from '../actions';

class CalendarContainer extends Component {

  renderTimetable() {
    return (
      <Timetable
        sessions={this.props.all_sessions}
        days={this.props.days}
        hours={this.props.all_hours}
        fetchNextWeek={this.props.fetchNextWeek}
        fetchPreviousWeek={this.props.fetchPreviousWeek}
        setSelectedDate={this.props.setSelectedDate}
        day={this.props.selected_date}
        currentUser={this.props.user}
        enabledSessions={this.props.enabled_sessions}
        displayName={this.props.displayMonths} />
    )
  }

  classIsActive(id) {
    return this.props.enabled_sessions.indexOf(id) > -1
  }

  renderClasses() {
    if (this.props.all_sessions.length) {
      const sessions = checkUserTypeForAll(this.props.all_sessions, this.props.user);
      let componentArray = [];
      sessions.map((item) => {
        componentArray.push(
          <SessionListItem
            key={item.id}
            isEnabled={this.classIsActive(item.id)}
            enableSession={this.props.enableSession}
            disableSession={this.props.disableSession}
            item={item} />
        );
      })
      return componentArray;
    }
    return (
      <div className="pt-card__item">
        No classes added yet
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavigationContainer />
        <div className="container-max">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-12">
              <div className="pt-card pt-card--base pt-elevation-1">
                <div className="pt-card__header">
                  <h4>Classes</h4>
                </div>
                <div className="pt-card__body">
                  { this.renderClasses() }
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-12">
              <div className="pt-card pt-card--base pt-card--timetable pt-elevation-1">
                { this.renderTimetable() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { displayMonths, days } = state.current_week;
  const { all_hours, selected_date, all_sessions, enabled_sessions } = state;
  return {
    all_sessions,
    enabled_sessions,
    displayMonths,
    selected_date,
    days,
    all_hours,
    user
  };
}

export default connect(mapStateToProps, {
  setSelectedDate,
  fetchNextWeek,
  fetchPreviousWeek,
  fetchCurrentWeek,
  enableSession,
  disableSession
})(CalendarContainer);
