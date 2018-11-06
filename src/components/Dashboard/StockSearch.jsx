import React from 'react';
import { Row, Col, InputGroup, Button, InputGroupAddon, Input} from 'reactstrap';
import axios from 'axios';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import { forEach, isEmpty } from 'lodash';

class StockSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: 'SPY',
      allSymbols: [],
      activeSymbols: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
      .then(res => {
        const data = res.data;							
        let allSymbols = [];
        forEach(data, symbol => {
          allSymbols.push({
            value: symbol.symbol,
            label: symbol.symbol
          })
        })
        this.setState({ allSymbols: allSymbols });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange = (symbol) => {
    if(!isEmpty(symbol)) {
      this.setState({ symbol : symbol.value}, () => {
        this.handleSubmit(symbol)
      });
      console.log(`Option selected:`, symbol);
    }
  }

  handleSubmit(e) {
    this.props.handleSubmit(this.state.symbol);
  }

  render() {
    const { symbol, allSymbols } = this.state
    let filterOptions = [];
    if(isEmpty()) {
      filterOptions = createFilterOptions({ options: allSymbols });
    }
    return (
      <Row className="search-company" >
        <Col lg="12">
          <div className="search-symbol mt-4">
            <Select
              value={symbol}
              options={allSymbols}
              filterOptions={filterOptions}
              onChange={this.handleChange}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default StockSearch;

