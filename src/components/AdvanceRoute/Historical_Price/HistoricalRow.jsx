import React from 'react'
import { map } from 'lodash'
import HistoricalColumn from './HistoricalColumn'

const HistoricalRow = ({data}) => (
  <tr>
    <td className="year">{data.year}</td>
    {
      map(data.monthlyData, (data, i) => (
        <HistoricalColumn data={data} key={`td${i}`}/>
      ))
    }
    <td>{data.yearlyAverage}</td>
  </tr>
)

export default HistoricalRow;
