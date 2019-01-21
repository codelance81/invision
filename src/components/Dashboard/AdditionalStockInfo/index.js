import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { isEmpty, merge } from 'lodash';

class AdditionalStockInfo extends React.Component{

  constructor(){
    super();
    this.state = {
      data1:[],
      data2:[],
      data3:[]
    }
  }
  
  componentDidMount() {
    this.mounted = true;
    const { symbol } = this.props;
    this.fetchingAdditionalStockInfoCall1(symbol);
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  fetchingAdditionalStockInfoCall1 = (symbol) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => {
      if (this.mounted) {
        this.setState({ data1: res.data }, () => {
          this.fetchingAdditionalStockInfoCall2(symbol, () => {
            this.fetchingAdditionalStockInfoCall3(symbol);
          });
        });
      };
    });   
  };

  fetchingAdditionalStockInfoCall2 = (symbol, callback) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/stats`)
    .then(res => {
      if (this.mounted) {
        this.setState({data2: res.data}, () => {
          callback();
        });
      };
    }).catch(err => {
      console.log(err);
      return false;
    });
  };

  fetchingAdditionalStockInfoCall3 = (symbol) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
    .then(res => {
      if (this.mounted) {
        this.setState({ data3: res.data})
      };
    }).catch(err => {
      console.log(err);
    });
  };

  render(){
    const { data1, data2, data3 } = this.state    
    const data = merge(data1,data2,data3)
    return(       
      <Row className="addition-detail">
        <Col md={4}>
          <Row>
            <span>EXCHANGE</span>
            <h5><b>{data.primaryExchange}</b></h5>
          </Row>
          <Row>
            <span>FLOAT</span>
            <h5><b>{data.float}</b></h5>
          </Row>
          <Row>
            <span>SECTOR</span>
            <h5><b>{!isEmpty(data.sector) ? data.sector : 'NA'}</b></h5>
          </Row>
          <Row>
            <span>WEBSITE</span>
            <h5><b>{data.website}</b></h5>
          </Row>
          <Row>
            <span>NUMBER OF EMPLOYEES </span>
            <h5><b>----</b></h5>
          </Row>
          <Row>
            <span>SHARES OUTSTANDING</span>
            <h5><b>{!isEmpty(data.sharesOutstanding) ? data.sharesOutstanding : 'NA'}</b></h5>
          </Row>
          <Row>
            <span>INDUSTRY</span>
            <h5><b>{!isEmpty(data.industry) ? data.industry : 'NA'}</b></h5>
          </Row>
        </Col>
        
        <Col md={4}>        
          <Row>
            <span>VOLUME</span>
            <h5><b>{data.latestVolume}</b></h5>
          </Row>
          <Row>
            <span>52 WEEK RANGE</span>
            <h5><b>{data.week52Low+'-'+data.week52High}</b></h5>
          </Row>
          <Row>
            <span>BETA</span>
            <h5><b>{data.beta}</b></h5>
          </Row>
          <Row>
            <span>DIVIDEND & YIELD</span>
            <h5><b>{data.dividendYield}</b></h5>
          </Row>
          <Row>
            <span>IEX VOLUME</span>
            <h5><b>{!isEmpty(data.iexVolume) ? data.iexVolume : 'NA'}</b></h5>
          </Row>
          <Row>
            <span>AVG DAILY VOLUME</span>
            <h5><b>{data.avgTotalVolume}</b></h5>
          </Row>
          <Row>
            <span>MARKET CAP</span>
            <h5><b>{data.marketCap}</b></h5>
          </Row>
        </Col>

        <Col md={4}>                      
          <Row>
            <span>LATEST EPS</span>
            <h5><b>{data.latestEPS}</b></h5>
          </Row>
          <Row>
            <span>EX-DIVIDEND DATE</span>
            <h5><b>{data.exDividendDate}</b></h5>
          </Row>
          <Row>
            <span>IEX MKT SHARE</span>
            <h5><b>----</b></h5>
          </Row>
          <Row>
            <span>OPEN</span>
            <h5><b>{data.open}</b></h5>
          </Row>
          <Row>
            <span>PREVIOUS CLOSE</span>
            <h5><b>{data.previousClose}</b></h5>
          </Row>
          <Row>
            <span>LASTEST EPS DATE</span>
            <h5><b>{data.latestEPSDate}</b></h5>
          </Row>
          <Row>
            <span>P/E RATIO</span>
            <h5><b>{!isEmpty(data.peRatio) ? data.peRatio : 'NA'}</b></h5>
          </Row>
        </Col>
      </Row>          
    )
  }
}


export default AdditionalStockInfo;