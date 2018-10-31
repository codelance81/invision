import React from 'react';

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
      <div className="row">
        <div className="col-lg-12">
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
        </div>
      </div>
    )
  }
}

export default StockSearch;