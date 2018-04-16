import React, { Component, PropTypes } from 'react';
import style from './StatsView.css';
import moment from 'moment';

export default class StatsView extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    
    const {plan, actions} = this.props;
    const stats = (plan || {}).stats;
    
    const forceUpdateData = () => {
      actions.updateFetchedState({});
    };
    
    const issueCommit = () => {
      chrome.runtime.sendMessage({type:'request-issue-form'});
    };
    
    const sshRequest = () => {
      chrome.runtime.sendMessage({type:'request-ssh-login'});
    };
    
    let lastUpdateText = '';
    
    if(stats) {
       const lastUpdateMoment = moment(stats.last_update, "DD.MM.YYYY HH:mm");
       lastUpdateText = lastUpdateMoment.fromNow();
    }
    
    return (
      <div className={style.statsView}>
        <aside className={style.buttons}>
          <button onClick={forceUpdateData}>
            Update
          </button>
          <button onClick={issueCommit}>
            Report issue
          </button>
          <button onClick={sshRequest}>
            SSH
          </button>
        </aside>
        <p>
          {
            (stats)?(
              <b>Server time: {stats.current_time}</b>
            ):(null)
          }
        </p>
        <p>
          {
            (stats)?(
              <b>Printer queue: {stats.printer_queue}</b>
            ):(null)
          }
        </p>
        {
          (lastUpdateText)?(
            <p>
              <b>Last server update: {lastUpdateText}</b>
            </p>
          ):(null)
        }
      </div>
    );
  }
}
