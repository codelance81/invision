import React from 'react';
import { Row, Col } from 'react-bootstrap';

const OptionsChainHeader = () => (
  <React.Fragment>
    <Row className="option-header-type">
      <Col xs={5}>
        Call
      </Col>
      <Col className="col-xs-offset-2" xs={5}>
        Put
      </Col>
    </Row>
    <Row className="option-header">

      <Col xs={5}>
        <Row>
          <Col xs={2}>
            <span>Last</span>
          </Col>
          <Col xs={2}>
            <span>Change</span>
          </Col>
          <Col xs={2}>
            <span>Bid</span>
          </Col>
          <Col xs={2}>
            <span>Ask</span>
          </Col>
          <Col xs={2}>
            <span>Volume</span>
          </Col>
          <Col xs={2}>
            <span>Open Int</span>
          </Col>
        </Row>
      </Col>

      <Col xs={2}>
        <Row>
          <span>Strike</span>
        </Row>
      </Col>

      <Col xs={5}>
        <Row>
          <Col xs={2}>
            <span>Last</span>
          </Col>
          <Col xs={2}>
            <span>Change</span>
          </Col>
          <Col xs={2}>
            <span>Bid</span>
          </Col>
          <Col xs={2}>
            <span>Ask</span>
          </Col>
          <Col xs={2}>
            <span>Volume</span>
          </Col>
          <Col xs={2}>
            <span>Open Int</span>
          </Col>
        </Row>
      </Col>

    </Row>
  </React.Fragment>
);

export default OptionsChainHeader;
