export const types = {
  FETCH_PUSH: 'FETCH_PUSH',
  RENDER_PUSH: 'RENDER_PUSH',

};
// TODO: When this app is part of Treeherder, we can get this from the
// router / URL
const treeherder = 'https://treeherder.allizom.org';

export const actions = {
  updatePush: (repo, revision) => ({
    type: types.FETCH_PUSH,
    meta: {
      type: 'api',
      url: `${treeherder}/api/project/${repo}/resultset/?revision=${revision}`,
      method: 'GET',
      repo,
      revision,
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
        treeherder,
      };
    default:
      return state;
  }
};
