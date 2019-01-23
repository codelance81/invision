import React from 'react';

class MiniChart extends React.Component {

  componentDidMount() {
    const { symbol } = this.props;
    const scriptObject = document.createElement('script');
    const scriptContent = `{"symbol": "${symbol}","width": "100%","height": 210,"locale": "in","dateRange": "1y","colorTheme": "light","trendLineColor": "#37a6ef","underLineColor": "#e3f2fd","isTransparent": false,"autosize": false,"largeChartUrl": ""}`;
    scriptObject.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    scriptObject.innerHTML = scriptContent;
    this.miniChart.innerHTML = '';
    this.miniChart.append(scriptObject);
  }
  render() {
    return (
      <div>
        <h3 className="common-heading">Mini Chart</h3>
        <div id="mini-chart" ref={(ref) => { this.miniChart = ref }} />
      </div>
    );
  }
}

export default MiniChart;