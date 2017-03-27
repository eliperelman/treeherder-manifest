import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Form, FormGroup, Input, Label, Row, Col, Table, Container } from 'reactstrap';
import Icon from 'react-fontawesome';
import StatusProgress from './StatusProgress';
import StatusNavbar from './StatusNavbar';
import { colors } from '../mock';
import { connect } from 'react-redux';
import { store, actions } from '../redux/store';

const mapStateToProps = ({ suites, push }) => ({
  rowData: suites.rowData,
  fulltext: suites.fulltext,
  suites: suites.suites,
  revision: push.push.revision,
  treeherder: push.treeherder,
  pushId: push.push.id,
});

export class Suites extends React.Component {
  componentDidMount() { // eslint-disable-line class-methods-use-this
    const params = new URLSearchParams(this.props.location.search);
    const repo = params.get('repo');
    const revision = params.get('revision');

    store.dispatch(actions.push.updatePush(repo, revision));

    // Update the tests every two minutes.
    this.testTimerId = setInterval(
      () => store.dispatch(actions.suites.updateTests(repo, this.props.pushId)),
      120000
    );
  }

  componentWillUnmount() {
    clearInterval(this.testTimerId);
  }

  filter(e) {
    const { suites, fulltext } = this.props;
    const { value } = e.target;

    store.dispatch(actions.suites.filterTests(value, suites, fulltext));
  }

  render() {
    return (
      <div>
        <StatusNavbar />
        <StatusProgress />
        <Container fluid style={{ marginBottom: '.5rem', marginTop: '5rem' }}>
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md={3} sm={12} xs={12} style={{ textAlign: 'right' }}>
                Known intermittent failure&nbsp;&nbsp;
                <Icon name="bug" style={{ color: '#d78236' }} /><br />
                Infrastructure issue&nbsp;&nbsp;
                <Icon name="chain-broken" style={{ color: '#db3737' }} />
              </Col>
              <Col md={6} sm={12} xs={12}>
                <FormGroup style={{ marginBottom: 0 }}>
                  <Label htmlFor="filter" hidden>Filter</Label>
                  <Input
                    style={{ borderRadius: '2rem' }}
                    type="text"
                    name="filter"
                    id="filter"
                    placeholder="Filter tests..."
                    onChange={e => this.filter(e)} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>

        <Table size="sm" responsive>
          <thead>
            <tr>
              <th key="status" style={{ paddingLeft: '1rem', textAlign: 'center' }}>Status</th>
              <th key="test">Test</th>
            </tr>
          </thead>
            {Object.keys(this.props.rowData).length ? Object.entries(this.props.rowData).map(([name, rows], tkey) => (
              <tbody key={tkey}>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  <td colSpan={4} style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                    <code style={{ color: '#000', backgroundColor: 'transparent' }}>
                      {name}
                    </code>
                  </td>
                </tr>
                {rows.map((item, key) => (
                  <tr key={key}>
                    <td style={{ minWidth: '8rem', fontSize: '1rem', textAlign: 'center', }}>
                      <Badge size="sm" color={colors[item.status]} style={{ fontWeight: 400, fontSize: '.8rem', margin: '0 .5rem' }}>
                        {item.status}
                      </Badge>
                      {item.intermittent && <Icon name="bug" style={{ color: '#d78236', verticalAlign: 'text-bottom', marginRight: '.5rem' }} />}
                      {item.infra && <Icon name="chain-broken" style={{ color: '#db3737', verticalAlign: 'text-bottom' }} />}
                    </td>
                    <td style={{ width: '100%', fontSize: '.8rem', lineHeight: '1.6rem' }}>
                      <Link
                        to={`${this.props.treeherder}/#/jobs?repo=mozilla-inbound&revision=${this.props.revision}&selectedJob=${item.jobId}`}
                        target="_blank">
                        {item.test}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )) : (
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', paddingTop: '2rem' }}>
                    <Icon name="spinner" size="2x" spin />
                  </td>
                </tr>
              </tbody>
            )
          }
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Suites);
