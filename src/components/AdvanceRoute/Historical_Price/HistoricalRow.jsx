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
    
    {data.yearlyAverage < 0 ? 
      <td className="historical-row-red">{data.yearlyAverage}%</td>
      : <td className="historical-row-green">+{data.yearlyAverage}%</td>
    }

  </tr>
)

export default HistoricalRow;
