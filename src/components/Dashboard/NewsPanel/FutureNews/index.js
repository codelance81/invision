import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { map, isEmpty } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import FutureNewsHeading from './FutureNewsHeading';

class FutureNews extends React.Component {
  
  constructor(){
    super();
    this.state = {
      futureNews:[]
    }
  }

  componentDidMount(){ 
    this.mount = true; 
    axios.get('https://www.investing.com/rss/news_11.rss')
    .then(res => {  
      parseString(res.data, (err, result) => {       
        this.mount && this.setState({ futureNews: result });
      });
    }).catch(err => {    
        console.log(err)
    });
  }

  componentWillUnmount() {
    this.mount = false;
  }

  render(){
    const { futureNews } = this.state;
    return(
      <div>
        <h3 className="common-heading">Future News</h3>
        <Scrollbars autoHide style={{ height: 300, width: '100%' }} className="newsList">
          {!isEmpty(futureNews) && !isEmpty(futureNews.rss)
          ?
          map(futureNews.rss.channel, (data,index) => (
            <FutureNewsHeading 
              key={index}
              news={data} 
            />                  
          ))
          :
          <h2>No Data Available</h2>
          }
        </Scrollbars>
      </div>
    )
  }
}

export default FutureNews;