import React, { PropTypes, Component } from 'react';
import style from './LabsView.css';
import SingleLabView from './SingleLabView.js';

const labsFloor1 = [2041, 2042, 2043, 2044, 2045];
const labsFloor2 = [3041, 3042, 3043, 3044, 3045];

export default class LabsView extends Component {

  componentDidMount() {
    const {actions, labData} = this.props;
    
    labsFloor1.concat(labsFloor2).forEach((lab) => {
      actions.requestLabDataUpdate(lab);
      actions.requestPlanUpdate(lab);
    });
  }

  render() {
    
    const {actions, plan, labData} = this.props;
    
    return (
      <figure>
        <div className={style.floor1} >
          {
            labsFloor1.map((labNo) => {
              return (
                <SingleLabView key={'lab'+labNo} plan={plan} labData={labData} labNo={labNo} />
              )
            })
          }
        </div>
        <div className={style.floor2} >
          {
            labsFloor2.map((labNo) => {
              return (
                <SingleLabView key={'lab'+labNo} plan={plan} labData={labData} labNo={labNo} />
              )
            })
          }
        </div>
      </figure>
    );
  }
}
