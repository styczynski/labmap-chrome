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
            <b>
              {
                (computer.user)?(computer.user.name + ' ' + computer.user.surname):(null)
              }
            </b>
          </li>
          <li>
            {
              (computer.state !== 'off')?(
                <b>{'('+computer.state+')'}</b>
              ):(null)
            }
          </li>
        </ul>
      </div>
    );
  }
}
