import React from 'react'
import { Row, Col } from 'react-bootstrap';

const OptionsChainHeader = () => (

  <Row md={12}>

    <Col md={5}>
      <Row md={12}>
        <Col md={2}>
          <span>Last</span>
        </Col>
        <Col md={2}>
          <span>Change</span>
        </Col>
        <Col md={2}>
          <span>Bid</span>
        </Col>
        <Col md={2}>
          <span>Ask</span>
        </Col>
        <Col md={2}>
          <span>Volume</span>
        </Col>
        <Col md={2}>
          <span>Open Int</span>
        </Col>
      </Row>
    </Col>

    <Col md={1}>
      <Row md={12}>
        <span>Strike</span>
      </Row>
    </Col>

    <Col md={5}>
      <Row md={12}>
        <Col md={2}>
          <span>Last</span>
        </Col>
        <Col md={2}>
          <span>Change</span>
        </Col>
        <Col md={2}>
          <span>Bid</span>
        </Col>
        <Col md={2}>
          <span>Ask</span>
        </Col>
        <Col md={2}>
          <span>Volume</span>
        </Col>
        <Col md={2}>
          <span>Open Int</span>
        </Col>
      </Row>
    </Col>

  </Row>
 
)

export default OptionsChainHeader;