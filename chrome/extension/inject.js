import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}
