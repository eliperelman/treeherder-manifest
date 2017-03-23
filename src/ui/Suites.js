import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Form, FormGroup, Input, Label, Row, Col, Table, Container } from 'reactstrap';
import Icon from 'react-fontawesome';
import StatusProgress from './StatusProgress';
import StatusNavbar from './StatusNavbar';
import { colors } from '../mock';
import { connect } from 'react-redux';
import { store, actions } from '../redux/store';

const mapStateToProps = ({ suites }) => ({
  rowData: suites.rowData,
  fulltext: suites.fulltext,
  suites: suites.suites,
});

export class Suites extends React.Component {
  componentDidMount() { // eslint-disable-line class-methods-use-this
    const { pushId } = this.props.match.params;

    store.dispatch(actions.suites.updateTests(pushId));
    store.dispatch(actions.push.updatePush(pushId));
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
          <Form>
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
              <th key="open-log" style={{ textAlign: 'center' }}>View Log</th>
              <th key="test">Test</th>
            </tr>
          </thead>
            {Object.entries(this.props.rowData).map(([name, rows], tkey) => (
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
                    <td style={{ minWidth: '8rem', fontSize: '1rem' }}>
                      <Badge size="sm" color={colors[item.status]} style={{ fontWeight: 400, fontSize: '.8rem', margin: '0 .5rem' }}>
                        {item.status}
                      </Badge>
                      {item.intermittent && <Icon name="bug" style={{ color: '#d78236', verticalAlign: 'text-bottom', marginRight: '.5rem' }} />}
                      {item.infra && <Icon name="chain-broken" style={{ color: '#db3737', verticalAlign: 'text-bottom' }} />}
                    </td>
                    <td style={{ minWidth: '6rem', textAlign: 'center', fontSize: '1rem' }}>
                      <Icon name="file-text-o" title="Show log for test" />
                    </td>
                    <td style={{ width: '100%', fontSize: '.8rem', lineHeight: '1.6rem' }}>
                      <Link to={`${this.props.location.pathname}/tests/${btoa(item.test)}`}>
                        {item.test}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))
          }
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Suites);
