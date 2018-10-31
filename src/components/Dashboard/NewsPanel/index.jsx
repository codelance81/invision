import React from 'react'
import axios from 'axios'
import { isEmpty, map } from 'lodash'
import NewsRow from './NewsRow'

class NewsPanel extends React.Component {
  
  constructor(){
    super();
    this.state = {
      newsArray:'',
      symbol:''
    }
  }

  componentDidMount(){
    debugger
    const { symbol } = this.props
    this.setState ({
      symbol: symbol
    }, () => {
      this.gettingFetch();
    })
    
  }

  componentWillReceiveProps(nextProps){
    const { symbol } = this.state;
    if(symbol !== nextProps.symbol){
      debugger
      this.setState ({
        symbol: nextProps.symbol
      },() => {
        this.gettingFetch();
      })
    }
  }
  
  gettingFetch = () => {
    const {symbol} = this.state
    axios.get('https://api.iextrading.com/1.0/stock/'+symbol +'/news')
    .then(res => {
      this.setState({
        newsArray: res.data
      })
    })
    .catch(err => {
      debugger
    })
  }

  

  render(){
    const { newsArray } = this.state
    if(isEmpty(newsArray)) {
      return <h3>No news available</h3>
    };
    return(
      <div className="news-panel">
        <h1>news feed</h1>
        <div className="newsList">
          { map(newsArray, news => <NewsRow data={news}/> )}
        </div>
      </div>
    )
  }
}


export default NewsPanel;