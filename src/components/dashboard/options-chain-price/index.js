import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, isEmpty, isEqual } from 'lodash';
import OptionsChainHeader from './OptionsChainHeader';
import OptionsChainRow from './OptionsChainRow';
import {
  setOptionsChainPrice,
  setExpirationDate,
  setMarketPriceOfSymbol,
  setActiveExpiryDate,
} from '../../../state/options-chain-price/operations';
import { optionChainPriceAction } from '../../../state/options-chain-price/actionCreators';


class OptionsChainPrice extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchingExpirationDate();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.symbol, this.props.symbol)) {
      this.setState({ isLoading: true }, () => {
        this.fetchingExpirationDate();
      });
    }
  }

  fetchingExpirationDate = () => {
    const { symbol, actions } = this.props;
    actions.setExpirationDate(symbol).then((res) => {
      if (res) {
        this.handleExpiryDatesGetOptionChain();
      } else {
        this.setState({ isLoading: false });
        actions.optionChainPriceAction(null);
      }
    });
  };

  handleExpiryDatesGetOptionChain = () => {
    this.fetchingMarketPriceOfSymbol().then(() => {
      const { activeExpiryDate } = this.props;
      this.fetchingOptionsChainPrice(activeExpiryDate);
    });
  }

  fetchingMarketPriceOfSymbol = () => {
    const { symbol, actions } = this.props;
    return actions.setMarketPriceOfSymbol(symbol).then(() => {
      return true;
    });
  }

  fetchingOptionsChainPrice = (activeExpiryDate) => {
    const { symbol, actions } = this.props;
    actions.setOptionsChainPrice({ symbol, expirationDate: activeExpiryDate }).then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleDateChange = (selectedDate) => {
    const { actions } = this.props;
    actions.setActiveExpiryDate(selectedDate);
    this.fetchingOptionsChainPrice(selectedDate.value);
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <h2>Loding data...</h2>;

    const {
      marketPrice, callData, putData, expirationDates, activeExpiryDate,
    } = this.props;
    const isDataAvailable = (!isEmpty(callData) && !isEmpty(putData));

    return (
      <div className="optionChain">
        <h3 className="common-heading">
          Options chain price (
          {isDataAvailable && callData[0].underlying}
          )
        </h3>
        <h4>Select expiration date</h4>
        <Select
          value={activeExpiryDate}
          onChange={this.handleDateChange}
          options={expirationDates}
        />
        <Scrollbars style={{ height: 500, width: '100%' }}>
          <div className="option-chain-table" style={{ width: '1079px' }}>
            <Row>
              <Col md={12}>
                <OptionsChainHeader />
                <Scrollbars autoHide style={{ height: 400, width: '100%' }}>
                  {
                    isDataAvailable ? (
                      map(callData, (callDataOrderWise, index) => (
                        <OptionsChainRow
                          callData={callDataOrderWise}
                          key={index}
                          putData={putData[index]}
                          marketPrice={marketPrice}
                        />
                      ))) : <div>No data available</div>
                  }
                </Scrollbars>
              </Col>
            </Row>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  callData: state.optionsChain.callData,
  putData: state.optionsChain.putData,
  expirationDates: state.optionsChain.expirationDates,
  marketPrice: state.optionsChain.marketPriceOfSymbol,
  activeExpiryDate: state.optionsChain.activeExpiryDate,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setOptionsChainPrice,
    setExpirationDate,
    setMarketPriceOfSymbol,
    setActiveExpiryDate,
    optionChainPriceAction,
  }, dispatch),
});


OptionsChainPrice.propTypes = {
  symbol: PropTypes.string.isRequired,
  actions: PropTypes.func.isRequired,
  marketPrice: PropTypes.number.isRequired,
  callData: PropTypes.instanceOf(Array).isRequired,
  putData: PropTypes.instanceOf(Array).isRequired,
  expirationDates: PropTypes.instanceOf(Array).isRequired,
  activeExpiryDate: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsChainPrice);