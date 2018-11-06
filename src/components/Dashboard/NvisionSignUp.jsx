import React from 'react'
import { Card ,CardTitle, CardText, Row } from 'reactstrap';
import { Link } from 'react-router-dom'


const NvisionSignUp = () => (
  <Row className="nVisionSignUp">
    <Card body>
      <CardTitle>NVision SignUp</CardTitle>
      <CardText>
        Signup to nnvison for special features acess
        i.e. historical price, analyse etc.
      </CardText>
      <span className="input-group-btn">
        <Link to="/signin">NVISION SIGNUP</Link>
      </span>
    </Card>
  </Row>
)

export default NvisionSignUp;
