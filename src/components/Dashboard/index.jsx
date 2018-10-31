import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from './StockSearch';
import NewsPanel from './NewsPanel/index'
import NvisionSignUp from './NvisionSignUp'
import { Row, Col , Container} from 'reactstrap';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: "SPY",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(symbol) {
    this.setState({ symbol: symbol });
  }
  render() {
    return (
      <Container>
        <StockSearch handleSubmit={this.handleSubmit} />
        <Row>
          <Col md="8">
            <div className="main-chart">
              <TradingViewWidget symbol={this.state.symbol} height="400" width="100%" />
            </div>
            <div className="chain-price">
            </div>
          </Col>
          <Col md="4">
            <div className="news-container">
              <NewsPanel symbol={this.state.symbol} />
            </div>
            <div className="nvision-signup">
              <NvisionSignUp/>
            </div>         
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard;