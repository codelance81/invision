import React from 'react';
import { Grid } from 'react-bootstrap';
import StockSearch from '../Shared/StockSearch';
import HistoricalPrice from './Historical_Price';

const AdavanceFeatures = ({ handleSubmit, symbol }) => (
  <Grid>
    <StockSearch handleSubmit={handleSubmit} symbol={symbol} />
    <HistoricalPrice symbol={symbol} />
  </Grid>
)

export default AdavanceFeatures;