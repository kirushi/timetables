import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { initialData } from './actions'
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers)

// default data
store.dispatch(initialData(new Date()));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('#js-timetables'));
