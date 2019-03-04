import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class WatchListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.data.price,
    };
  }

  handleChange = (e) => {
    this.setState({ price: e.target.value });
  }

  render() {
    const { price } = this.state;
    const { data, handleDeletWatchList } = this.props;
    return (
      <tr>
        <td>{data.symbol}</td>
        <td>{price}</td>
        <td>{data.isReached.toString()}</td>
        <td>{data.date}</td>
        <td>
          <div>
            <Button className="btn btn-danger" onClick={() => handleDeletWatchList({ pathKey: data.pathKey, symbol: data.symbol })}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}

WatchListRow.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  handleDeletWatchList: PropTypes.func.isRequired,
};

export default WatchListRow;
