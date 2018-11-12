import React from 'react';
import { Container } from 'reactstrap';
import StockSearch from '../Shared/StockSearch';
import HistoricalPrice from './Historical_Price';

const AdavanceFeatures = ({ handleSubmit, symbol }) => (
  <Container>
    <StockSearch handleSubmit={handleSubmit} symbol={symbol} />
    <HistoricalPrice symbol={symbol} />
  </Container>
)

export default AdavanceFeatures;