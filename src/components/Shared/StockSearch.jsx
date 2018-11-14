import React from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import { forEach, isEmpty } from 'lodash';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: props.symbol,
      allSymbols: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
        !this.isCancelled && this.setState({ allSymbols: allSymbols });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    this.isCancelled = true;
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
    this.props.handleSubmit(e.value);
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

