import React from 'react'
import { Row, Grid } from 'react-bootstrap';
const LandingRow = ({image,title,summary}) => (
  <Grid>
    <Row md="12">
      <Col lg="6">
        <h2>{title}</h2>
        <h6>{summary}</h6>
      </Col>
      <Col lg="6">
        {image}
      </Col>
    </Row>
  </Grid>
)


export default LandingRow;