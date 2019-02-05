import React from 'react';
import { Table } from 'react-bootstrap';
import { map, groupBy, isEmpty, isEqual } from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import HistoricalHeader from './HistoricalHeader';
import HistoricalRow from './HistoricalRow';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setHistoricalData } from '../../../state/historicalData/operations';

class HistoricalPrice extends React.Component {

  constructor() {
    super();
    this.state = {
      historicalData: [], 
      isLoading: true,
      symbol: ''
    }
    this.convertData = this.convertData.bind(this);
    this.fetchingHistoricalData = this.fetchingHistoricalData.bind(this);
  }

  componentDidMount() {
    this.fetchingHistoricalData();
  }

  componentDidUpdate(){
    if(!isEqual(this.state.symbol, this.props.symbol)){
      this.fetchingHistoricalData();
    }
  }  

  fetchingHistoricalData(){
    const { symbol, actions } = this.props;
    this.setState({ symbol: symbol })
    actions.setHistoricalData(symbol).then(res => {
      this.convertData();
    })
  }

  convertData(){
   const rawData = this.props.historicalData.data
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

    yearSorted = groupBy(yearMonthKeys, 'year'); //sort data year wise
    map(yearSorted, (data) => {
      const monthlyData = groupBy(data, 'month');     
      for(let i = 0; i < 12; i++ ) {
        if(isEmpty(monthlyData[i])) {
          monthlyData[i] = 'NA';
        } else {
          //get last close data of month
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
    this.setState({ 
      historicalData: yearSorted,
      isLoading: false 
    });
  }

  render() {
    const { isLoading, historicalData } = this.state; 
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
      <div className="common-container">
        <h3 className="common-heading">Historical Price ({this.props.symbol}) <span className="common-splitter">(5 Years data)</span></h3>
        <Scrollbars autoHide style={{ height: 300, width: '100%'}}>
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
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  historicalData: state.historicalData.historicalData
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setHistoricalData
  },dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalPrice);