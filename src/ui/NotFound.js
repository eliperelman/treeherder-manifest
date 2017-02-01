import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

const NotFound = () => (
  <Container fluid style={{ marginTop: 40 }}>
    <Row>
      <Col>
        <Alert color="danger">
          Missing required URL parameter for push ID.
        </Alert>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
