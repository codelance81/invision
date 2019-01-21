import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const MiniChart = () => (
  <div>
    <TradingViewWidget
      symbol="NASDAQ:AAPL"
      theme={Themes.DARK}
      locale="fr"
      autosize
    />
  </div>
)

export default MiniChart;