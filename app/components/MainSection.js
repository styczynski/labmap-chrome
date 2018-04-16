import React, { Component, PropTypes } from 'react';
import style from './MainSection.css';
import LabsView from './LabsView.js';
import UsersTable from './UsersTable.js';

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    
    const {actions, plan, lastUpdateTimestamp, labData} = this.props;
    return (
      <section className={style.main}>
        <LabsView
          actions={actions}
          plan={plan}
          labData={labData}
          lastUpdateTimestamp={lastUpdateTimestamp}
        />
        <UsersTable
          actions={actions}
          plan={plan}
          labData={labData}
          lastUpdateTimestamp={lastUpdateTimestamp}
        />
      </section>
    );
  }
}
