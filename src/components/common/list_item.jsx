import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

const ListItem = (props) => (
  <div className="pt-card pt-card--list-item pt-elevation-0">
    { props.name }
  </div>
)

export default ListItem;
