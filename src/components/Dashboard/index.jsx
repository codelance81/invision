import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from '../Shared/StockSearch';
import NewsPanel from './NewsPanel/index';
import NvisionSignUp from './NvisionSignUp';
import Adavance from './Adavance';
import { Row, Col , Grid} from 'react-bootstrap';
import AuthUserContext from '../Session/AuthUserContext';
import OptionsChainPrice from './OptionsChainPrice/index';
import AdditionalStockInfo from './AdditionalStockInfo/index';
import HistoricalPrice from '../AdvanceRoute/Historical_Price/index';
import MiniChart from './MiniChart/index';
import FutureNews from './NewsPanel/FutureNews/index';

const Dashboard = (props) => (
  <Grid>
    <StockSearch {...props} />
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
        <AuthUserContext.Consumer>
          {(isLoggedIn) => (
            <div className="nvision-signup common-container">
              {!isLoggedIn ? (<NvisionSignUp/> ) : (<Adavance/>)}
            </div>
          )}
        </AuthUserContext.Consumer>  
        <NewsPanel symbol={props.symbol} />
      </Col>
      <Col md={6}>
        <div className="news-container common-container">
          <h3 className="common-heading">Additional Stock Information</h3>
          <AdditionalStockInfo symbol={props.symbol} />
        </div>
        <MiniChart />
        <FutureNews />    
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="chain-price">
          <OptionsChainPrice symbol={props.symbol} />
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="historical-price">
          <HistoricalPrice symbol={props.symbol} />
        </div>
      </Col>
    </Row>
  </Grid>
)

export default Dashboard;