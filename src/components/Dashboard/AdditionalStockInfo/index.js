import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { isEqual, merge, chunk, map } from 'lodash';

class AdditionalStockInfo extends React.Component{

  constructor(){
    super();
    this.state = {
      dataSet1: [],  // dataSet1 contain open, previous close, pe-ratio,market cap etc.
      dataSet2: [],  // dataSet2 contain beta, divident & yield, lastest eps etc.
      dataSet3: [],  // dataSet3 contain website, sector, exchange, industry etc.
      additionalStockInfo: [], 
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
        this.setState({ dataSet1: res.data }, () => {
          this.fetchingAdditionalStockInfoCall2(symbol, () => {
            this.fetchingAdditionalStockInfoCall3(symbol);
          });
        });
      };
    });   
  }

  fetchingAdditionalStockInfoCall2 = (symbol, callback) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/stats`)
    .then(res => {
      if (this.mounted) {
        this.setState({dataSet2: res.data}, () => {
          callback();
        });
      };
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  fetchingAdditionalStockInfoCall3 = (symbol) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
    .then(res => {
      if (this.mounted) {
        this.setState({ dataSet3: res.data} , () => {
          this.formattedData();
        })
      };
    }).catch(err => {
      console.log(err);
    });
  }

  formattedData = () => {
    
    const { dataSet1, dataSet2, dataSet3 } = this.state; 
    const data = merge(dataSet1, dataSet2, dataSet3);
    const allAdditionalStockInfo = [];
    allAdditionalStockInfo.push({key: 'exchange',value: data.primaryExchange});
    allAdditionalStockInfo.push({key: 'float',value: data.float});
    allAdditionalStockInfo.push({key: 'sector',value: data.sector});
    allAdditionalStockInfo.push({key: 'website',value: data.website});
    allAdditionalStockInfo.push({key: 'no of employees',value: 'NA'});
    allAdditionalStockInfo.push({key: 'shares outstanding',value: data.sharesOutstanding});
    allAdditionalStockInfo.push({key: 'industry',value: data.industry});
    allAdditionalStockInfo.push({key: 'volume',value: data.latestVolume});
    allAdditionalStockInfo.push({key: '52 week range',value: data.week52Low+'-'+data.week52High});
    allAdditionalStockInfo.push({key: 'beta',value: data.beta});
    allAdditionalStockInfo.push({key: 'dividend & Yield',value: data.dividendYield});
    allAdditionalStockInfo.push({key: 'iex volume',value: data.iexVolume});
    allAdditionalStockInfo.push({key: 'avg daily volume',value: data.avgTotalVolume});
    allAdditionalStockInfo.push({key: 'market cap',value: data.marketCap});
    allAdditionalStockInfo.push({key: 'latest eps',value: data.latestEPS});
    allAdditionalStockInfo.push({key: 'ex-dividend date',value: data.exDividendDate});
    allAdditionalStockInfo.push({key: 'iex mkt share',value: 'NA'});
    allAdditionalStockInfo.push({key: 'open',value: data.open});
    allAdditionalStockInfo.push({key: 'previous close',value: data.previousClose});
    allAdditionalStockInfo.push({key: 'latest eps date',value: data.latestEPSDate});
    allAdditionalStockInfo.push({key: 'p/e ratio',value: data.peRatio});
    this.setState({ additionalStockInfo: allAdditionalStockInfo });
  }

  render(){
    const { additionalStockInfo } = this.state; 
    return(
      <React.Fragment>
        <h3 className="common-heading">Additional Stock Information</h3>
        { map(chunk(additionalStockInfo, 3), (dataset, index) => (
          <Row className="addition-detail" key={`data-set${index}`}>
            {
              map(dataset, (data, i) => (
                <Col md={4} key={i} sm={6} xs={6} className="stock-info-contain">
                  <div>
                    <span style={{fontWeight:300}}>{data.key}</span>
                    <h5><b>{(data.value || isEqual(data.value,0)) ? data.value : 'NA'}</b></h5>
                  </div>
                </Col>
              ))
            }
          </Row>  
        ))}
      </React.Fragment>        
    )
  }
}

export default AdditionalStockInfo;