import React from 'react';
import {
  Navbar, Nav, Badge, Progress, Form, FormGroup, Input, Label, Row, Col, Table, Container,
} from 'reactstrap';
import Icon from 'react-fontawesome';
import { tests } from '../mock';

const counts = tests.reduce((counter, test) => {
  counter[test.status] += 1; // eslint-disable-line no-param-reassign
  return counter;
}, { Success: 0, Failed: 0, Pending: 0, 'Not Running': 0 });
const colors = {
  Success: 'success',
  Failed: 'danger',
  Pending: 'info',
  'Not Running': 'default',
};

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

export default class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCount: 0,
      rowData: tests,
      fulltext: tests.map(fullText),
    };
  }

  handleCheck(e) {
    if (e.target.type === 'checkbox') {
      this.setState({
        checkedCount: e.target.checked ?
          this.state.checkedCount + 1 :
          this.state.checkedCount - 1,
      });
    }
  }

  filter(e) {
    const { fulltext } = this.state;
    const { value } = e.target;

    this.setState({
      rowData: !value ?
        tests :
        tests.filter((item, index) => new RegExp(value, 'i').test(fulltext[index])),
    });
  }

  render() {
    return (
      <div>
        <Navbar toggleable>
          <Nav className="mr-auto" navbar>
            <span className="navbar-text">
              <Icon name="code" /> Revision <code>03f5f083bdc0</code>
            </span>

            <span className="navbar-text">
              <span className="hidden-sm-down">&mdash;&nbsp;&nbsp;&nbsp;</span>
              <Icon name="id-card-o" /> Author <code>eperelman@mozilla.com</code>
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

        <Progress multi>
          <Progress bar color="success" value={(counts.Success / tests.length) * 100} />
          <Progress bar color="danger" value={(counts.Failed / tests.length) * 100} />
          <Progress bar color="info" value={(counts.Pending / tests.length) * 100} striped />
          <Progress bar color="default" value={(counts['Not Running'] / tests.length) * 100} />
        </Progress>

        <Container fluid style={{ marginBottom: '.5rem', marginTop: '5rem' }}>
          <Form>
            <Row>
              <Col md={3} sm={12} xs={12}>
                {this.state.checkedCount !== 0 && (
                  <span>
                <a href="#" style={{ color: '#fff', marginRight: '1rem', marginTop: '.5rem', paddingTop: '.3rem', paddingBottom: '.3rem' }} className="btn btn-info btn-sm">
                  <Icon name="repeat" /> Retrigger {this.state.checkedCount} tests
                </a>
                <a href="#" style={{ color: '#fff', marginTop: '.5rem', paddingTop: '.3rem', paddingBottom: '.3rem' }} className="btn btn-warning btn-sm">
                  <Icon name="ban" /> Cancel {this.state.checkedCount} tests
                </a>
              </span>
                )}
              </Col>
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

        <Table size="sm">
          <thead>
            <tr>
              <th key="retrigger" style={{ paddingLeft: '1rem' }}>Retrigger/Cancel</th>
              <th key="status" style={{ paddingLeft: '1rem', textAlign: 'center' }}>Status</th>
              <th key="open-log" style={{ textAlign: 'center' }}>View Log</th>
              <th key="test">Test</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rowData.map((item, key) => (
              <tr key={key}>
                <td style={{ textAlign: 'center' }}>
                  <input type="checkbox" onChange={e => this.handleCheck(e)} />
                </td>
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
                  <a href="#">{item.test}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
