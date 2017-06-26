import React, { Component } from 'react';
import {
  Popover,
  Button,
  PopoverInteractionKind,
  Position,
  Intent,
  Checkbox,
  Tooltip
} from "@blueprintjs/core";
import TimePicker from '../common/time_picker';
import { DatePicker } from "@blueprintjs/datetime";
import { getDayForDate } from "../../services/service_time";

const daysArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

class SlotItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item.id,
      day_of_week: props.item.day_of_week,
      start_time: props.item.start_time,
      end_time: props.item.end_time,
      repeats_weekly: props.item.repeats_weekly,
      hours: props.hours
    }
    this.onDayChange = this.onDayChange.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.onRepeatChange = this.onRepeatChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({ occurs_on: date })
    this.props.handleSlotChange({
      id: this.state.id,
      day_of_week: this.state.value,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      repeats_weekly: this.state.repeats_weekly,
      occurs_on: this.state.occurs_on
    })
  }

  onDayChange(e) {
    this.setState({ day_of_week: e.target.value })
    this.props.handleSlotChange({
      id: this.state.id,
      day_of_week: e.target.value,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      repeats_weekly: this.state.repeats_weekly,
      occurs_on: this.state.occurs_on
    })
  }

  onStartTimeChange(time) {
    this.setState({ start_time: time });
    this.props.handleSlotChange({
      id: this.state.id,
      day_of_week: this.state.day_of_week,
      start_time: time,
      end_time: this.state.end_time,
      repeats_weekly: this.state.repeats_weekly,
      occurs_on: this.state.occurs_on
    })
  }

  onEndTimeChange(time) {
    this.setState({ end_time: time })
    this.props.handleSlotChange({
      id: this.state.id,
      day_of_week: this.state.day_of_week,
      start_time: this.state.start_time,
      end_time: time,
      repeats_weekly: this.state.repeats_weekly,
      occurs_on: this.state.occurs_on
    })
  }

  onRepeatChange() {
    const isSelected = !this.state.repeats_weekly;
    this.setState({ repeats_weekly: isSelected })
    this.props.handleSlotChange({
      id: this.state.id,
      day_of_week: this.state.day_of_week,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      repeats_weekly: isSelected,
      occurs_on: this.state.occurs_on
    })
  }

  isHourValid(hour) {
    if (this.state.start_time) {
      return hour.digit > this.state.start_time.value;
    }
    return true;
  }

  getHours() {
    let optionsArray = [];
    let hours = this.state.hours
    if (hours && hours.length) {
      hours.map(hour => {
        let isDisabled = !this.isHourValid(hour);
        optionsArray.push({
          value: hour.digit,
          label: hour.display,
          disabled: isDisabled
        })
      })
    }
    return optionsArray;
  }

  renderDaySelect() {
    let optionsComponentArray = [];
    daysArray.map((day) => {
      optionsComponentArray.push(
        <option key={day} value={day}>{day}</option>
      )
    });
    return (
      <div>
        <label className="pt-label">Day</label>
        <div className="pt-select pt-fill">
          <select defaultValue={this.props.item.day_of_week} onChange={this.onDayChange}>
            { optionsComponentArray }
          </select>
        </div>
        <hr />
      </div>
    );
  }

  renderActions() {
    return (
      <div className="pt-card__actionBar">
        <Button
          className="pt-fill"
          onClick={() => this.props.removeSlot(this.props.item)}
          iconName="pt-icon-cross"
          intent={Intent.DANGER} />
      </div>
    );
  }

  renderStartTime() {
    const options = this.getHours();
    return (
      <div>
        <sub className="margin__bottom--sm">FROM</sub>
        <div className="margin__bottom--md">
          <TimePicker
            name="start_time"
            defaultValue={options[0]}
            value={this.state.start_time}
            onChange={this.onStartTimeChange}
            options={options} />
        </div>
      </div>
    )
  }

  renderEndTime() {
    if (this.state.start_time && this.state.start_time.value > 0) {
      const options = this.getHours();
      return (
        <div>
          <sub className="margin__bottom--sm">TO</sub>
          <div className="margin__bottom--md">
            <TimePicker
              name="end_time"
              defaultValue={options[0]}
              value={this.state.end_time}
              onChange={this.onEndTimeChange}
              options={options} />
          </div>
        </div>
      )
    }
  }

  renderDuration() {
    return (
      <div>
        { this.renderStartTime() }
        { this.renderEndTime() }
      </div>
    );
  }

  renderDatePicker() {
    return (
      <DatePicker
        defaultValue={new Date()}
        value={this.state.occurs_on}
        onChange={this.handleDateChange} />
    )
  }

  renderDateSelect() {
    return (
      <div>
        <label className="pt-label">Day</label>
        <Popover className="margin__bottom--lg" content={this.renderDatePicker()}
          interactionKind={PopoverInteractionKind.CLICK}
          popoverClassName="pt-popover-content-sizing"
          position={Position.RIGHT}
          useSmartPositioning={false}>
          <Button
            text={getDayForDate(this.state.occurs_on)}
            className="pt-large"
            iconName="pt-icon-calendar" />
        </Popover>
      </div>
    )
  }

  renderRepeats() {
    return (
      <div>
        <Tooltip content="Toggle this to change from recurring weekly to a single day occurence." position={Position.RIGHT}>
          <Checkbox
            checked={this.state.repeats_weekly}
            label="This class will recur weekly"
            onChange={this.onRepeatChange} />
        </Tooltip>
      </div>
    )
  }

  renderForm() {
    if (this.state.repeats_weekly) {
      return (
        <div>
          { this.renderDaySelect() }
          { this.renderDuration() }
        </div>
      );
    }
    return (
      <div>
        { this.renderDateSelect() }
        { this.renderDuration() }
      </div>
    )
  }

  render() {
    return (
      <div className="pt-card pt-card--relative pt-elevation-0" style={{ maxWidth: "250px"}}>
        { this.renderRepeats() }
        { this.renderForm() }
        { this.renderActions() }
      </div>
    );
  }
}

export default SlotItem;
