import React from 'react';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';

const ShowSearchBar = props => (
  <Row className="search-company">
    <Col lg={props.isAuthenticated ? 8 : 12}>
      <div className="search-symbol mt-4">
        <Select
          value={props.symbol}
          options={props.allSymbols}
          filterOptions={props.filterOptions}
          onChange={(value) => { props.handleSubmit(value); }}
        />
      </div>
    </Col>
    {props.isAuthenticated && (
      <div>
        <Col lg={2}>
          <div className="search-symbol mt-4">
            <input
              type="number"
              placeholder="enter price e.g. 155"
              onChange={props.handlePriceChange}
              value={props.setPrice}
              className="form-control"
            />
          </div>
        </Col>
        <Col lg={2}>
          <div className="search-symbol mt-4">
            <Button variant="danger" onClick={props.handleAddSymbolWithExitingCheck}>Add TO Watchlist</Button>
          </div>
        </Col>
      </div>
    )}
  </Row>
);


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  allSymbols: state.stocks.allStockSymbols.allSymbol,
  symbolName: state.stocks.currentStockSymbol.name,
});

ShowSearchBar.propTypes = {
  handlePriceChange: PropTypes.func.isRequired,
  handleAddSymbolWithExitingCheck: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setPrice: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
  allSymbols: PropTypes.instanceOf(Array).isRequired,
  filterOptions: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(ShowSearchBar);
