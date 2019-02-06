import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEqual, merge, chunk, map } from 'lodash';
import { connect } from 'react-redux';
import { setAdditionalStockSet_1, setAdditionalStockSet_2, setAdditionalStockSet_3 } from '../../../state/additionalStock/operations'
import { bindActionCreators } from 'redux';

class AdditionalStockInfo extends React.Component{

  constructor(){
    super();
    this.state = {
      additionalStockInfo: [], 
    }
  }
  
  componentDidMount() {
   this.fetchingAdditionalStockInfo();
  }

  //check next props symbol is different or not
  componentDidUpdate(prevProps){
    if(!isEqual(prevProps.symbol,this.props.symbol)){
      this.fetchingAdditionalStockInfo();
    }
  }

  fetchingAdditionalStockInfo = () => {
    const { symbol, actions } = this.props;
    actions.setAdditionalStockSet_1(symbol).then(() => {
      actions.setAdditionalStockSet_2(symbol).then(() => {
        actions.setAdditionalStockSet_3(symbol).then(() => {
          this.formattedData();
        });
      });
    });
  }

  formattedData = () => {

    const { additionalStockInfoDataSet_1, additionalStockInfoDataSet_2, additionalStockInfoDataSet_3 } = this.props; 
    const data = merge(additionalStockInfoDataSet_1, additionalStockInfoDataSet_2, additionalStockInfoDataSet_3);
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


const mapStateToProps = (state) => ({
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  additionalStockInfoDataSet_1: state.additionalStockInfo.additionStockDataSet_1,
  additionalStockInfoDataSet_2: state.additionalStockInfo.additionStockDataSet_2,
  additionalStockInfoDataSet_3: state.additionalStockInfo.additionStockDataSet_3
})
  


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setAdditionalStockSet_1,
    setAdditionalStockSet_2,
    setAdditionalStockSet_3
  },dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalStockInfo);