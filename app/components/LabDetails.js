import React, { PropTypes, Component } from 'react';
import style from './LabDetails.css';
import ComputerMenu from './ComputerMenu.js';
import moment from 'moment';
import {
  Tooltip,
} from 'react-tippy';

const labColors = {
  2041: 'red',
  2042: 'pink',
  2043: 'orange',
  2044: 'brown',
  2045: 'yellow',
  3041: 'khaki',
  3042: 'green',
  3043: 'cyan',
  3044: 'blue',
  3045: 'violet' 
};

export default class SingleLabView extends Component {

  render() {
    
    const {labNo, labPlan, labStats} = this.props;
    
    let nextCurrentSubjText = 'Next';
    let isSubjectCurrentlyInside = false;
    
    if(labPlan.start) {
      const courseStartMoment = moment(labPlan.start, "HH:mm");
      const courseEndMoment = moment(labPlan.end, "HH:mm");
      if(courseStartMoment.isSameOrBefore() && courseEndMoment.isSameOrAfter()) {
        nextCurrentSubjText = 'Current';
        isSubjectCurrentlyInside = true;
      }
    }
    
    const computerIconsNodes = (labStats.computers || []).map((computer) => {
      let classNames = style.labCompIcon;
      
      if(computer.state == 'off') {
        classNames += ' '+style.off;
      } else if(computer.user == null) {
        classNames += ' '+style.on;
      } else {
        classNames += ' '+style.used;
      }
      
      return (
        <div key={computer.name} className={classNames}>
          <div onClick={function(){
            //chrome.runtime.sendMessage({type:'request-ssh-login'});
          }} className={style.computerNo}>
            <Tooltip
              position="bottom"
              trigger="mouseenter"
              theme="light"
              html={<ComputerMenu labNo={labNo} computer={computer}/>}
              zIndex={999999999999}
              interactive={false}
              animateFill={false}
            >
              {parseInt(computer.name.replace(labColors[labNo], ''))}
            </Tooltip>
          </div>
        </div>
      )
    });
    
    return (
      <div className={style.labDetails}>
        <h1>
          Lab {labNo}
        </h1>
        <h2 className={style['lab'+labNo]}>
          {'('+labColors[labNo]+')'}
        </h2>
        <ul>
          {
            (isSubjectCurrentlyInside)?(
              <li className={style.labUsedMessage}>Used by course group now.</li>
            ):(
              <li>
                <b>Free computers: {labStats.freeCount}/{labStats.computers.length}</b>
              </li>
            )
          }
          {
            (labPlan.start)?(
              <li>{nextCurrentSubjText} subject:
                <b>{labPlan.subjectName}</b>
              </li>
            ):(null)
          }
          {
            (labPlan.start)?(<li>{labPlan.start} - {labPlan.end}</li>):(null)
          }
        </ul>
        <figure className={style.labCompIcons}>
          {computerIconsNodes}
        </figure>
      </div>
    );
  }
}
