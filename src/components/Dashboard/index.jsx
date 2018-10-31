import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from './StockSearch';
import NewsPanel from './NewsPanel/index'

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
      <div className="container">
        <StockSearch handleSubmit={this.handleSubmit} />
        <div className="row">
          <div className="col-md-8">
            <div className="main-chart">
              <TradingViewWidget symbol={this.state.symbol} height="400" width="100%" />
            </div>
            <div className="chain-price">
              {/* <ChainPrice /> */}
              {this.state.symbol}
            </div>
          </div>
          <div className="col-md-4">
            <div className="news-container">
              {/* <StockNewsFeed symbol={} /> */}
              <NewsPanel symbol={this.state.symbol} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;