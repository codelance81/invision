import React from 'react'
import { contentArray } from './landing_data';
import { Row, Col, Container } from 'reactstrap';

const LandingPage = () => {
  const list = contentArray.map((data) => (
    <div className={'landing-block ' + data.order}>
      <Row className="align-items-center mt-4">
        <Col md="6">
          <center>
            <h1>{data.title}</h1>
            <h6>{data.summary}</h6>
          </center>
        </Col>
        <Col md="6">
          <img src={data.image} alt="na" />
        </Col>
      </Row>
    </div>
  ))
  return(
    <div className="main">
      <Container>
        {list}
      </Container>
    </div>
  )
}

export default LandingPage;

