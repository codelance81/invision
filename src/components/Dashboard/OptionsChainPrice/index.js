import React from 'react';
import { Table } from 'react-bootstrap';
import { map, isEmpty, filter } from 'lodash';
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
      expirationDate: null
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
        this.fetchingOptionsChainPrice();
      });
    }
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
      this.setState({
        data: res.data.options ,
        isLoading: false
      })
    })
  }

  handleDateChange = (selectedDate) => {
    this.setState({ expirationDate: selectedDate.value }, () => {
      this.fetchingOptionsChainPrice();
    });
  }
  
  render(){
    const { data, isLoading, expirationDate, expirationDateArray } = this.state;
    const call_data =  !isEmpty(data) && filter(data.option, { option_type: 'call' });
    const put_data = !isEmpty(data) && filter(data.option, { option_type: 'put' });
    if(isLoading){
      return(
        <h2>Loding data...</h2>
      )
    }
    const isDataAvailable = (!isEmpty(call_data) && !isEmpty(put_data))
    return(
      <div className="common-container">
        <h3 className="common-heading">Options chain price ({isDataAvailable && call_data[0].underlying})</h3> 
        <h4>Select expiration date</h4>  
        <Select
          value={expirationDate}
          onChange={this.handleDateChange}
          options={expirationDateArray}
        />
        <Row>
          <Col md={12}>
            <Scrollbars style={{ height: 400, width: '100%' }}>
              <Table className="table-responsive table-bordered historical-price-data">
                <OptionsChainHeader />
                <tbody>
                  {
                    isDataAvailable ? (
                    map(call_data, (callData, index) => (                    
                      <OptionsChainRow
                        callData={callData}
                        key={index}
                        putData={put_data[index]}
                      />                                       
                    ))):<tr><td colSpan="15">No data available</td></tr>
                  } 
                </tbody>
              </Table>
            </Scrollbars>
          </Col>
        </Row>
      </div>
    )
  }
}

export default OptionsChainPrice;