import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
  Popover,
  Button,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';
import { DatePicker } from "@blueprintjs/datetime";
import { getDayOfWeekForDate } from '../../services/service_time';
import { getSlotDataForDay } from '../../services/service_slots';
import SessionCalendarItem from '../sessions/session_calendar_item';
import DayColumn from './day_column';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    if (date) {
      this.props.setSelectedDate(date);
    }
  }

  renderTime() {
    let componentArray = [];
    if (this.props.hours) {
      componentArray.push(
        <div
          className="timetable__timeCell timetable__timeCell--small"
          key={`hour_${Math.random()}`}>
        </div>
      )
      this.props.hours.map(hour => {
        componentArray.push(
          <div className="timetable__timeCell" key={`hour_${hour.epoch}`}>
            { hour.display }
          </div>
        );
      });
      return componentArray;
    }
  }

  renderDatePicker() {
    return (
      <DatePicker
        defaultValue={new Date()}
        value={this.props.selected_date}
        onChange={this.handleDateChange} />
    )
  }

  renderActions() {
    return (
      <div>
        <div className="pt-button-group">
          <Button
            onClick={() => this.props.fetchPreviousWeek(this.props.days)}
            className="pt-large"
            iconName="pt-icon-chevron-left" />
          <Popover content={this.renderDatePicker()}
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="pt-popover-content-sizing"
            position={Position.BOTTOM_RIGHT}
            useSmartPositioning={false}>
            <Button
              className="pt-large"
              iconName="pt-icon-calendar" />
          </Popover>
          <Button
            onClick={() => this.props.fetchNextWeek(this.props.days)}
            className="pt-large"
            iconName="pt-icon-chevron-right" />
        </div>
        <Button
          className="pt-large"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
          iconName={`${this.state.expanded ? 'pt-icon-minimize': 'pt-icon-fullscreen'}`} />
      </div>
    );
  }

  renderDays() {
    let componentArray = [];
    const { sessions, hours, enabledSessions, currentUser } = this.props;
    if (this.props.days) {
      this.props.days.map(day => {
        componentArray.push(
          <DayColumn
            key={`day_${day.epoch}`}
            day={day}
            currentUser={currentUser}
            sessions={sessions}
            enabledSessions={enabledSessions}
            hours={hours} />
        );
      })
    }
    return componentArray;
  }

  render() {
    return (
      <div className={`timetable ${this.state.expanded ? 'timetable--expanded' : ''}`}>
        <div className="timetable__header">
          { this.props.displayName }
          <div className="timetable__actionBar">
            { this.renderActions() }
          </div>
        </div>

        <div className="timetable__groundZero">
          <div className="timetable__timeCol">
            { this.renderTime() }
          </div>
          <div className="timetable__daysCol">
            { this.renderDays() }
          </div>
        </div>
      </div>
    )
  }
}

export default Timetable;
