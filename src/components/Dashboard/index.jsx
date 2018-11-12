import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from '../Shared/StockSearch';
import NewsPanel from './NewsPanel/index'
import NvisionSignUp from './NvisionSignUp'
import Adavance from './Adavance'
import { Row, Col , Container} from 'reactstrap';
import {auth} from '../../firebase/firebase'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged:false,
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener(){
    
    auth.onAuthStateChanged((user) => {
      
      console.log(user)
      if(user){
        this.setState({
          isLogged:true
        })
      }else{
        this.setState({
          isLogged:false
        })
      }
    })
  }

  render() {
    const { isLogged } = this.state
    const { handleSubmit, symbol } = this.props;
    return (
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
            <div className="nvision-signup">
              {!isLogged ? (<NvisionSignUp/> ) : (<Adavance/>)}
            </div>         
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard;