import React from 'react';
import { map, isEmpty } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FutureNewsHeading from './FutureNewsHeading';
import { setFutureNews } from '../../../../state/news/operation';

class FutureNews extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.setFutureNews();
  }

  render() {
    const { futureNews } = this.props;
    return (
      <div>
        <h3 className="common-heading">Future News</h3>
        <Scrollbars autoHide style={{ height: 300, width: '100%' }} className="newsList">
          {!isEmpty(futureNews) && !isEmpty(futureNews.rss)
            ? map(futureNews.rss.channel, (data, index) => (
              <FutureNewsHeading
                key={index}
                news={data}
              />
            ))
            : <h2>No Data Available</h2>
          }
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  futureNews: state.news.futureNews,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setFutureNews,
  }, dispatch),
});

FutureNews.propTypes = {
  futureNews: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FutureNews);
