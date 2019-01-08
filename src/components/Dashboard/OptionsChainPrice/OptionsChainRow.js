import React from 'react';

const OptionsChainCallsRow = ({data}) => (
  <tr>
    <td>{data.last}</td>
    <td>{data.netChange}</td>
    <td>{data.bid}</td>
    <td>{data.ask}</td>
    <td>{data.totalVolume}</td>
    <td>{data.openInterest}</td>
    <td>{data.strikePrice}</td>
  </tr>
)

const OptionsChainPutsRow = ({data}) => (
  <tr>
    <td>{data.last}</td>
    <td>{data.netChange}</td>
    <td>{data.bid}</td>
    <td>{data.ask}</td>
    <td>{data.totalVolume}</td>
    <td>{data.openInterest}</td>
    <td>{data.strikePrice}</td>
  </tr> 
)

export { 
  OptionsChainCallsRow,
  OptionsChainPutsRow
};



