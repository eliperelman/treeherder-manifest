/* eslint-disable */

import { basename } from 'path';

export const manifests = [
  {
    manifest: 'dom/workers/test/serviceworkers/mochitest.ini',
    tests: [
      'test_bug1151916.html',
      'test_bug1240436.html',
      'test_claim.html',
      'test_claim_fetch.html',
      'test_claim_oninstall.html',
      'test_close.html',
      'test_controller.html',
      'test_cross_origin_url_after_redirect.html',
      'test_csp_upgrade-insecure_intercept.html',
      'test_empty_serviceworker.html',
      'test_error_reporting.html',
      'test_escapedSlashes.html',
      'test_eval_allowed.html',
      'test_eventsource_intercept.html',
      'test_fetch_event.html',
      'test_fetch_integrity.html',
      'test_file_blob_response.html',
      'test_file_blob_upload.html',
      'test_force_refresh.html',
      'test_gzip_redirect.html',
      'test_hsts_upgrade_intercept.html',
      'test_https_fetch.html',
      'test_https_fetch_cloned_response.html',
      'test_https_origin_after_redirect.html',
      'test_https_origin_after_redirect_cached.html',
      'test_https_synth_fetch_from_cached_sw.html',
      'test_imagecache.html',
      'test_imagecache_max_age.html',
    ],
  },
  {
    manifest: 'dom/indexedDB/test/mochitest.ini',
    tests: [
      'test_abort_deleted_index.html',
      'test_abort_deleted_objectStore.html',
      'test_add_put.html',
      'test_add_twice_failure.html',
      'test_advance.html',
      'test_autoIncrement.html',
      'test_autoIncrement_indexes.html',
      'test_bfcache.html',
      'test_blob_archive.html',
      'test_blob_file_backed.html',
      'test_blob_simple.html',
      'test_blob_worker_crash.html',
      'test_blob_worker_xhr_post.html',
      'test_blob_worker_xhr_post_multifile.html',
      'test_blob_worker_xhr_read.html',
      'test_blob_worker_xhr_read_slice.html',
      'test_blocked_order.html',
      'test_bug937006.html',
      'test_clear.html',
      'test_complex_keyPaths.html',
      'test_count.html',
      'test_create_index.html',
      'test_create_index_with_integer_keys.html',
      'test_create_objectStore.html',
      'test_cursor_mutation.html',
      'test_cursor_update_updates_indexes.html',
      'test_cursors.html',
      'test_database_onclose.html',
      'test_deleteDatabase.html',
      'test_deleteDatabase_interactions.html',
      'test_deleteDatabase_onblocked.html',
      'test_deleteDatabase_onblocked_duringVersionChange.html',
      'test_error_events_abort_transactions.html',
      'test_event_propagation.html',
      'test_event_source.html',
      'test_exceptions_in_events.html',
      'test_file_array.html',
      'test_file_cross_database_copying.html',
      'test_file_delete.html',
      'test_file_os_delete.html',
      'test_file_put_get_object.html',
      'test_file_put_get_values.html',
      'test_file_replace.html',
      'test_file_resurrection_delete.html',
      'test_file_resurrection_transaction_abort.html',
      'test_file_sharing.html',
      'test_file_transaction_abort.html',
      'test_filehandle_append_read_data.html',
      'test_filehandle_compat.html',
      'test_filehandle_disabled_pref.html',
      'test_filehandle_getFile.html',
      'test_filehandle_iteration.html',
      'test_filehandle_lifetimes.html',
      'test_filehandle_lifetimes_nested.html',
      'test_filehandle_location.html',
      'test_filehandle_ordering.html',
    ],
  },
  {
    manifest: 'dom/media/mediasource/test/mochitest.ini',
    tests: [
      'test_AudioChange_mp4.html',
      'test_AutoRevocation.html',
      'test_BufferedSeek.html',
      'test_BufferedSeek_mp4.html',
      'test_BufferingWait.html',
      'test_BufferingWait_mp4.html',
      'test_DrainOnMissingData_mp4.html',
      'test_DurationChange.html',
      'test_DurationUpdated.html',
      'test_DurationUpdated_mp4.html',
      'test_EndedEvent.html',
      'test_EndOfStream.html',
      'test_EndOfStream_mp4.html',
      'test_Eviction_mp4.html',
      'test_FrameSelection.html',
      'test_FrameSelection_mp4.html',
      'test_HaveMetadataUnbufferedSeek.html',
      'test_HaveMetadataUnbufferedSeek_mp4.html',
      'test_LiveSeekable.html',
    ],
  },
  {
    manifest: 'dom/performance/tests/mochitest.ini',
    tests: [
      'test_performance_observer.html',
      'test_performance_user_timing.html',
      'test_worker_user_timing.html',
      'test_worker_observer.html',
      'test_sharedWorker_performance_user_timing.html',
      'test_worker_performance_now.html',
      'test_timeOrigin.html',
    ],
  },
  {
    manifest: 'dom/promise/tests/mochitest.ini',
    tests: [
      'test_bug883683.html',
      'test_promise.html',
      'test_promise_uncatchable_exception.html',
      'test_promise_utils.html',
      'test_resolve.html',
      'test_resolver_return_value.html',
      'test_thenable_vs_promise_ordering.html',
      'test_promise_and_timeout_ordering.html',
      'test_promise_and_timeout_ordering_workers.html',
      'test_species_getter.html',
      'test_webassembly_compile.html',
      'test_promise_argument.html',
      'test_promise_callback_retval.html',
    ],
  },
  {
    manifest: 'dom/workers/test/serviceworkers/chrome.ini',
    tests: [
      'test_privateBrowsing.html',
      'test_serviceworkerinfo.xul',
      'test_serviceworkermanager.xul',
      'test_serviceworkerregistrationinfo.xul',
    ],
  },
  {
    manifest: 'accessible/tests/mochitest/a11y.ini',
    tests: [
      'test_aria_token_attrs.html',
      'test_bug420863.html',
      'test_descr.html',
      'test_nsIAccessibleDocument.html',
      'test_nsIAccessibleImage.html',
      'test_OuterDocAccessible.html',
    ],
  },
]
.map(item => {
  const count = item.tests.length;
  const passing = Math.floor(Math.random() * (count + 1));
  const failing = Math.floor(Math.random() * (count - passing));
  const running = count - passing - failing;
  const manifestBase = basename(item.manifest, '.ini');

  return {
    manifest: item.manifest,
    suite: `mochitest-${manifestBase === 'mochitest' ? 'plain' : manifestBase}`,
    tests: item.tests.map(t => item.manifest.replace(`${manifestBase}.ini`, t)),
    passing,
    failing,
    running,
  };
});

