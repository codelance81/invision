import React from 'react';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import HistoricalColumn from './HistoricalColumn';

const HistoricalRow = ({ data }) => (
  <tr>
    <td className="year">{data.year}</td>
    {
      map(data.monthlyData, (perMonthData, i) => (
        <HistoricalColumn data={perMonthData} key={`td${i}`} />
      ))
    }
    {
      data.yearlyAverage < 0
        ? (
          <td className="historical-row-red">
            {data.yearlyAverage}
            %
          </td>
        )
        : (
          <td className="historical-row-green">
            +
            {data.yearlyAverage}
            %
          </td>
        )
    }
  </tr>
);


HistoricalRow.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default HistoricalRow;
