import React from 'react'
import { Row, Col, Container } from 'reactstrap';
const LandingRow = ({image,title,summary}) => (
  <Container>
    <Row md="12">
      <Row md="6">
        <h2>{title}</h2>
        <h6>{summary}</h6>
      </Row>
      <Row md="6">
        {image}
      </Row>
    </Row>
  </Container>
)


export default LandingRow;