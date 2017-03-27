import {
  createStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} from 'redux';
import * as suitesStore from './modules/suites';
import * as pushStore from './modules/push';

// ETL Layer
/**
 * Transform failures to an object with the key being the name
 * of the suite (manifest).
 *
 * If two failures have the same ``test`` value, with a different subtest, we will only
 * show one listing entry.
 */
function transform(suites, failures, jobId) {
  if (!failures.length) {
    return {};
  }

  const testMap = failures.reduce((acc, failure) => ({
    ...acc,
    [failure.test]: failure,
  }), {});

  // Create the set of suites the UI will render.
  // Match each failure to the a test from the list of all tests to find
  // out which manifest it belongs to.
  // ``suiteName`` here usually refers to the name of a "Manifest": A
  // collection of test files.

  // These objects are in the shape of:
  //   suites = {manifest: [test1, test2]}
  //   testMap = {test1: failure, test2, failure}
  //   return value: {manifest: [failure1, failure2]}

  return Object
    .entries(suites)
    .reduce((uiSuites, [suiteName, tests]) => {
      // walk the list of tests in each suite looking for a matching failed test
      const uiFailures = tests.reduce((suiteFailures, test) => (
        testMap[test] ? [...suiteFailures, {
          infra: false,
          intermittent: false,
          status: 'Failed',
          test,
          jobId,
        },
        ] : suiteFailures), []);

      if (uiFailures.length) {
        // eslint-disable-next-line no-param-reassign
        uiSuites[suiteName] = [...uiFailures, ...uiSuites[suiteName] || []];
      }

      return uiSuites;
    }, {});
}

function getErrorLines(text, jobId) {
  const lines = text.split('\n');

  if (lines.length < 2) {
    return {};
  }

  // Ensure jsonLines only has valid values, with no empty lines
  // (in case there were extraneous newlines).
  const jsonLines = lines.reduce((linesAcc, line) => (
    line ? [...linesAcc, JSON.parse(line)] : linesAcc), []);
  const failures = jsonLines.length > 1 ? jsonLines.slice(1) : [];

  return transform(jsonLines[0].tests, failures, jobId);
}

function fullText(item) {
  if (typeof item === 'string') {
    return item;
  } else if (Array.isArray(item)) {
    return item.join(' ');
  }

  return Object
    .values(item)
    .reduce((acc, value) => `${acc} ${fullText(value)}`, '');
}

async function fetchPush(store, fetchOptions) {
  const { url } = fetchOptions;
  const response = await fetch(url, fetchOptions);
  const json = await response.json();
  const [push] = json.results;

  // render the push data
  store.dispatch({
    type: pushStore.types.RENDER_PUSH,
    payload: { push },
  });
  // now fetch the test data for this push
  store.dispatch(suitesStore.actions.updateTests(fetchOptions.repo, push.id));
}

async function fetchTests(store, fetchOptions) {
  // Will need to create a timer to re-fetch this at intervals.
  const { url, countsUrl } = fetchOptions;
  const response = await fetch(url, fetchOptions);
  const jobDetails = await response.json();
  // Here the json is the job_detail result.
  // We need to take each entry and query for the errorsummary.log
  // then take those and make an object out of it.
  const logs = await Promise
    .all(jobDetails.results.map(res => res.url)
    .map(logUrl => fetch(logUrl)));
  // We now have each of the error summaries.  Convert them to error lines.
  const textLogResults = await Promise.all(logs.map((log, idx) => log.text()
      .then(item => getErrorLines(item, jobDetails.results[idx].job_id))));
  // Convert the error lines to an object that the UI can display.
  const suites = textLogResults.reduce((suiteAcc, result) => Object
    .entries(result)
    .reduce((acc, [suiteName, tests]) => ({
      ...acc,
      [suiteName]: [...acc[suiteName], ...tests],
    }), suiteAcc));
  const fulltext = Object
    .entries(suites)
    .reduce((ftext, [key, value]) => ({ ...ftext, [key]: value.map(fullText) }), {});
  // Tabulate the counts
  const pushStatusResp = await fetch(countsUrl, fetchOptions);
  const pushStatus = await pushStatusResp.json();
  // We use most of the counts from the push status, but ``failed`` will be a count of
  // the "tests" rather than jobs.  So we walk each suite(manifest) and count the failed tests.
  // Note: this is in contrast to the "testfailed" entry coming from pushStatus.  Those are jobs.
  const counts = {
    failed: Object.values(suites).reduce((acc, suite) => acc + suite.length, 0),
    success: 0,
    pending: 0,
    running: 0,
    ...pushStatus,
  };

  // Dispatch an action that causes the UI to re-render with the new state.
  store.dispatch({
    type: suitesStore.types.RENDER_TESTS,
    payload: {
      suites,
      counts,
      fulltext,
      rowData: suites,
    },
  });
}

function filterTests(store, { filter, suites, fulltext }) {
  const rowData = !filter ?
    suites :
    Object
      .keys(suites)
      .reduce((rows, key) => ({
        ...rows,
        [key]: suites[key]
          .filter((item, index) => new RegExp(filter, 'i')
            .test(fulltext[key][index])),
      }), {});

  store.dispatch({
    type: suitesStore.types.RENDER_FILTERED_TESTS,
    payload: { rowData },
  });
}

const testDataMiddleware = store => next => action => {
  if (!action.meta) {
    return next(action);
  }

  const consumed = { ...action };
  delete consumed.meta;

  switch (action.type) {
    case suitesStore.types.FETCH_TESTS:
      fetchTests(store, { ...action.meta });
      return next(consumed);
    case suitesStore.types.FILTER_TESTS:
      filterTests(store, { ...action.meta });
      return next(consumed);
    case pushStore.types.FETCH_PUSH:
      fetchPush(store, { ...action.meta });
      return next(consumed);
    default:
      break;
  }

  return next(action);
};

export const configureStore = () => {
  const reducer = combineReducers({
    suites: suitesStore.reducer,
    push: pushStore.reducer,
  });
  const store = createStore(
    reducer,
    applyMiddleware(testDataMiddleware)
  );
  const actions = {
    suites: bindActionCreators(suitesStore.actions, store.dispatch),
    push: bindActionCreators(pushStore.actions, store.dispatch),
  };

  return { store, actions };
};

export default configureStore;
