import React from 'react'
import { contentArray } from './landing_data';
import { Row, Col, Grid } from 'react-bootstrap';

const LandingPage = () => {
  const list = contentArray.map((data) => (
    <div className={'landing-block ' + data.order} key={data.id}>
      <Row className="align-items-center mt-4 small-block">
        <Col lg={6}>
          <div className="landing-content">
            <h3>{data.title}</h3>
            <p>{data.summary}</p>
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <img src={data.image} alt="na" />
          </div>
        </Col>
      </Row>
    </div>
  ))
  return(
    <div className="main">
      <Grid>
        {list}
      </Grid>
    </div>
  )
}

export default LandingPage;




