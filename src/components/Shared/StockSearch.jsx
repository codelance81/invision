import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import { isEmpty } from 'lodash';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const StockSearch = ({ symbol, allSymbols, symbolName, handleSubmit }) => {
  let filterOptions = [];
  if(isEmpty()) {
    filterOptions = createFilterOptions({ options: allSymbols });
  }
  return (
    <div className="common-container">
      <h3 className="common-heading">Stock Symbol <span className="common-splitter">({symbolName})</span></h3>
      <Row className="search-company" >
        <Col lg={12}>
          <div className="search-symbol mt-4">
            <Select
              value={symbol}
              options={allSymbols}
              filterOptions={filterOptions}
              onChange={(value) => { handleSubmit(value) }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default StockSearch;

