import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { TimePicker } from "@blueprintjs/datetime";
import {
  Popover,
  Button,
  PopoverInteractionKind,
  Position,
  Intent,
  Checkbox,
  Tooltip
} from "@blueprintjs/core";
import { CirclePicker } from 'react-color';
import Select from 'react-select';

import { getMembers, getTrainers, postSession } from '../actions';
import { getCorrectTextColor } from '../utilities';

import { INDEX, SESSIONS } from '../configuration';
import { hasAccess, filterTrainers } from '../services/service_auth';
import { convertDigitToDate } from '../services/service_time';

import NavigationContainer from './navigation_container';
import ListItem from '../components/common/list_item';
import SlotItem from '../components/sessions/slot_item';

class SessionFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      color: '',
      is_private: false,
      slots_attributes: [
        {
          id: Math.random(),
          day_of_week: 'Monday',
          start_time: null,
          occurs_on: null,
          end_time: null,
          repeats_weekly: true,
        }
      ],
      category: "",
      members_arr: [],
      trainers_arr: []
    }
    this.removeSlot = this.removeSlot.bind(this);
    this.addSlot = this.addSlot.bind(this);
    this.onMemberChange = this.onMemberChange.bind(this);
    this.onTrainerChange = this.onTrainerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidMount() {
    if (hasAccess(INDEX, SESSIONS, this.props.user.type, this.props.user.admin)) {
      this.props.getMembers(this.props.token);
      this.props.getTrainers(this.props.token);
    } else {
      browserHistory.push('/not-found');
    }
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex });
  };

  handleSlotChange(item) {
    let slots_attributes = []
    this.state.slots_attributes.map(slot => {
      if (slot.id === item.id) {
        slots_attributes.push(item)
      } else {
        slots_attributes.push(slot);
      }
    })
    this.setState({ slots_attributes });
  }

  handleSubmit() {
    let members_arr = [];
    this.state.members_arr.map(option => {
      members_arr.push({ id: option.value });
    })
    let trainers_arr = [];
    this.state.trainers_arr.map(option => {
      trainers_arr.push({ id: option.value });
    })
    let slots_arr = [];
    this.state.slots_attributes.map(slot => {
      if (slot.start_time && slot.end_time) {
        slot.start_time = convertDigitToDate(slot.start_time.value);
        slot.end_time = convertDigitToDate(slot.end_time.value);
      }
      slots_arr.push(slot);
    });
    console.log(slots_arr);
    this.props.postSession({
      name: this.state.name,
      description: this.state.description,
      color: this.state.color,
      slots_attributes: slots_arr
    }, members_arr, trainers_arr, this.props.token,)
  }

  onMemberChange(val) {
    this.setState({ members_arr: val });
  }

  onTrainerChange(val) {
    this.setState({ trainers_arr: val });
  }

  addSlot() {
    const id = Math.random();
    const { slots_attributes } = this.state;
    slots_attributes.push({
      id,
      day_of_week: 'Monday',
      start_time: null,
      end_time: null,
      repeats_weekly: true
    })
    this.setState({ slots_attributes });
  }

  removeSlot(item) {
    const { slots_attributes } = this.state;
    const index = slots_attributes.indexOf(item);
    if (index > -1) {
      slots_attributes.splice(index, 1);
    }
    this.setState({ slots_attributes });
  }

  renderSlots() {
    let componentArray = [];
    this.state.slots_attributes.map((item) => {
      componentArray.push(
        <SlotItem
          key={`slot_${item.id}`}
          hours={this.props.all_detailed_hours}
          handleSlotChange={this.handleSlotChange}
          removeSlot={this.removeSlot}
          item={item} />
      );
    });
    return componentArray;
  }

  renderTrainerSelect() {
    const options = [];
    if (this.props.all_trainers) {
      filterTrainers(this.props.all_trainers, this.props.user).map((trainer) => {
        options.push({
          value: trainer.id,
          label: trainer.user.name
        })
      })
    }
    return (
      <Select
        className="margin__bottom--md"
        name="members"
        multi={true}
        value={this.state.trainers_arr}
        options={options}
        onChange={this.onTrainerChange}
        />
    )
  }

  renderMemberSelect() {
    const options = [];
    if (this.props.all_members) {
      this.props.all_members.map((member) => {
        options.push({
          value: member.id,
          label: member.user.name
        })
      })
    }
    return (
      <Select
        className="margin__bottom--md"
        name="members"
        value={this.state.members_arr}
        multi={true}
        options={options}
        onChange={this.onMemberChange}
        />
    )
  }

  renderColorPicker() {
    const colorContent = (
      <CirclePicker
        color={this.state.color}
        onChangeComplete={ this.handleColorChange } />
    );
    return (
      <Popover className="popover-colorpicker margin__bottom--sm" content={colorContent}
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="pt-popover-content-sizing"
        position={Position.BOTTOM_RIGHT}
        useSmartPositioning={false}>
        <input
          onChange={(e) => { this.setState({ color: e.target.value })}}
          className="pt-input pt-fill pt-large"
          name="color" type="text"
          value={this.state.color}
          style={{
            color: getCorrectTextColor(this.state.color),
            backgroundColor: this.state.color
          }}
          dir="auto" />
      </Popover>
    )
  }

  render() {
    const { name, description, member_limit, slots_attributes } = this.state;
    return (
      <div>
        <NavigationContainer />
        <div className="container-max container-max--form">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="pt-card pt-elevation-1">
                <h4>New Class</h4>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9">
                      <fieldset>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <label className="pt-label">Name
                              <input onChange={(e) => { this.setState({ name: e.target.value })}} className="pt-input pt-fill pt-large" name="name" type="text" value={this.state.name} dir="auto" />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <label className="pt-label">Description</label>
                        <textarea onChange={(e) => { this.setState({ description: e.target.value })}} className="pt-input pt-fill pt-large" name="description" dir="auto" value={ description } />
                      </fieldset>
                      <fieldset>
                        <label className="pt-label pt-label--inline">
                          Time slots
                        </label>
                        <Button
                          onClick={this.addSlot}
                          intent={Intent.PRIMARY}>
                          ADD
                        </Button>
                        <div className="tileLayout">
                          { this.renderSlots() }
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <fieldset>
                        <label className="pt-label">
                          Trainer
                          { this.renderTrainerSelect() }
                        </label>
                      </fieldset>
                      <fieldset>
                        <label className="pt-label">
                          Members
                          { this.renderMemberSelect() }
                        </label>
                      </fieldset>
                      <fieldset>
                        <label className="pt-label">Color</label>
                        { this.renderColorPicker() }
                      </fieldset>
                      <hr />
                      <fieldset>
                        <Tooltip content="Only admin/selected members & trainers can see this class." position={Position.BOTTOM}>
                          <Checkbox
                            checked={this.state.is_private}
                            label="Make private"
                            onChange={() => this.setState({ is_private: !this.state.is_private })} />
                        </Tooltip>
                      </fieldset>
                    </div>
                  </div>
                  <div className="main__footer">
                    <div className="container-max container-max--footer">
                      <div className="pull-right">
                        <Button
                          className="pt-minimal pt-large margin__right--md"
                          onClick={() => { browserHistory.push('/classes') }}>
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
  const { all_members, all_trainers, auth, all_detailed_hours } = state;
  return {
    all_members,
    all_trainers,
    all_detailed_hours,
    user: auth.user,
    token: auth.token
  }
}

export default connect(mapStateToProps, { getMembers, getTrainers, postSession })(SessionFormContainer);
