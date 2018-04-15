import * as types from '../constants/ActionTypes';

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

export function requestPlanUpdate(labNo) {
  return function(dispatch){
    console.log("Ping API PLAN LAB = "+labNo);
    
    let mockedData = {};
    
    if(labNo == 2045) {
      mockedData = {
        "lab": 2045,
        "subjectName": "ASD",
        "start": "15:00",
        "end": "17:15"
      };
    } else if(labNo == 3045){
      mockedData = {
        "lab": 3045,
        "subjectName": "RPIS",
        "start": "10:00",
        "end": "19:15"
      };
    }
    dispatch(receivedPlanUpdate(labNo, mockedData));
  };
}

export function requestLabDataUpdate(labNo) {
  return function(dispatch){
    console.log("Ping API LAB = "+labNo);
    
    /*var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            dispatch(receivedLabDataUpdate(
              JSON.parse(xmlHttp.responseText)
            ));
        }
    }*/
    //xmlHttp.open('GET', 'http://students.mimuw.edu.pl/~tm385898/labmap/api/rooms/'+labNo, true); 
    //xmlHttp.open('GET', 'http://students.mimuw.edu.pl/~ps386038/JSON_TEST/test.php', true); 
    //xmlHttp.send(null);
    
    const mockedData = {"code":200,"message":"Success.","data":{"color":"red","computers":[{"name":"red00","state":"off","user":null},{"name":"red01","state":"off","user":null},{"name":"red02","state":"off","user":null},{"name":"red03","state":"off","user":null},{"name":"red04","state":"off","user":null},{"name":"red05","state":"off","user":null},{"name":"red06","state":"off","user":null},{"name":"red07","state":"off","user":null},{"name":"red08","state":"off","user":null},{"name":"red09","state":"off","user":null},{"name":"red10","state":"off","user":null},{"name":"red11","state":"off","user":null},{"name":"red12","state":"off","user":null},{"name":"red13","state":"off","user":null},{"name":"red14","state":"off","user":null},{"name":"red15","state":"off","user":null}]}};
    dispatch(receivedLabDataUpdate(labNo, mockedData.data));
  
  
  };
}
