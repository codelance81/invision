import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

const HistoricalColumn = ({ data }) => (
  <td>
    <div className={classnames({
      'close-price-data': true,
      red: isEqual('NA', data),
    })}
    >
      {isEqual(data, 'NA') ? data : '$'.concat(parseFloat(data).toFixed(2)) }
    </div>
  </td>
);

HistoricalColumn.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default HistoricalColumn;
