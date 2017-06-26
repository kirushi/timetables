import React from 'react';
import { browserHistory } from 'react-router';
import NavigationContainer from '../../containers/navigation_container';

const NotFound = () => (
  <div>
    <NavigationContainer />
    <div className="container-max">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <div>
              <h1>404</h1>
              <h4>Sorry something went wrong.</h4>
              <a onClick={() => browserHistory.push('/')}>Go back to home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound;
