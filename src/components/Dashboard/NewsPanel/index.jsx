import React from 'react'
import axios from 'axios'
import { isEmpty, map } from 'lodash'
import NewsRow from './NewsRow'
import FutureNews from './FutureNews/index';
import { Scrollbars } from 'react-custom-scrollbars';

class NewsPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      newsArray: '',
      symbol: ''
    }
  }

  componentDidMount(){
    const { symbol } = this.props
    !this.isCancelled && this.setState ({
      symbol: symbol
    }, () => {
      this.gettingFetch();
    })   
  }

  componentWillReceiveProps(nextProps){
    const { symbol } = this.state;
    if(symbol !== nextProps.symbol){
      !this.isCancelled && this.setState ({
        symbol: nextProps.symbol
      },() => {
        this.gettingFetch();
      })
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }
  
  gettingFetch = () => {
    const {symbol} = this.state
    axios.get('https://api.iextrading.com/1.0/stock/'+symbol +'/news')
    .then(res => {
      !this.isCancelled && this.setState({
        newsArray: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
 
  render(){
    const { newsArray } = this.state
    if(isEmpty(newsArray)) {
      return <h3>No news available</h3>
    };
    return(
      <div className="news-panel">
        <h2 className="common-heading">news feed</h2>
        <Scrollbars autoHide style={{ height: 300, width: '100%' }} className="newsList">
          { map(newsArray, news => <NewsRow key={news.datetime} data={news}/> )}
        </Scrollbars>
      </div>
    )
  }
}

export default NewsPanel;