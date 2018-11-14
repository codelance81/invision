import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { map, groupBy, isEmpty } from 'lodash';
import HistoricalHeader from './HistoricalHeader';
import HistoricalRow from './HistoricalRow';
import ReactLoading from 'react-loading';

class HistoricalPrice extends React.Component {
  constructor() {
    super();

    this.state = {
      historicalData: [], 
      isLoading: true
    }

    this.convertData = this.convertData.bind(this);
  }

  componentDidMount() {
    const { symbol } = this.props;
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`)
      .then(res => {
        this.convertData(res);
        this.setState({ isLoading: false})

      }).catch(err => {
        console.log(err);
      })
  }

  convertData(res){
    const rawData = res.data;
    const yearMonthKeys = [];
    let yearSorted;   

    map(rawData, (data) => {
      const dataObj = {};
      dataObj.year = new Date(data.date).getFullYear();
      dataObj.month = new Date(data.date).getMonth();
      dataObj.close = data.close;
      dataObj.date = data.date;
      dataObj.changePercent = data.changePercent;
      yearMonthKeys.push(dataObj);
    });

    yearSorted = groupBy(yearMonthKeys, 'year');

    map(yearSorted, (data) => {
      const monthlyData = groupBy(data, 'month');
      
      for(let i = 0; i < 12; i++ ) {
        if(isEmpty(monthlyData[i])) {
          monthlyData[i] = 'NA';
        } else {
          monthlyData[i] = monthlyData[i][monthlyData[i].length - 1].close;
        }
      }

      let sum = 0;
      for( let i = 0; i < data.length; i++ ){
        sum += parseFloat(data[i].changePercent);
      }

      const avg = (sum/data.length).toFixed(3);
      yearSorted[data[0].year] = { monthlyData: monthlyData, yearlyAverage: avg, year: data[0].year };
    })
    
    this.setState({ historicalData: yearSorted })
  }


  render() {
    const { historicalData ,isLoading} = this.state;
    if (isLoading) {
      return(
        <center>
          <div className="loader">
            <ReactLoading type={'spinningBubbles'} color={'red'} height={'10%'} width={'10%'} />          
            <h3>Loading...</h3>
          </div>
        </center>
      ) 
    }
    return (
      <Table className="table-responsive historical-price-data">
        <HistoricalHeader />
        <tbody>
          { !isEmpty(historicalData) ? (
              map(historicalData, (data, index) => (
                <HistoricalRow data={data} key={index} />
              ))
            ) : (
              <tr><td className="text-center" colSpan="14">No data</td></tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default HistoricalPrice;