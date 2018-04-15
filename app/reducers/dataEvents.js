import * as ActionTypes from '../constants/ActionTypes';
import {requestLabDataUpdate} from '../actions/dataEvents.js';

const initialState = {
  plan: {},
  labData: {
    data: {}
  }
};

const actionsMap = {
  [ActionTypes.LAB_DATA_RECEIVED](state, action) {
    
    const freeMachines = action.data.computers.filter((computer) => !computer.user || !computer.state);
    
    let totalFreeComputers = freeMachines.length || 0;
    Object.keys(state.labData.data).forEach((labNo) => {
      const lab = state.labData.data[labNo];
      if(labNo != action.labNo) {
        totalFreeComputers += lab.freeCount || 0;
      }
    });
    
    const currentData = state.labData.data;
    return {
      ...state,
      labData: {
        totalFreeComputers,
        data: {
          [action.labNo]: {
            computers: action.data.computers,
            freeCount: freeMachines.length,
            freeComputers: freeMachines
          },
          ...currentData
        }
      }
    };
  },
  [ActionTypes.PLAN_DATA_RECEIVED](state, action) {
    return {
      ...state,
      plan: {
        ...state.plan,
        [action.labNo]: action.data
      }
    };
  },
  [ActionTypes.LAB_DATA_REQUESTED](state, action) {
    return state;
  },
  [ActionTypes.PLAN_DATA_REQUESTED](state, action) {
    return state;
  },
  
};

export default function dataEvents(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
