import React, { PropTypes, Component } from 'react';
import style from './UsersTable.css';

export default class UsersTable extends Component {

  render() {
    
    const {actions, plan, lastUpdateTimestamp, labData} = this.props;
    
    const parseText = (text) => {
      if(!text) return '';
      return text
        .replace(/ą/ig,'a')
        .replace(/ę/ig,'e')
        .replace(/ć/ig,'c')
        .replace(/ł/ig,'l')
        .replace(/ó/ig,'o')
        .replace(/ś/ig,'s')
        .replace(/ż/ig,'z')
        .replace(/ź/ig,'z')
        .replace(/ń/ig,'n')
    };
    
    let usersRows = [];
    Object.keys(labData.data).forEach((labNo) => {
      const labComputers = labData.data[labNo].computers;
      Object.keys(labComputers).forEach((computerNo) => {
        const computer = labComputers[computerNo];
        const user = computer.user;
        if(user) {
          usersRows.push(
            <tr>
              <td className={style.user}>{parseText(user.name)} {parseText(user.surname)}</td>
              <td>{parseText(user.login)}</td>
              <td className={style.lab+' '+style['lab'+labNo]}>{labNo}</td>
              <td>{computer.name}</td>
            </tr>
          );
        }
      });
    });
    
    return (
      <div className={style.usersTableWrapper}>
        {(usersRows.length<=0)?(null):(
          <table className={style.usersTable}>
            <tr>
              <th>User</th>
              <th>Login</th>
              <th>Lab</th>
              <th>Computer</th>
            </tr>
            {usersRows}
          </table>
        )}
      </div>
    );
  }
}
