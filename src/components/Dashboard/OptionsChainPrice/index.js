import React from 'react';
import { Table } from 'react-bootstrap';
import { map, isEmpty } from 'lodash';
import axios from 'axios';
import { OptionsChainCallsHeader, OptionsChainPutsHeader } from './OptionsChainHeader';
import { OptionsChainCallsRow, OptionsChainPutsRow } from './OptionsChainRow';
import { Row, Col } from 'react-bootstrap';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class OptionsChainPrice extends React.Component{
  constructor(){
    super();
    this.state = {
      data: [],
      fromDate: new Date(),  
      isLoading: true,
    }
  }
  
  componentDidMount(){
    this.fetchingOptionsChainPrice();
  }

  handleDateChange = (date) => {
    const formattedDate = Moment(date).format('YYYY-MM-DD').toString();
    this.setState({ fromDate: formattedDate },() => {
      this.fetchingOptionsChainPrice();
    });
  }

  fetchingOptionsChainPrice = () => {
    const { symbol } = this.props;
    const { fromDate } = this.state;
    axios.get('https://api.tdameritrade.com/v1/marketdata/chains',{
      params:{
        symbol: symbol,
        apikey: 'INVISION123',
        range: 'NTM',
        fromDate: fromDate,
        optionType: 'S'
      }
    })
    .then(res => {
      this.setState({
        data: res ,
        isLoading: false
      })
    })
  }

  render(){
    const { data, fromDate, isLoading } = this.state;
    if(isLoading){
      return(
        <h2>Loding data...</h2>
      )
    }
    return(
      <div>
        <h3>Options chain price</h3>   
        <span style={{fontWeight: 'bold'}}>From date</span>
        <DatePicker
          selected={fromDate}
          onChange={this.handleDateChange}
        />       
        <Row>
          <Col md={6}>
            <span>Calls Options</span>
            <Table className="table-responsive historical-price-data">
              <OptionsChainCallsHeader />
              <tbody>
                {
                  (!isEmpty(data) && !isEmpty(data.data) && !isEmpty(data.data.callExpDateMap))
                  ?
                  map(data.data.callExpDateMap, date => (
                    map(date, dataRow => (
                      map(dataRow, (data, index) => (
                        <OptionsChainCallsRow data={data} key={index} />
                      ))
                    ))
                  ))
                  :
                  <tr><td>No data available</td></tr>
                } 
              </tbody>
            </Table> 
          </Col>

          <Col md={6}>
            <span>Puts Options</span>
            <Table className="table-responsive historical-price-data">
              <OptionsChainPutsHeader />
              <tbody>
                {
                  (!isEmpty(data) && !isEmpty(data.data) && !isEmpty(data.data.putExpDateMap))
                  ?
                  map(data.data.putExpDateMap, date => (
                    map(date, dataRow => (
                      map(dataRow, (data, index) => (
                        <OptionsChainPutsRow data={data} key={index} />
                      ))
                    ))
                  ))
                  :
                  <tr><td>No data available</td></tr>
                } 
              </tbody>
            </Table> 
          </Col>
        </Row>
      </div>
    )
  }
}

export default OptionsChainPrice;

