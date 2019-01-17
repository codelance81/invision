import React from 'react';
import { Grid } from 'react-bootstrap';
import StockSearch from '../Shared/StockSearch';
import HistoricalPrice from './Historical_Price';

const AdavanceFeatures = (props) => (
  <Grid>
    <StockSearch
      handleSubmit={props.handleSubmit}
      symbol={props.symbol}
      allSymbols={props.allSymbols}
      symbolName={props.symbolName}
    />
    <HistoricalPrice symbol={props.symbol} />
  </Grid>
)

export default AdavanceFeatures;