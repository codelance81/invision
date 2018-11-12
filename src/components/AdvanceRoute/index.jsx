import React from 'react'
import { Container } from 'reactstrap';
import StockSearch from '../Shared/StockSearch'

class AdavanceFeatures extends React.Component {
  render() {
    const { handleSubmit, symbol } = this.props;
    return (
      <Container>
        <StockSearch handleSubmit={handleSubmit} symbol={symbol} />
      </Container>
    )
  }
}

export default AdavanceFeatures;