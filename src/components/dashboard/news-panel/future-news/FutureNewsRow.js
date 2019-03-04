import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Linkify from 'react-linkify';
import PropTypes from 'prop-types';

const FutureNewsRow = ({ futureNews }) => (
  <Row>
    <Col md={3}>
      <img
        src={futureNews.enclosure[0].$.url}
        alt="NA"
        height="100px"
        width="100px"
      />
    </Col>
    <Col md={9}>
      <div className="news-card">
        <small>{futureNews.pubDate[0]}</small>
        <h5>{futureNews.title[0]}</h5>
        <Linkify>
          view more:
          {futureNews.link[0]}
        </Linkify>
        <br />
      </div>
    </Col>
  </Row>
);

FutureNewsRow.propTypes = {
  futureNews: PropTypes.instanceOf(Object).isRequired,
};


export default FutureNewsRow;
