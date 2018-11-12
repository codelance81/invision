import React from 'react'
import classnames from 'classnames'
import { isEqual } from 'lodash'

const HistoricalColumn = ({data}) => (  
  <td>
    <div 
      className={classnames({
        'close-price-data' : true,
        'red': isEqual('NA', data)
      })}
    >{data}</div>
  </td>

)
export default HistoricalColumn;