export const statuses = ['Success', 'Failed', 'Pending', 'Not Running'];

function normalizeTests(tests) {
  return tests.map(test => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      test,
      status,
      infra: status === 'Failed' ? Math.floor(Math.random() * 100) % 2 === 0 : false,
      intermittent: status === 'Failed' ? Math.floor(Math.random() * 100) % 2 === 0 : false,
    };
  });
}

function sortTests(tests) {
  return tests.sort((a, b) => {
    if (a.status < b.status) {
      return -1;
    } else if (a.status > b.status) {
      return 1;
    }

    return 0;
  });
}

export const tests = sortTests(normalizeTests(manifests
  .reduce((acc, manifest) => [...acc, ...manifest.tests], [])));

export const suites = manifests.reduce((acc, manifest) => {
  if (!acc[manifest.suite]) {
    acc[manifest.suite] = [];
  }

  const tests = acc[manifest.suite];

  tests.push(...normalizeTests(manifest.tests));
  acc[manifest.suite] = sortTests(tests);

  return acc;
}, {});

export const platforms = [
  { name: 'Linux x64 debug' },
  { name: 'Linux x64 opt' },
  { name: 'Linux x64 PGO' },
  { name: 'Linux x64 ASAN' },
  { name: 'Linux x64 Hazard' },
  { name: 'Linux x64 ???' },
  { name: 'Linux x32 debug' },
  { name: 'Linux x32 opt' },
  { name: 'Linux x32 PGO' },
  { name: 'Android 4.0 API15+ debug' },
  { name: 'Android 4.0 API15+ opt' },
  { name: 'Windows 7 opt' },
  { name: 'Windows 7 debug' },
  { name: 'Windows 8 opt' },
  { name: 'Windows 8 debug' },
  { name: 'Windows 10 opt' },
  { name: 'Windows 10 debug' },
  { name: 'macOS opt' },
  { name: 'macOS debug' },
  { name: 'Signing' },
  { name: 'l10n' },
  { name: 'talos' },
];

const status = manifests.reduce((acc, item) => {
  const update = { ...acc };

  if (item.failing) {
    update.failing = true;
  }

  if (item.running) {
    update.running = true;
  }

  return update;
}, { failing: false, running: false });

let buildState = 'Finished successfully';
let color = 'success';

if (status.running) {
  if (status.failing) {
    buildState = 'Running with failures';
    color = 'warning';
  } else {
    buildState = 'Running';
    color = 'info';
  }
} else if (status.failing) {
  buildState = 'Finished with failures';
  color = 'danger';
}

export const buildStatus = { color, state: buildState };

export const counts = tests.reduce((counter, test) => {
  counter[test.status] += 1; // eslint-disable-line no-param-reassign
  return counter;
}, { Success: 0, Failed: 0, Pending: 0, 'Not Running': 0 });

export const colors = {
  Success: 'success',
  Failed: 'danger',
  Pending: 'info',
  'Not Running': 'default',
};

export const author = 'user@mozilla.com';
export const revision = '03f5f083bdc0';
export const user = 'user@mozilla.com';
