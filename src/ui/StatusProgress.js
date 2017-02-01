import React from 'react';
import { Progress } from 'reactstrap';
import { counts, tests } from '../mock';

const StatusProgress = () => (
  <Progress multi>
    <Progress bar color="success" value={(counts.Success / tests.length) * 100} />
    <Progress bar color="danger" value={(counts.Failed / tests.length) * 100} />
    <Progress bar color="info" value={(counts.Pending / tests.length) * 100} striped />
    <Progress bar color="default" value={(counts['Not Running'] / tests.length) * 100} />
  </Progress>
);

export default StatusProgress;
