import React from 'react'
import { Card ,Button, CardTitle, CardText, Row } from 'reactstrap';
import { Link } from 'react-router-dom'
import  * as routes from '../../constants/routes' 


const Adavance = () => (
  <Row className="adavance"> 
    <Card body>
      <CardTitle>Adavance Features</CardTitle>
      <CardText>
        Click for special features acess
        i.e. historical price, analyse etc.
      </CardText>
      <Link className="btn btn-success" to={routes.ADAVANCED_FEATURES}>ADAVANCED FEATURES</Link>
    </Card>
  </Row>
)

export default Adavance