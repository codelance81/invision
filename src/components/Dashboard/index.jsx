import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from '../Shared/StockSearch';
import NewsPanel from './NewsPanel/index';
import NvisionSignUp from './NvisionSignUp';
import Adavance from './Adavance';
import { Row, Col, Grid } from 'react-bootstrap';
import OptionsChainPrice from './OptionsChainPrice/index';
import AdditionalStockInfo from './AdditionalStockInfo/index';
import HistoricalPrice from '../AdvanceRoute/Historical_Price/index';
import MiniChart from './MiniChart/index';
import FutureNews from './NewsPanel/FutureNews/index';
import { connect } from 'react-redux';

const Dashboard = (props) => (
  <Grid>
    <StockSearch handleSubmit={props.handleSubmit} />
    <Row>
      <Col md={6}>
        <div className="main-chart common-container">
          <h3 className="common-heading">Trading View</h3>
          <TradingViewWidget 
            range="60m"
            symbol={props.symbol} height="350" width="100%"
            symbolName={props.symbolName}
          />
        </div>
        <div className="nvision-signup common-container">
          {!props.isLoggedIn ? (<NvisionSignUp/> ) : (<Adavance/>)}
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
)

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isAuthenticated,
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  symbolName: state.stocks.currentStockSymbol.name,
});


export default connect(mapStateToProps, null)(Dashboard);