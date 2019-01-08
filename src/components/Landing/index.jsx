import React from 'react'
import { contentArray } from './landing_data';
import { Row, Col, Grid } from 'react-bootstrap';

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
         <div>
          <Col md="6">
            <img src={data.image} alt="na" />
          </Col>
        </div>
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




