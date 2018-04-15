import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import LoginTerminal from '../components/LoginTerminal';
import * as DataEventsActions from '../actions/dataEvents';
import style from './App.css';

@connect(
  state => ({
    labData: state.dataEvents.labData,
    plan: state.dataEvents.plan
  }),
  dispatch => ({
    actions: bindActionCreators(DataEventsActions, dispatch)
  })
)
export default class App extends Component {

  render() {
    const { labData, plan, actions } = this.props;
    return (
      <div className={style.normal}>
        <Header/>
        {
          (window.SSH_LOGIN_MODE === true)?(
            <LoginTerminal labData={labData} plan={plan} actions={actions} />
          ):(
            <MainSection labData={labData} plan={plan} actions={actions} />
          )
        }
      </div>
    );
  }
}
