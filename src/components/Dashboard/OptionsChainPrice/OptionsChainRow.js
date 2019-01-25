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
    <Row>
      <Col xs={5} className={callClass}>
        <Row>
          <Col xs={2} >
            <span >{!isNull(callData.last) ? callData.last : '-'}</span>
          </Col>
          <Col xs={2}>
            <span className=''>{!isNull(callData.change) ? callData.change: '-'}</span>
          </Col>
          <Col xs={2}>
            <span className=''>{!isNull(callData.bid) ? callData.bid : '-'}</span>
          </Col>
          <Col xs={2}>
            <span className=''>{!isNull(callData.ask) ? callData.ask : '-'}</span>
          </Col>
          <Col xs={2}>
            <span className=''>{!isNull(callData.volume) ? callData.volume: '-'}</span>
          </Col>
          <Col xs={2}>
            <span className=''>{!isNull(callData.open_interest) ? callData.open_interest : '-'}</span>
          </Col>
        </Row>
      </Col>
      
      <Col xs={2}>
        <Row>
          <span>{callData.strike}</span>
        </Row>
      </Col>

        <Col xs={5} className={putClass}>
          <Row>
            <Col xs={2}>
              <span >{!isNull(putData.last) ? putData.last : '-'}</span>
            </Col>
            <Col xs={2}>
              <span className=''>{!isNull(putData.change) ? putData.change : '-'}</span>
            </Col>
            <Col xs={2}>
              <span className=''>{!isNull(putData.bid) ? putData.bid : '-'}</span>
            </Col>
            <Col xs={2}>
              <span className=''>{!isNull(putData.ask) ? putData.ask : '-'}</span>
            </Col>
            <Col xs={2}>
              <span className=''>{!isNull(putData.volume) ? putData.volume : '-'}</span>
            </Col>
            <Col xs={2}>
              <span className=''>{!isNull(putData.open_interest) ? putData.open_interest : '-'}</span>
            </Col>
          </Row>
        </Col>

    </Row>
 
  );
};

export default OptionsChainRow;