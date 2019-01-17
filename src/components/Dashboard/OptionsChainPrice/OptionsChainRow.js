import React from 'react';

const OptionsChainRow = ({callData, putData}) => (
  <tr style={{height:30}}>
    <td>{callData.last}</td>
    <td>{callData.change}</td>
    <td>{callData.bid}</td>
    <td>{callData.ask}</td>
    <td>{callData.volume}</td>
    <td>{callData.open_interest}</td>
    <td className="strike-row">{callData.strike}</td>
    <td>{putData.last}</td>
    <td>{putData.change}</td>
    <td>{putData.bid}</td>
    <td>{putData.ask}</td>
    <td>{putData.volume}</td>
    <td>{putData.open_interest}</td>
  </tr>
)

export default OptionsChainRow;
