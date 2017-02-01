import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { tests } from '../mock';

export default class Test extends React.Component {
  render() {
    const testId = atob(this.props.match.params.testId);

    return (
      <Container fluid style={{ marginBottom: '1rem', marginTop: '3rem' }}>
        <Row>
          <Col>
            <code>{testId}</code>
            <hr />
            <pre>
              {JSON.stringify(tests.find(t => t.test === testId), null, 2)}
            </pre>
          </Col>
        </Row>
      </Container>
    );
  }
}
