import React from 'react';
import { Row, Col, InputGroup, Button, InputGroupAddon, Input} from 'reactstrap';

class StockSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      symbol: 'SPY'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ symbol: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.symbol);
  }

  render() {
    return (
      <Row className="search-company" >
        <Col lg="12">
          <form onSubmit={this.handleSubmit}>
            <label><small>Search Company e.g. SPY</small></label>
            <InputGroup>          
              <Input 
                className="form-group"
                value={this.state.symbol}
                name={this.state.symbol}
                onChange={this.handleChange}
              />
              <InputGroupAddon addonType="append"><Button  type="submit" color="success">Submit</Button></InputGroupAddon>
            </InputGroup>
          </form>
        </Col>
      </Row>
    )
  }
}

export default StockSearch;

