import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import FutureNewsRow from './FutureNewsRow';

const FutureNewsHeading = ({ news }) => (
  <Row>
    <Col md={12}>
      <h3><u>{news.title[0]}</u></h3>
      <hr />
      {map(news.item, (item, index) => (
        <FutureNewsRow
          key={index}
          futureNews={item}
        />
      ))}
    </Col>
  </Row>
);

FutureNewsHeading.propTypes = {
  news: PropTypes.instanceOf(Array).isRequired,
};

export default FutureNewsHeading;
