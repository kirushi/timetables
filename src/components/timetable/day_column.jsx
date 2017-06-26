import React, { Component } from 'react';
import { getCorrectTextColor } from '../../utilities';
import { getSlotDataForDay } from '../../services/service_slots';
import { getDurationDisplay, getDayForEpoch } from '../../services/service_time';

class DayColumn extends Component {
  constructor(props) {
    super(props);
  }

  renderSlot(slot) {
    const { startTime, endTime } = getDurationDisplay(slot.start_time, slot.end_time);
    return (
      <div className="item">
        <h4 className="item__header">{ slot.name }</h4>
        <div className="item__sub">{`${startTime} - ${endTime}`}</div>
      </div>
    );
  }

  renderSlots() {
    let componentArray = [];
    const { sessions, hours, enabledSessions, currentUser, day } = this.props;
    const currDay = getDayForEpoch(day.epoch);
    const slots = getSlotDataForDay(this.props.day.day_of_week, sessions, hours, enabledSessions, currentUser, currDay);
    if (slots.length > 0) {
      slots.map((slot) => {
        componentArray.push(
          <div
            key={`slot_${slot.name}_${Math.random()}`}
            className="day__col__item"
            style={{
              backgroundColor: slot.color,
              color: getCorrectTextColor(slot.color),
              top: slot.position.top,
              height: slot.position.height,
              left: slot.position.left,
              width: slot.position.width
            }}>
            { this.renderSlot(slot) }
          </div>
        )
      });
    }
    return componentArray;
  }

  render() {
    const { day } = this.props;
    return (
      <div className={`timetable__dayCol ${day.active ? 'timetable__dayCol--active': ''}`} key={day.epoch}>
        <h4 className="day__header">{day.displayName}</h4>
        <div className="day__col">
          { this.renderSlots() }
        </div>
      </div>
    )
  }
}

export default DayColumn;
