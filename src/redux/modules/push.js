export const types = {
  FETCH_PUSH: 'FETCH_PUSH',
  RENDER_PUSH: 'RENDER_PUSH',
};

const host = 'https://treeherder.allizom.org/api/project/mozilla-inbound/resultset';

export const actions = {
  updatePush: (pushId = 0) => ({
    type: types.FETCH_PUSH,
    meta: {
      type: 'api',
      url: `${host}/${pushId}/`,
      method: 'GET',
    },
  }),
};

const initialState = { push: {} };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RENDER_PUSH:
      return {
        ...state,
        push: action.payload.push,
      };
    default:
      return state;
  }
};
