import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import StockSearch from './StockSearch';
import NewsPanel from './NewsPanel/index'
import NvisionSignUp from './NvisionSignUp'
import Adavance from './Adavance'
import { Row, Col , Container} from 'reactstrap';
import {auth} from '../../firebase/firebase'

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: "SPY",
      isLogged:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){  
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


  handleSubmit(symbol) {
    this.setState({ symbol: symbol });
  }
  render() {
    const { isLogged } = this.state

    return (
      <Container>
        <StockSearch handleSubmit={this.handleSubmit} />
        <Row>
          <Col md="8">
            <div className="main-chart">
              <TradingViewWidget 
               range="60m"
                symbol={this.state.symbol} height="400" width="100%" />
            </div>
            <div className="chain-price">
            </div>
          </Col>
          <Col md="4">
            <div className="news-container">
              <NewsPanel symbol={this.state.symbol} />
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