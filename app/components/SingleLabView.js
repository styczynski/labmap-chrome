import React, { PropTypes, Component } from 'react';
import style from './SingleLabView.css';
import LabDetails from './LabDetails.js';
import moment from 'moment';
import {
  Tooltip,
} from 'react-tippy';

export default class SingleLabView extends Component {

  render() {
    
    let plan = this.props.plan || {};
    let labData = this.props.labData || {};
    const labNo = this.props.labNo;
     
    let labStats = (labData.data || {})[labNo] || {};
    let labPlan = plan[labNo] || {};
    
    let labTimeToNextCourse = '';
    let labFreeStandsCount = labStats.freeCount || '';
    let labClassNames = '?';
    let isSubjectCurrentlyInside = false;
    
    if(labPlan.start) {
      const courseStartMoment = moment(labPlan.start, "HH:mm");
      const courseEndMoment = moment(labPlan.end, "HH:mm");
      
      labTimeToNextCourse = courseStartMoment.fromNow();
      if(courseStartMoment.isSameOrBefore() && courseEndMoment.isSameOrAfter()) {
        isSubjectCurrentlyInside = true;
      }
    }
    
    let labelNodes = [];
    if(labTimeToNextCourse !== '' && !isSubjectCurrentlyInside) {
      labelNodes.push(
        <div key='next-course-time-label' className={style.labTimeBadge}>{labTimeToNextCourse}</div>
      );
    }
    
    if(labFreeStandsCount !== '' && !isSubjectCurrentlyInside) {
      labelNodes.push(
        <div key='stands-count-label' className={style.labStandsBadge}>{labFreeStandsCount}</div>
      );
    }
    
    if(isSubjectCurrentlyInside) {
      
      const courseEndMoment = moment(labPlan.end, "HH:mm");
      if(labPlan.subjectName.trim().length > 0) {
        labelNodes.push(
          <div key='is-used-label' className={style.labIsUsedBadge}>{labPlan.subjectName}</div>
        );
      }
      labelNodes.push(
        <div key='is-used-time-label' className={style.labIsUsedTimeBadge}>{courseEndMoment.fromNow()}</div>
      );
    }
    
    switch(labNo) {
      case 2041: case 3041:
        labClassNames = style.labRight;
        break;
      case 2042: case 3042:
        labClassNames = style.labUpperRight;
        break;
      case 2043: case 3043:
        labClassNames = style.labUpper;
        break;
      case 2044: case 3044:
        labClassNames = style.labUpperLeft;
        break;
      case 2045: case 3045:
        labClassNames = style.labLeft;
        break;
    }
    
    labClassNames += ' ' + style.lab + ' ' + style['lab'+labNo];
    
    if(isSubjectCurrentlyInside) {
      labClassNames += ' ' + style.labUsed;
    }
    
    return (
      <Tooltip
        position="bottom"
        trigger="click"
        theme="light"
        html={<LabDetails labNo={labNo} labPlan={labPlan} labStats={labStats}/>}
        className={style.tooltip}
        zIndex={999999999999}
        interactive={true}
        animateFill={false}
      >
          <div className={labClassNames}>
            <div className={style.labLabel}>{labNo}</div>
            {labelNodes}
          </div>
      </Tooltip>
    );
  }
}
