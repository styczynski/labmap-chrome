import * as types from '../constants/ActionTypes';

export function fetchState() {
  return {
    type: types.FETCH_STATE
  };
}

export function updateFetchedState(data) {
  return {
    type: types.FETCHED_STATE,
    data
  };
}

export function receivedLabDataUpdate(labNo, data) {  
  return {
    type: types.LAB_DATA_RECEIVED,
    labNo,
    data
  };
}

export function receivedPlanUpdate(labNo, data) {  
  return {
    type: types.PLAN_DATA_RECEIVED,
    labNo,
    data
  };
}

export function receivedStatsUpdate(data) {  
  return {
    type: types.STATS_RECEIVED,
    data
  };
}

export function changeSSHLogin(login) {  
  return {
    type: types.SSH_LOGIN_CHANGED,
    login
  };
}

export function requestPlanUpdate(labNo) {
  return function(dispatch){
    console.log("Ping API PLAN LAB = "+labNo);
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            dispatch(receivedPlanUpdate(
              labNo,
              JSON.parse(xmlHttp.responseText)
            ));
        }
    }
    xmlHttp.open('GET', 'http://students.mimuw.edu.pl/~ps386038/labmap_proxy/plan.php?no='+labNo, true); 
    xmlHttp.send(null);
  };
}

export function requestLabDataUpdate(labNo) {
  return function(dispatch){
    console.log("Ping API LAB = "+labNo);
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            dispatch(receivedLabDataUpdate(
              labNo,
              JSON.parse(xmlHttp.responseText).data
            ));
        }
    }
    xmlHttp.open('GET', 'http://students.mimuw.edu.pl/~ps386038/labmap_proxy/lab.php?no='+labNo, true); 
    xmlHttp.send(null);
  
  };
}

export function requestStatsUpdate() {
  return function(dispatch){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            dispatch(receivedStatsUpdate(
              JSON.parse(xmlHttp.responseText)
            ));
        }
    }
    xmlHttp.open('GET', 'http://students.mimuw.edu.pl/~ps386038/labmap_proxy/stat.php', true); 
    xmlHttp.send(null);
  
  };
}
