import { combineReducers } from 'redux';
import Authentication from './reducer_auth';
import CurrentWeek from './reducer_current_week';
import SelectedDate from './reducer_selected_date';
import Sessions from './reducer_sessions';
import Users from './reducer_users';
import Hours from './reducer_hours';
import DetailedHours from './reducer_detailed_hours';
import AllMembers from './reducer_members';
import EnabledSessions from './reducer_enabled_sessions';
import AllTrainers from './reducer_trainers';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: Authentication,
  current_week: CurrentWeek,
  selected_date: SelectedDate,
  all_sessions: Sessions,
  all_users: Users,
  enabled_sessions: EnabledSessions,
  all_hours: Hours,
  all_detailed_hours: DetailedHours,
  all_members: AllMembers,
  all_trainers: AllTrainers,
  form: formReducer
});

export default rootReducer;
