import React from 'react';
import { Navbar, Nav, Badge } from 'reactstrap';
import Icon from 'react-fontawesome';
import { connect } from 'react-redux';

const mapStateToProps = ({ push, suites }) => {
  const { revision } = push.push;

  return {
    counts: suites.counts,
    push: {
      revision: revision && revision.substring(0, 12),
      author: push.push.author,
    },
  };
};

const StatusNavbar = props => (
  <Navbar toggleable>
    <Nav className="mr-auto" navbar>
      <span className="navbar-text">
        <Icon name="code" /> Revision <code className="push-revision">{props.push.revision}</code>
      </span>

      <span className="navbar-text">
        <span className="hidden-sm-down">&mdash;&nbsp;&nbsp;&nbsp;</span>
        <Icon name="id-card-o" /> Author <code>{props.push.author}</code>
      </span>
    </Nav>

    <span className="navbar-text">
      <Badge color="danger">{props.counts.failed} Failed Tests</Badge>
    </span>

    <span className="navbar-text">
      <Badge color="success">{props.counts.success} Successful Jobs</Badge>
    </span>

    <span className="navbar-text">
      <Badge color="info">{props.counts.running} Running Jobs</Badge>
    </span>

    <span className="navbar-text">
      <Badge>{props.counts.pending} Pending Jobs</Badge>
    </span>
  </Navbar>
);

export default connect(mapStateToProps)(StatusNavbar);
