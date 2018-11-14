import React from 'react'
import { Row, Grid } from 'react-bootstrap';
const LandingRow = ({image,title,summary}) => (
  <Grid>
    <Row md="12">
      <Row md="6">
        <h2>{title}</h2>
        <h6>{summary}</h6>
      </Row>
      <Row md="6">
        {image}
      </Row>
    </Row>
  </Grid>
)


export default LandingRow;