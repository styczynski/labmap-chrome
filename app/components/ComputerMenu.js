import React, { PropTypes, Component } from 'react';
import style from './ComputerMenu.css';
import moment from 'moment';

export default class ComputerMenu extends Component {

  render() {
 
    const {labNo, computer} = this.props;
 
    return (
      <div className={style.computerMenu}>
        <h1>Computer {computer.name}</h1>
        <ul>
          <li>
            <b>State:</b>
            {
              (computer.state)?(computer.state):('unknown')
            }
          </li>
          <li>
            <b>User:</b>
            {
              (computer.user)?(computer.user):('---')
            }
          </li>
        </ul>
        <span>Please click to do ssh login</span>
      </div>
    );
  }
}
