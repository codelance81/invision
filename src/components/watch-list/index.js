import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import WatchListRow from './WatchListRow';
import {
  setALLSymbolToWatchListWithPrice,
  deleteSymbolToWatchListWithPrice,
  setUpdateSymbolToWatchListWithPrice,
} from '../../state/watch-list/operations';

const WatchListHeader = () => (
  <tr>
    <th>Symbol</th>
    <th>Price</th>
    <th>IsReached</th>
    <th>Date</th>
    <th>Operations</th>
  </tr>
);


class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: '',
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.setALLSymbolToWatchListWithPrice();
  }


  isDeleted = data => (
    new Promise((resolve) => {
      this.props.actions.deleteSymbolToWatchListWithPrice(data);
      resolve(null);
    })
  )

  handleDeletWatchList = (data) => {
    this.isDeleted(data).then(() => {
      this.setState({ alertMessage: 'Symbol deleted successfully !' });
    });
  }


  isUpdated = updatedSymbol => (
    new Promise((resolve) => {
      this.props.actions.setUpdateSymbolToWatchListWithPrice(updatedSymbol);
      resolve(null);
    })
  )

  handleUpdateWatchList = (data) => {
    const updatedSymbol = {
      symbol: data.symbol,
      price: data.price,
      isReached: false,
      isNotified: false,
      Date: new Date().toString(),
    };
    this.isUpdated(updatedSymbol).then(() => {
      this.setState({ alertMessage: 'Price update successfully !' });
    });
  }

  removeAlert = () => {
    this.setState({ alertMessage: '' });
  };

  render() {
    const { allSymbolWithPrice } = this.props;
    const { alertMessage } = this.state;

    if (isEmpty(allSymbolWithPrice)) {
      return <div className="container"><h4>No data in WatchList</h4></div>;
    }

    return (
      <div className="container">
        <div className="common-container">
          { !isEmpty(alertMessage) && (
            <div className="symbol-notifier">
              <div className="alert alert-success">
                <Button onClick={() => this.removeAlert()} className="close" data-dismiss="alert" arial-label="close">&times;</Button>
                <strong>{alertMessage}</strong>
              </div>
            </div>
          )}
          <h3 className="common-heading">WatchList</h3>
          <Table striped bordered hover>
            <thead>
              <WatchListHeader />
            </thead>
            <tbody>
              { map(allSymbolWithPrice, (data, index) => (
                <WatchListRow
                  key={index}
                  data={data}
                  handleDeletWatchList={this.handleDeletWatchList}
                  handleUpdateWatchList={this.handleUpdateWatchList}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allSymbolWithPrice: state.watchList.symbolWatchListWithPrice,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setALLSymbolToWatchListWithPrice,
    deleteSymbolToWatchListWithPrice,
    setUpdateSymbolToWatchListWithPrice,
  }, dispatch),
});

WatchList.propTypes = {
  actions: PropTypes.func.isRequired,
  allSymbolWithPrice: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
