import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from '../Shared/StockSearch';
import NewsPanel from './NewsPanel/index'
import NvisionSignUp from './NvisionSignUp'
import Adavance from './Adavance'
import { Row, Col , Container} from 'reactstrap';
import AuthUserContext from '../Session/AuthUserContext';

const Dashboard = ({ handleSubmit, symbol }) => (
  <Container>
    <StockSearch handleSubmit={handleSubmit} symbol={symbol} />
    <Row>
      <Col md="8">
        <div className="main-chart">
          <TradingViewWidget 
            range="60m"
            symbol={symbol} height="400" width="100%"
          />
        </div>
        <div className="chain-price">
        </div>
      </Col>
      <Col md="4">
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
  </Container>
)

export default Dashboard;