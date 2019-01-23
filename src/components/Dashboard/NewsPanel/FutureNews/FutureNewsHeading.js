import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { map } from 'lodash';
import FutureNewsRow from './FutureNewsRow';

const FutureNewsHeading = ({news}) => (
  <Row>
    <Col md={12}>
      <h3><u>{news.title[0]}</u></h3>
      <hr/>
      {map(news.item, (item,index) => (
          <FutureNewsRow 
            key={index}
            futureNews={item} 
          />        
      ))}
    </Col>
  </Row>
)


export default FutureNewsHeading