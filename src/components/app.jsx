import React, { Component } from 'react';

import '../styles/base.scss';

class App extends Component {
  render() {
    return (
      <div className="main">
        { this.props.children }
      </div>
    );
  }
}

export default App;
