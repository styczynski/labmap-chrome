import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainSection from '../components/MainSection';
import LoginTerminal from '../components/LoginTerminal';
import StatsView from '../components/StatsView';
import * as DataEventsActions from '../actions/dataEvents';
import style from './App.css';

@connect(
  state => ({
    labData: state.dataEvents.labData,
    plan: state.dataEvents.plan,
    lastUpdateTimestamp: state.dataEvents.plan.lastUpdateTimestamp
  }),
  dispatch => ({
    actions: bindActionCreators(DataEventsActions, dispatch)
  })
)
export default class App extends Component {

  componentWillMount() {
    const { labData, plan, actions } = this.props;
 
    actions.fetchState();
    chrome.storage.local.get('state', (obj) => {
      try {
        const state = JSON.parse(obj.state).dataEvents;
        console.log(state);
        actions.updateFetchedState(state);
      } catch(e) {
        actions.updateFetchedState({});
      }
    });
  }

  render() {
    const { labData, plan, lastUpdateTimestamp, actions } = this.props;
    
    return (
      <div className={style.normal}>
        <Header/>
        {
          (window.SSH_LOGIN_MODE === true)?(null):(
            <StatsView actions={actions} plan={plan}/>
          )
        }
        {
          (window.SSH_LOGIN_MODE === true)?(
            <LoginTerminal labData={labData} plan={plan} actions={actions} />
          ):(
            <MainSection
              labData={labData}
              plan={plan}
              lastUpdateTimestamp={lastUpdateTimestamp}
              actions={actions} />
          )
        }
        <Footer />
      </div>
    );
  }
}
