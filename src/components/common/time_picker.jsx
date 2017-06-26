import React, { Component } from 'react';
import Select from 'react-select';

class TimePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, defaultValue, value, options, onChange } = this.props;
    return (
      <Select
        className="margin__bottom--md"
        name={name}
        defaultValue={defaultValue}
        value={value}
        options={options}
        onChange={onChange} />
    )
  }
}

export default TimePicker;
