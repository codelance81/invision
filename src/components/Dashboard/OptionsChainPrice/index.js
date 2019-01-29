import React from 'react';
import { map, isEmpty, filter, orderBy } from 'lodash';
import axios from 'axios';
import OptionsChainHeader from './OptionsChainHeader';
import OptionsChainRow from './OptionsChainRow';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-datepicker/dist/react-datepicker.css';

class OptionsChainPrice extends React.Component{
  constructor(){
    super();
    this.state = {
      data: [],
      isLoading: true,
      expirationDateArray:[],
      expirationDate: null,
      marketPrice: null,
    }
  }
  
  componentDidMount(){
    this.mount = true
    this.fetchingExpirationDate();
  }

  componentWillUnmount() {
    this.mount = false;
  }

  fetchingExpirationDate = () => {
    const { symbol } = this.props;
    axios.get('https://sandbox.tradier.com/v1/markets/options/expirations',{
      headers:{
        Authorization: 'Bearer DGhGKzBEFen4Sq8priL536krXQIK',
        Accept: 'application/json'
      },
      params:{
        symbol: symbol,
      }
    })
    .then(res => {
      !isEmpty(res.data.expirations) ? 
      this.handleExpiryDatesGetOptionChain(res.data.expirations.date):
      this.mount && this.setState({ isLoading: false })
    });
  };
  
  handleExpiryDatesGetOptionChain = (expiryDates) => {
    const allDate =  [];
    map(expiryDates, (date) => {
      const dataObj = {};
      dataObj.value = date;
      dataObj.label = date;
      allDate.push(dataObj);
    })
    if (this.mount) {
      this.setState({ 
        expirationDateArray: allDate,
        expirationDate: expiryDates[0]
      }, () => {
        this.fetchingMarketPriceOfSymbol().then(() => {
          this.fetchingOptionsChainPrice();
        })
      });
    }
  }

  fetchingMarketPriceOfSymbol = () => {
    const { symbol } = this.props;
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
      .then(res => {
        if(this.mount){
          this.setState({ marketPrice: res.data });
        }       
        return true;
      }).catch(() => {
        return false;
      });
  }

  fetchingOptionsChainPrice = () => {
    const { symbol } = this.props;
    const { expirationDate } = this.state;
    axios.get('https://sandbox.tradier.com/v1/markets/options/chains',{
      headers:{
        Authorization: 'Bearer DGhGKzBEFen4Sq8priL536krXQIK',
        Accept: 'application/json'
      },
      params:{
        symbol: symbol,
        expiration: expirationDate,
      }
    })
    .then(res => {
      if(this.mount){
        this.setState({
          data: res.data.options ,
          isLoading: false
        })
      }
      
    })
  }

  handleDateChange = (selectedDate) => {
    this.setState({ expirationDate: selectedDate.value }, () => {
      this.fetchingOptionsChainPrice();
    });
  }
  
  render(){
    const { data, isLoading, expirationDate, expirationDateArray, marketPrice } = this.state;
    const call_data =  !isEmpty(data) && filter(data.option, { option_type: 'call' });
    const put_data = !isEmpty(data) && filter(data.option, { option_type: 'put' });
    let callDataOrdered = [];
    let putDataOrdered = [];
    if (!isEmpty(call_data) && !isEmpty(put_data)) {
      callDataOrdered = orderBy(call_data, ['strike'], ['asc']);
      putDataOrdered = orderBy(put_data, ['strike'], ['asc']);
    }
    if(isLoading){
      return(
        <h2>Loding data...</h2>
      )
    }
    const isDataAvailable = (!isEmpty(callDataOrdered) && !isEmpty(putDataOrdered))
    return(
      <div className="optionChain">
        <h3 className="common-heading">Options chain price ({isDataAvailable && call_data[0].underlying})</h3> 
        <h4>Select expiration date</h4>  
        <Select
          value={expirationDate}
          onChange={this.handleDateChange}
          options={expirationDateArray}
        />
        <Scrollbars style={{ height: 500, width: '100%' }}>
          <div className="option-chain-table" style={{ width: '1079px' }}>
            <Row>
              <Col md={12}>
                <OptionsChainHeader />
                <Scrollbars autoHide style={{ height: 400, width: '100%' }}>
                  {
                    isDataAvailable ? (
                    map(callDataOrdered, (callData, index) => (                    
                      <OptionsChainRow
                        callData={callData}
                        key={index}
                        putData={putDataOrdered[index]}
                        marketPrice={marketPrice}
                      />                                       
                    ))) : <tr><td colSpan="15">No data available</td></tr>
                  }             
                </Scrollbars>
              </Col>
            </Row>
          </div>
        </Scrollbars>
      </div>
    )
  }
}

export default OptionsChainPrice;