import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

class MiniChart extends React.Component{
  render(){
    return(
      <div>
        <h2>mini chart</h2>
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.DARK}
          locale="fr"
          autosize
        />
      </div>
    )
  }
}


export default MiniChart;