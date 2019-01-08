import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from '../Shared/StockSearch';
import NewsPanel from './NewsPanel/index'
import NvisionSignUp from './NvisionSignUp'
import Adavance from './Adavance'
import { Row, Col , Grid} from 'react-bootstrap';
import AuthUserContext from '../Session/AuthUserContext';
import OptionsChainPrice from './OptionsChainPrice/index';


const Dashboard = ({ handleSubmit, symbol }) => (
  <Grid>
    <StockSearch handleSubmit={handleSubmit} symbol={symbol} />
    <Row>
      <Col md={8}>
        <div className="main-chart">
          <TradingViewWidget 
            range="60m"
            symbol={symbol} height="400" width="100%"
        />
        </div>
        <div className="chain-price">
          <OptionsChainPrice 
            symbol={symbol}
          />
        </div>
      </Col>
      <Col md={4}>
        <div className="news-container">
          <NewsPanel symbol={symbol} />
        </div>
        <AuthUserContext.Consumer>
          {(isLoggedIn) => (
            <div className="nvision-signup">
              {!isLoggedIn ? (<NvisionSignUp/> ) : (<Adavance/>)}
            </div>
          )}
        </AuthUserContext.Consumer>     
      </Col>
    </Row>
  </Grid>
)

export default Dashboard;