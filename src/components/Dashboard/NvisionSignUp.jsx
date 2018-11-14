import React from 'react'
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const NvisionSignUp = () => (
  <div className="nVisionSignUp">
    <Panel>
      <Panel.Heading>NVision SignUp</Panel.Heading>
      <Panel.Body>
        Signup to nnvison for special features acess
        i.e. historical price, analyse etc.
      </Panel.Body>
      <Panel.Footer>
        <Link to="/signin">NVISION SIGNUP</Link>
      </Panel.Footer>
    </Panel>
  </div>
)

export default NvisionSignUp;