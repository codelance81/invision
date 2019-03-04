import React from 'react';
import createFilterOptions from 'react-select-fast-filter-options';
import {
  isEmpty, isEqual, map, filter,
} from 'lodash';
import PropTypes from 'prop-types';
import 'react-virtualized-select/styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setUpdateSymbolToWatchListWithPrice,
  findSymbolsAlreadyExistOrNotWithAllInfo,
  setALLSymbolToWatchListWithPrice,
  addUserAddedSymbolToWatchlist,
  findMarketPriceOfExistingSymbol,
} from '../../state/watch-list/operations';
import { setMarketPriceOfSymbol, fetchCurrentMarketPriceOfSymbol } from '../../state/options-chain-price/operations';
import { setNotification, updateIsReachedOfSymbol, removeNotification } from '../../state/notification/operations';
import { setCurrentSymbol, setAllSymbol } from '../../state/current-symbol/operations';
import { AlertNotifier, SymbolNotifier } from './Notifier';
import ShowSearchBar from './ShowSearchBar';
import ConfirmationModal from './ConfirmationModal';

class StockSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      setPrice: '',
      isModalShow: false,
      checkInitialised: false,
      alertMessage: '',
    };
  }

  componentDidMount() {
    const { actions, symbol, isAuthenticated } = this.props;
    actions.setAllSymbol();
    if (isAuthenticated) {
      actions.setALLSymbolToWatchListWithPrice(symbol);
    }
  }

  componentDidUpdate() {
    const { allSymbolWithPrice } = this.props;
    const { checkInitialised } = this.state;
    if (!isEmpty(allSymbolWithPrice) && !checkInitialised) {
      this.checkIsReached();
    }
  }

  checkIsReached = () => {
    const { allSymbolWithPrice, actions } = this.props;
    this.setState({ checkInitialised: true }, () => {
      const allSymbolPrices = map(allSymbolWithPrice, (data) => {
        return actions.fetchCurrentMarketPriceOfSymbol(data.symbol).then((currentMarketPrice) => {
          const updatedData = Object.assign({}, data);
          let isReached;
          if (data.isNegative) {
            isReached = currentMarketPrice <= parseFloat(data.price);
          } else {
            isReached = currentMarketPrice >= parseFloat(data.price);
          }
          if (isReached) {
            updatedData.isReached = isReached;
            updatedData.show = true;
            updatedData.currentMarketPrice = currentMarketPrice;
            if (!data.isReached) {
              actions.updateIsReachedOfSymbol(data.symbol);
            }
          }
          return updatedData;
        });
      });
      Promise.all(allSymbolPrices).then((results) => {
        const notifiySymbol = filter(results, data => isEqual(data.isReached, true));
        actions.setNotification(notifiySymbol);
      });
    });
  }

  handlePriceChange = (e) => {
    this.setState({ setPrice: e.target.value });
  }

  handleCloseModal = () => {
    this.setState({ isModalShow: false });
  }

  isAdded = (addSymbol) => {
    return new Promise((resolve) => {
      this.props.actions.addUserAddedSymbolToWatchlist(addSymbol);
      resolve(null);
    });
  }

  handleAddSymbol = () => {
    const { symbol, marketPriceOfSymbol } = this.props;
    const { setPrice } = this.state;
    let isNegative = false;
    if (setPrice < marketPriceOfSymbol) {
      isNegative = true;
    } else {
      isNegative = false;
    }

    this.setState({ isModalShow: false });
    const addSymbol = {
      symbol,
      price: setPrice,
      isReached: false,
      isNegative,
      isNotified: false,
      Date: new Date().toString(),
    };

    this.isAdded(addSymbol).then(() => {
      this.setState({ alertMessage: 'your symbol successfully added !' });
    });
  }

  handleSaveChanges = () => {
    const { symbol, actions, marketPriceOfSymbol } = this.props;
    const { setPrice } = this.state;
    let isNegative = false;
    if (setPrice < marketPriceOfSymbol) {
      isNegative = true;
    } else {
      isNegative = false;
    }
    this.setState({ isModalShow: false });
    const updateSymbol = {
      symbol,
      price: setPrice,
      isReached: false,
      isNegative,
      isNotified: false,
      Date: new Date().toString(),
    };
    actions.setUpdateSymbolToWatchListWithPrice(updateSymbol);
  }

  handleAddSymbolWithExitingCheck = () => {
    const { setPrice } = this.state;
    const { actions, symbol, allSymbolWithPrice } = this.props;
    actions.findSymbolsAlreadyExistOrNotWithAllInfo(symbol, (isExist) => {
      const noOfSymbols = allSymbolWithPrice.length;
      if (isEmpty(setPrice)) {
        this.setState({ alertMessage: 'Please enter a price' });
      } else if (isExist) {
        this.setState({ isModalShow: true });
      } else if (noOfSymbols === 5) {
        this.setState({ alertMessage: 'You have to remove one for adding new' });
      } else {
        this.handleAddSymbol();
      }
    });
  }


  handleSubmit = (symbol) => {
    const { actions } = this.props;
    actions.setCurrentSymbol(symbol);
  }

  removeAlert = () => {
    this.setState({ alertMessage: '' });
  }

  render() {
    const {
      actions,
      allSymbols,
      symbolName,
      alreadyExist,
      marketPriceOfSymbol,
      notifySymbols,
    } = this.props;

    const { alertMessage } = this.state;
    let filterOptions = [];
    if (isEmpty()) {
      filterOptions = createFilterOptions({ options: allSymbols });
    }
    const { isModalShow, setPrice } = this.state;
    return (
      <div className="common-container">
        <SymbolNotifier
          notifySymbols={notifySymbols}
          removeNotification={actions.removeNotification}
        />
        <AlertNotifier
          message={alertMessage}
          removeAlert={this.removeAlert}
        />
        <h3 className="common-heading">
          Stock Symbol
          <span className="common-splitter">
          (
            {symbolName.concat(`, market price: ${marketPriceOfSymbol}`)}
          )
          </span>
        </h3>

        <ShowSearchBar
          filterOptions={filterOptions}
          handleSubmit={this.handleSubmit}
          handlePriceChange={this.handlePriceChange}
          handleAddSymbolWithExitingCheck={this.handleAddSymbolWithExitingCheck}
          setPrice={setPrice}
        />

        <ConfirmationModal
          isModalShow={isModalShow}
          alreadyExist={alreadyExist}
          handleCloseModal={this.handleCloseModal}
          handleSaveChanges={this.handleSaveChanges}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.uid,
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  allSymbols: state.stocks.allStockSymbols.allSymbol,
  symbolName: state.stocks.currentStockSymbol.name,
  alreadyExist: state.watchList.alreadyExistData,
  allSymbolWithPrice: state.watchList.symbolWatchListWithPrice,
  marketPriceOfSymbol: state.optionsChain.marketPriceOfSymbol,
  notifySymbols: state.notification.notificationSymbol,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setUpdateSymbolToWatchListWithPrice,
    findSymbolsAlreadyExistOrNotWithAllInfo,
    setALLSymbolToWatchListWithPrice,
    addUserAddedSymbolToWatchlist,
    findMarketPriceOfExistingSymbol,
    setMarketPriceOfSymbol,
    fetchCurrentMarketPriceOfSymbol,
    setNotification,
    updateIsReachedOfSymbol,
    removeNotification,
    setCurrentSymbol,
    setAllSymbol,
  }, dispatch),
});

StockSearch.propTypes = {
  symbol: PropTypes.string.isRequired,
  notifySymbols: PropTypes.instanceOf(Array).isRequired,
  actions: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  allSymbolWithPrice: PropTypes.instanceOf(Array).isRequired,
  marketPriceOfSymbol: PropTypes.bool.isRequired,
  allSymbols: PropTypes.instanceOf(Array).isRequired,
  alreadyExist: PropTypes.instanceOf(Object).isRequired,
  symbolName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockSearch);
