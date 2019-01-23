import React from 'react';
import classnames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { isNull } from 'lodash';

const OptionsChainRow = ({callData, putData, marketPrice}) => {
  const itmPut = putData.strike > marketPrice;
  const itmCall = callData.strike < marketPrice;
  const callClass = classnames({ 'item-active': itmCall });
  const putClass = classnames({ 'item-active': itmPut });
  return (
    <Row md={12}>
      <Col md={5}>
        <Row md={12}>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.last) ? callData.last : '-'}</span>
          </Col>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.change) ? callData.change: '-'}</span>
          </Col>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.bid) ? callData.bid : '-'}</span>
          </Col>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.ask) ? callData.ask : '-'}</span>
          </Col>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.volume) ? callData.volume: '-'}</span>
          </Col>
          <Col md={2}>
            <span className={callClass}>{!isNull(callData.open_interest) ? callData.open_interest : '-'}</span>
          </Col>
        </Row>
      </Col>
      
      <Col md={1}>
        <Row md={12}>
          <span>{callData.strike}</span>
        </Row>
      </Col>

        <Col md={5}>
          <Row md={12}>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.last) ? putData.last : '-'}</span>
            </Col>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.change) ? putData.change : '-'}</span>
            </Col>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.bid) ? putData.bid : '-'}</span>
            </Col>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.ask) ? putData.ask : '-'}</span>
            </Col>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.volume) ? putData.volume : '-'}</span>
            </Col>
            <Col md={2}>
              <span className={putClass}>{!isNull(putData.open_interest) ? putData.open_interest : '-'}</span>
            </Col>
          </Row>
        </Col>

    </Row>
 
  );
};

export default OptionsChainRow;