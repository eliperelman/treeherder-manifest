import React from 'react';
import { Navbar, Nav, Badge } from 'reactstrap';
import Icon from 'react-fontawesome';
import { revision, author, tests } from '../mock';

const counts = tests.reduce((counter, test) => {
  counter[test.status] += 1; // eslint-disable-line no-param-reassign
  return counter;
}, { Success: 0, Failed: 0, Pending: 0, 'Not Running': 0 });

const StatusNavbar = () => (
  <Navbar toggleable>
    <Nav className="mr-auto" navbar>
      <span className="navbar-text">
        <Icon name="code" /> Revision <code>{revision}</code>
      </span>

      <span className="navbar-text">
        <span className="hidden-sm-down">&mdash;&nbsp;&nbsp;&nbsp;</span>
        <Icon name="id-card-o" /> Author <code>{author}</code>
      </span>
    </Nav>

    <span className="navbar-text">
      <Badge color="success">{counts.Success} Successful</Badge>
    </span>

    <span className="navbar-text">
      <Badge color="danger">{counts.Failed} Failed</Badge>
    </span>

    <span className="navbar-text">
      <Badge color="info">{counts.Pending} Pending</Badge>
    </span>

    <span className="navbar-text">
      <Badge>{counts['Not Running']} Not Running</Badge>
    </span>
  </Navbar>
);

export default StatusNavbar;
