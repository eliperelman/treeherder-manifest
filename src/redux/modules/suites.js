export const types = {
  FETCH_TESTS: 'FETCH_TESTS',
  RENDER_TESTS: 'RENDER_TESTS',
  FILTER_TESTS: 'FILTER_TESTS',
  RENDER_FILTERED_TESTS: 'RENDER_FILTERED_TESTS',
};

// TODO: When this app is part of Treeherder, we can get this from the
// router / URL
const treeherder = 'https://treeherder.allizom.org';
const title = 'artifact%20uploaded';
const value = 'mochitest-gl_errorsummary.log';
// const value = 'plain-chunked_errorsummary.log';

export const actions = {
  updateTests: (repo, pushId) => ({
    type: types.FETCH_TESTS,
    meta: {
      type: 'api',
      url: `${treeherder}/api/jobdetail/?push_id=${pushId}&title=${title}&value=${value}`,
      countsUrl: `${treeherder}/api/project/${repo}/resultset/${pushId}/status/`,
      method: 'GET',
    },
  }),
  filterTests: (filter, suites, fulltext) => ({
    type: types.FILTER_TESTS,
    meta: {
      filter,
      suites,
      fulltext,
    },
  }),
};

const initialState = {
  suites: {},
  rowData: {},
  fulltext: {},
  counts: { Failed: 0, Successful: 0, Pending: 0, 'Not Running': 0 },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RENDER_TESTS:
      return {
        ...state,
        suites: action.payload.suites,
        counts: action.payload.counts,
        fulltext: action.payload.fulltext,
        rowData: action.payload.rowData,
      };
    case types.RENDER_FILTERED_TESTS:
      return {
        ...state,
        rowData: action.payload.rowData,
      };
    default:
      return state;
  }
};
