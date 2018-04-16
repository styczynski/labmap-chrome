function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

function setBadge(labData) {
  if (chrome.browserAction) {
    if(labData) {
      if(labData.totalFreeComputers !== null && labData.totalFreeComputers !== undefined) {
        chrome.browserAction.setBadgeText({ text: labData.totalFreeComputers+'' });
      }
    }
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      if(!state.dataEvents.plan.fetchInProgress) {
        saveState(state);
      }
      setBadge(state.dataEvents.labData);
    });
    return store;
  };
}
