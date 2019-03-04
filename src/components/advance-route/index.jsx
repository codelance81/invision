import React from 'react';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StockSearch from '../shared/StockSearch';
import HistoricalPrice from './historical-price';

const AdavanceFeatures = props => (
  <Grid>
    <StockSearch
      handleSubmit={props.handleSubmit}
      symbol={props.symbol}
      allSymbols={props.allSymbols}
      symbolName={props.symbolName}
    />
    <HistoricalPrice symbol={props.symbol} />
  </Grid>
);

AdavanceFeatures.propTypes = {
  symbol: PropTypes.string.isRequired,
  symbolName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  allSymbols: PropTypes.instanceOf(Array).isRequired,
};

export default AdavanceFeatures;
