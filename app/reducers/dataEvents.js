import * as ActionTypes from '../constants/ActionTypes';
import {requestLabDataUpdate} from '../actions/dataEvents.js';
import moment from 'moment';

const initialState = {
  plan: {
    lastUpdateTimestamp: 0,
    fetchInProgress: true
  },
  labData: {
    data: {}
  }
};

const recalculateGlobalStats = (state) => {
  let totalFreeComputers = 0;
  Object.keys(state.labData.data).forEach((labNo) => {
    const lab = state.labData.data[labNo];
    let isSubjectCurrentlyInside = false;
    
    if(state.plan[labNo]) {
      const courseStartMoment = moment(state.plan[labNo].start, "HH:mm");
      const courseEndMoment = moment(state.plan[labNo].end, "HH:mm");
      
      if(courseStartMoment.isSameOrBefore() && courseEndMoment.isSameOrAfter()) {
        isSubjectCurrentlyInside = true;
      }
    }
    
    if(!isSubjectCurrentlyInside) {
      totalFreeComputers += lab.freeCount || 0;
    }
  });
  state.plan.lastUpdateTimestamp = (+new Date());
  state.labData.totalFreeComputers = totalFreeComputers;
  return state;
};

const actionsMap = {
  [ActionTypes.LAB_DATA_RECEIVED](state, action) {
    
    const freeMachines = action.data.computers.filter((computer) => !computer.user || !computer.state);
    
    const currentData = state.labData.data;
    return recalculateGlobalStats({
      ...state,
      labData: {
        data: {
          [action.labNo]: {
            computers: action.data.computers,
            freeCount: freeMachines.length,
            freeComputers: freeMachines
          },
          ...currentData
        }
      }
    });
  },
  [ActionTypes.PLAN_DATA_RECEIVED](state, action) {
    return recalculateGlobalStats({
      ...state,
      plan: {
        ...state.plan,
        [action.labNo]: action.data
      }
    });
  },
  [ActionTypes.STATS_RECEIVED](state, action) {
    return recalculateGlobalStats({
      ...state,
      plan: {
        ...state.plan,
        stats: action.data
      }
    });
  },
  [ActionTypes.LAB_DATA_REQUESTED](state, action) {
    return state;
  },
  [ActionTypes.PLAN_DATA_REQUESTED](state, action) {
    return state;
  },
  [ActionTypes.STATS_REQUESTED](state, action) {
    return state;
  },
  [ActionTypes.FETCHED_STATE](state, action) {
    if(!action.data) return state;
    if(!action.data.plan) {
      action.data.plan = {}
    }
    if(!action.data.plan.lastUpdateTimestamp) {
      action.data.plan.lastUpdateTimestamp = 1;
    }
    return {
      ...initialState,
      ...action.data,
      plan: {
        ...action.data.plan,
        fetchInProgress: false
      }
    };
  },
  [ActionTypes.FETCH_STATE](state, action) {
    return {
      ...state,
      plan: {
        ...state.plan,
        fetchInProgress: true
      }
    }
  },
  [ActionTypes.SSH_LOGIN_CHANGED](state, action) {
    return {
      ...state,
      plan: {
        sshLogin: action.login
      }
    }
  },
};

export default function dataEvents(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
