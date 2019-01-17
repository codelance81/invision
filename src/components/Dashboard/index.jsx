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

const Dashboard = (props) => (
  <Grid>
    <StockSearch {...props} />
    <Row>
      <Col md={6}>
        <div className="main-chart common-container">
          <h3 className="common-heading">Trading View</h3>
          <TradingViewWidget 
            range="60m"
            symbol={props.symbol} height="418" width="100%"
            symbolName={props.symbolName}
          />
        </div>
      </Col>
      <Col md={6}>
        <div className="news-container common-container">
          <AdditionalStockInfo symbol={props.symbol} />
        </div>
        <MiniChart />
        <AuthUserContext.Consumer>
          {(isLoggedIn) => (
            <div className="nvision-signup common-container">
              {!isLoggedIn ? (<NvisionSignUp/> ) : (<Adavance/>)}
            </div>
          )}
        </AuthUserContext.Consumer>     
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