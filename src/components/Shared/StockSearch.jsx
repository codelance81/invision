import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import { isEmpty, isEqual } from 'lodash';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSymbolToWatchListWithPrice } from '../../state/currentSymbol/operations'

import { db } from '../../state/localFirebase/config';

const rootRef = db.ref();

class StockSearch extends React.Component {

  state = {
    setPrice: null,
    isModalShow: false,
    previousSetPrice: null,
    pathKey: null
  }

  handlePriceChange = (e) => {
    this.setState({ setPrice: e.target.value });
  }

  handleCloseModal = () => {
    this.setState({ isModalShow: false });
  }

  handleAddSymbol = () => {
    const { symbol, actions } = this.props;
    const { setPrice } = this.state;
    this.setState({ isModalShow: false });
    const addSymbol = { symbol:symbol, price: setPrice, Date: new Date().toString() };
    actions.setSymbolToWatchListWithPrice(addSymbol);
    this.setState({ setPrice: null });
  }

  handleSaveChanges = () => { 
    const { symbol, userId } = this.props;
    const { setPrice, pathKey } = this.state;
    this.setState({ isModalShow: false });
    const addSymbol = { symbol:symbol, price: setPrice, Date: new Date().toString() };
    db.ref().child(`/symboldataWithPrice/${userId}/${pathKey}`).update(addSymbol);
  }

  handleAddSymbolWithPrice = () => {
    const { setPrice } = this.state;
    if(isEmpty(setPrice)){q
      alert("please set price")
    }
    else{
      const { symbol, userId } = this.props;
  
      const symbolData = rootRef.child('symboldataWithPrice').child(userId).orderByKey();

      symbolData.once('value', snap => {
        let isSymbolExist = false;
        snap.forEach(child => {     
          const setSymbol = child.val().symbol;
          if(isEqual(setSymbol, symbol)) {
            this.setState({ 
              previousSetPrice: child.val().price,
              pathKey: child.key 
            })
            isSymbolExist = true;
          }     
        });
        if(isSymbolExist){
          this.setState({ isModalShow: true })
        }else{
          this.setState({ previousSetPrice: null })
          this.handleAddSymbol();
        } 
      });
    }   
  }
  
  render(){
    const { symbol, allSymbols, symbolName, handleSubmit } = this.props;
    let filterOptions = [];
    if(isEmpty()) {
      filterOptions = createFilterOptions({ options: allSymbols });
    }
    const { isModalShow, setPrice, previousSetPrice } = this.state;
    return (
      <div className="common-container">
        <h3 className="common-heading">Stock Symbol <span className="common-splitter">({symbolName})</span></h3>
        <Row className="search-company" >
          <Col lg={8}>
            <div className="search-symbol mt-4">
              <Select
                value={symbol}
                options={allSymbols}
                filterOptions={filterOptions}
                onChange={(value) => { handleSubmit(value) }}
              />
            </div>
          </Col>
          <Col lg={2}>
            <div className="search-symbol mt-4">
              <input type="number" 
                placeholder="enter price e.g. 155" 
                onChange={this.handlePriceChange} 
                value={setPrice}
              />
            </div>
          </Col>
          <Col lg={2}>
            <div className="search-symbol mt-4">
              <Button variant="danger" onClick={this.handleAddSymbolWithPrice}>Add TO Watchlist</Button>
            </div>
          </Col>
        </Row>

        <Modal show={isModalShow} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Invision</Modal.Title>
          </Modal.Header>
          <Modal.Body>Symbol {symbol} already exists with price {previousSetPrice}, do you want to update?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>       
      </div>
    );
    
  }
} 

const mapStateToProps = (state) => ({
  userId: state.auth.uid,
  symbol: state.stocks.currentStockSymbol.currentSymbol,
  allSymbols: state.stocks.allStockSymbols.allSymbol,
  symbolName: state.stocks.currentStockSymbol.name
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setSymbolToWatchListWithPrice
  },dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StockSearch);

