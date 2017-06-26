import React, { Component } from 'react';
import { Checkbox } from '@blueprintjs/core';
import { getCorrectTextColor } from '../../utilities';

class SessionListItem extends Component {

  constructor(props) {
    super(props);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick() {
    if (this.props.isEnabled) {
      this.props.disableSession(this.props.item.id);
    } else {
      this.props.enableSession(this.props.item.id);
    }
  }

  getStyle() {
    let { color } = this.props.item;
    return {
      backgroundColor: color,
      color: getCorrectTextColor(color),
      borderRadius: '3px',
      marginBottom: '5px'
    }
  }

  render() {
    const { name, id, color } = this.props.item;
    return (
      <div className="pt-card__item" style={this.getStyle()}>
        <Checkbox checked={this.props.isEnabled} label={name} onChange={this.handleFilterClick} />
      </div>
    );
  }
}

export default SessionListItem;
