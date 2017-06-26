import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import CalendarContainer from './containers/calendar_container';
import LoginContainer from './containers/login_container';
import SessionFormContainer from './containers/session_form_container';
import UserFormContainer from './containers/user_form_container';
import AllSessionsContainer from './containers/all_sessions_container';
import AllUsersContainer from './containers/all_users_container';
import NotFound from './components/common/not_found';
import requireAuth from './hoc/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuth(CalendarContainer)} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/classes" component={requireAuth(AllSessionsContainer)} />
    <Route path="/classes/new" component={requireAuth(SessionFormContainer)} />
    <Route path="/users" component={requireAuth(AllUsersContainer)} />
    <Route path="/users/new" component={requireAuth(UserFormContainer)} />
    <Route path="/not-found" component={NotFound} />
  </Route>
);
