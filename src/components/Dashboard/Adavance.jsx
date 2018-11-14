import React from 'react'
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import  * as routes from '../../constants/routes' 


const Adavance = () => (
  <div className="adavance"> 
    <Panel>
      <Panel.Heading>Adavance Features</Panel.Heading>
      <Panel.Body>
        Click for special features acess
        i.e. historical price, analyse etc.
      </Panel.Body>
      <Link className="btn btn-success" to={routes.ADAVANCED_FEATURES}>ADAVANCED FEATURES</Link>
    </Panel>
  </div>
)

export default Adavance