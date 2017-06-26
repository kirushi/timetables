import { checkUserType } from './service_auth';
import { convertDateFormatToStd } from './service_time';

// private functions
function processCollidingSlots(slots) {
  if (!slots.length) return slots;
  slots.sort(compareStartTime);
  let groups = [];
  for (let i = 0; i < slots.length; i++) {
    let tempSlots = slots;
    let { doesIntersect, interArray } = slotsIntersect(slots[i], tempSlots.slice(i+1))
    if (doesIntersect) {
      interArray = validateGroup(groups, interArray);
      if (interArray.length) { groups.push(interArray); }
    }
  }
  return processGroups(groups, slots);
}

function validateGroup(groups, newArr) {
  groups.forEach((group) => {
    group.forEach((id) => {
      let index = newArr.indexOf(id);
      if (index > -1) {
        newArr.splice(index, 1);
      }
      if (newArr.length) { return [] };
    })
  })
  return newArr;
}

function processGroups(groups, slots) {
  if (groups.length) {
    groups.forEach((group) => {
      for (let i = 0; i < group.length; i++) {
        let item = slots.find(x => x.id === group[i]);
        let index = slots.indexOf(item);
        item.position.width = (100/group.length) + '%';
        item.position.left = ((100/group.length)*i) + '%';
        if (index > 0) {
          slots[index] = item;
        }
      }
    })
  }
  return slots;
}

function slotsIntersect(slot, otherSlots) {
  let interArray = [];
  otherSlots.map((item) => {
    if (item.start_time.full === slot.start_time.full) {
      interArray.push(item.id);
    }
    if (item.start_time.full > slot.start_time.full && item.start_time.full < slot.end_time.full) {
      interArray.push(item.id);
    }
  })
  const doesIntersect = interArray.length > 0;
  if (doesIntersect) {
    interArray.push(slot.id);
  }
  return { doesIntersect, interArray }
}

function compareStartTime(a, b) {
  if (a.start_time.full < b.start_time.full) {
    return -1;
  }
  if (a.start_time.full > b.start_time.full) {
    return 1;
  }
  return 0;
}

function getPositionForSlot(startTime, endTime, hours) {
  const [ startTimeHour, startTimeMinutes ] = startTime.split(":").map(item => {
    return parseInt(item);
  });
  const [ endTimeHour, endTimeMinutes ] = endTime.split(":").map(item => {
    return parseInt(item);
  });

  // temp variables
  let startHour = startTimeHour;
  let endHour = endTimeHour;
  let startMinutes = startTimeMinutes;
  let endMinutes = endTimeMinutes;

  let duration = Math.abs((startHour + (startMinutes/60)) - (endHour + (endMinutes/60)));

  let configStartHour = 0;
  let configEndHour = 0;

  if (hours.length > 0) {
    configStartHour = hours[0].digit;
    configEndHour = hours[hours.length-1].digit;
  }
  let top = 0
  let left = 0;
  let height = 75;
  let width = 100;

  if (startHour + (startMinutes/60) === configStartHour) {
    top = 0;
  } else if (startHour + (startMinutes/60) > configStartHour) {
    top = ((Math.abs(configStartHour - startHour)) * 75) + ((startMinutes/60) * 75)
  }

  if (endHour > configEndHour || endHour < startHour) {
    endHour = configEndHour;
    endMinutes = 0;
  }

  height = ((Math.abs(startHour - endHour)) + (Math.abs(startMinutes/60 - endMinutes/60))) * 75;

  width = width + '%';
  const position = { top, left, height, width }
  const startTimeObj = { hours: startTimeHour, minutes: startTimeMinutes, full: startTimeHour + (startTimeMinutes/60) }
  const endTimeObj = { hours: endTimeHour, minutes: endTimeMinutes, full: endTimeHour + (endTimeMinutes/60) }

  return { start_time: startTimeObj, end_time: endTimeObj, position, duration }
}

function filterSlots(sessions, slotsAllowed, currentUser) {
  sessions = sessions.filter(session => {
    return checkUserType(session, currentUser)
  })

  if (slotsAllowed.length) {
    sessions = sessions.filter(session => { return slotsAllowed.indexOf(session.id) > -1 });
  }
  return sessions;
}

// public functions
export function getSlotDataForDay(dayOfWeek, sessions, hours, slotsAllowed, currentUser, currDay) {
  let currentDaySlots = [];
  if (sessions) {

    sessions = filterSlots(sessions, slotsAllowed, currentUser);

    sessions.map(session => {
      let slotItem = {
        name: session.name,
        members: session.members,
        description: session.description,
        trainers: session.trainers,
        color: session.color
      }
      session.slots.map(slot => {
        let shouldProcess = false;
        if (slot.repeats_weekly) {
          if (slot.day_of_week === dayOfWeek) { shouldProcess = true; }
        } else {
          if (convertDateFormatToStd(slot.occurs_on, "YYYY-MM-DD") === currDay) { shouldProcess = true; }
        }
        if (shouldProcess) {
          const { start_time, end_time, position, duration } = getPositionForSlot(slot.start_time, slot.end_time, hours);
          slotItem = ({
            ...slotItem, start_time, end_time, position, duration, id: `${slotItem.name}-${dayOfWeek}-${start_time.full}`
          });
          currentDaySlots.push(slotItem);
        }
      })
    });
  }
  processCollidingSlots(currentDaySlots);
  return currentDaySlots;
}
