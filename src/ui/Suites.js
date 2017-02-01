import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Form, FormGroup, Input, Label, Row, Col, Table, Container } from 'reactstrap';
import Icon from 'react-fontawesome';
import StatusProgress from './StatusProgress';
import StatusNavbar from './StatusNavbar';
import { suites, colors } from '../mock';

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

export default class Suites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCount: 0,
      rowData: suites,
      fulltext: Object
        .keys(suites)
        .reduce((fulltext, key) => {
          fulltext[key] = suites[key].map(fullText); // eslint-disable-line no-param-reassign
          return fulltext;
        }, {}),
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
        suites :
        Object
          .keys(suites)
          .reduce((rowData, key) => {
            // eslint-disable-next-line no-param-reassign
            rowData[key] = suites[key]
              .filter((item, index) => new RegExp(value, 'i').test(fulltext[key][index]));
            return rowData;
          }, {}),
    });
  }

  render() {
    return (
      <div>
        <StatusNavbar />
        <StatusProgress />
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

        <Table size="sm" responsive>
          <thead>
            <tr>
              <th key="retrigger" style={{ paddingLeft: '1rem' }}>Retrigger/Cancel</th>
              <th key="status" style={{ paddingLeft: '1rem', textAlign: 'center' }}>Status</th>
              <th key="open-log" style={{ textAlign: 'center' }}>View Log</th>
              <th key="test">Test</th>
            </tr>
          </thead>
            {Object.keys(this.state.rowData).map((name, tkey) => {
              const rows = this.state.rowData[name];

              return (
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
                        <Link to={`${this.props.location.pathname}/tests/${btoa(item.test)}`}>
                          {item.test}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              );
            })}
        </Table>
      </div>
    );
  }
}
