import React from 'react';
import { isEmpty, map, isEqual } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setStockNews } from '../../../state/news/operation';
import NewsRow from './NewsRow';


class NewsPanel extends React.Component {
  componentDidMount() {
    const { symbol, actions } = this.props;
    actions.setStockNews(symbol);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.symbol, this.props.symbol)) {
      const { actions, symbol } = this.props;
      actions.setStockNews(symbol);
    }
  }

  render() {
    const { newsArray } = this.props;
    if (isEmpty(newsArray)) {
      return <h3>No news available</h3>;
    }
    return (
      <div>
        <h2 className="common-heading">news feed</h2>
        <Scrollbars autoHide style={{ height: 300, width: '100%' }} className="newsList">
          { map(newsArray, news => <NewsRow key={news.datetime} data={news} />)}
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  newsArray: state.news.stockNews,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setStockNews,
  }, dispatch),
});

NewsPanel.propTypes = {
  symbol: PropTypes.string.isRequired,
  actions: PropTypes.func.isRequired,
  newsArray: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPanel);
