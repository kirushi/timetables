import React from 'react';

const SessionCalendarItem = (props) => (
  <div className="timetable__timeCell">
    { props.hour.display }
  </div>
)

export default SessionCalendarItem;
