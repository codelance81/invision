import React from 'react';
import { isEmpty, map, isEqual } from 'lodash';
import NewsRow from './NewsRow';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { setStockNews } from '../../../state/news/operation';
import { bindActionCreators } from 'redux';

class NewsPanel extends React.Component {

  componentDidMount(){
    const { symbol } = this.props
    const { actions } = this.props;    
    actions.setStockNews(symbol);  
  }


  componentDidUpdate(prevProps){
    if(!isEqual(prevProps.symbol, this.props.symbol)){
      const { actions, symbol } = this.props;
      actions.setStockNews(symbol);
    }
  }
 
  render(){
    const { newsArray } = this.props
    if(isEmpty(newsArray)) {
      return <h3>No news available</h3>
    };
    return(
      <div>
        <h2 className="common-heading">news feed</h2>
        <Scrollbars autoHide style={{ height: 300, width: '100%' }} className="newsList">
          { map(newsArray, news => <NewsRow key={news.datetime} data={news}/> )}
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  newsArray: state.news.stockNews
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setStockNews
  },dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPanel);