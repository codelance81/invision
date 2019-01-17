import React from 'react'

const OptionsChainHeader = () => (
  <thead className="thead">
    <tr>
      <th colSpan="6">Call</th>
      <th></th>
      <th colSpan="6">Put</th>
    </tr>
    <tr>
      <th>Last</th>
      <th>Change</th>
      <th>Bid</th>
      <th>Ask</th>
      <th>Volume</th>
      <th>Open Int</th>
      <th className="strike-head">Strike</th>
      <th>Last</th>
      <th>Change</th>
      <th>Bid</th>
      <th>Ask</th>
      <th>Volume</th>
      <th>Open Int</th>
    </tr>
  </thead>
)

export default OptionsChainHeader;