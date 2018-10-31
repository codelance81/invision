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
      <Row>
        <Col lg="12">
          <form onSubmit={this.handleSubmit}>
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



     {/* <Row>
        <Col lg = "12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                value={this.state.symbol} 
                name={this.state.symbol} 
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </form>
        </Col>
      </Row> */}