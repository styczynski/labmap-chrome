import React, { Component, PropTypes } from 'react';
import style from './MainSection.css';
import LabsView from './LabsView.js';

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    
    const {actions, plan, labData} = this.props;
    return (
      <section className={style.main}>
        <LabsView actions={actions} plan={plan} labData={labData}/>
      </section>
    );
  }
}
