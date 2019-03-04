import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import { Row, Col, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StockSearch from '../shared/StockSearch';
import NewsPanel from './news-panel/index';
import NvisionSignUp from './NvisionSignUp';
import Adavance from './Adavance';
import OptionsChainPrice from './options-chain-price/index';
import AdditionalStockInfo from './additional-stock-info/index';
import HistoricalPrice from '../advance-route/historical-price/index';
import MiniChart from './mini-chart/index';
import FutureNews from './news-panel/future-news/index';


const Dashboard = props => (
  <Grid>
    <StockSearch handleSubmit={props.handleSubmit} />
    <Row>
      <Col md={6}>
        <div className="main-chart common-container">
          <h3 className="common-heading">Trading View</h3>
          <TradingViewWidget
            range="60m"
            symbol={props.symbol}
            height="350"
            width="100%"
            symbolName={props.symbolName}
          />
        </div>
        <div className="nvision-signup common-container">
          {!props.isLoggedIn ? (<NvisionSignUp />) : (<Adavance />)}
        </div>
        <div className="news-container common-container">
          <NewsPanel />
        </div>
      </Col>
      <Col md={6}>
        <div className="additional-stock-container common-container">
          <AdditionalStockInfo />
        </div>
        <div className="mini-chart common-container">
          <MiniChart />
        </div>
        <div className="future-news-container common-container">
          <FutureNews />
        </div>

      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="chain-price common-container">
          <OptionsChainPrice />
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="historical-price">
          <HistoricalPrice />
        </div>
      </Col>
    </Row>
  </Grid>
);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  symbolName: state.stocks.currentStockSymbol.name,
});

Dashboard.propTypes = {
  symbolName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, null)(Dashboard);
