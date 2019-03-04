import React from 'react';
import { map, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const SymbolNotifier = ({ notifySymbols, removeNotification }) => (
  <div className="symbol-notifier">
    { !isEmpty(notifySymbols) && (
      map(notifySymbols, (data, key) => (
        <div className="alert alert-warning" key={key}>
          <Button onClick={() => { removeNotification(data); }} className="close" data-dismiss="alert" aria-label="close">&times;</Button>
          <strong>Price Reached! Track Complete!</strong>
          <p>
            <strong>
              `$
              {data.symbol}
              which was set for watch with price
              $
              {data.price}
              has been reached to
              $
              {data.currentMarketPrice}
              `
            </strong>
          </p>
        </div>
      ))
    )}
  </div>
);

SymbolNotifier.propTypes = {
  notifySymbols: PropTypes.instanceOf(Array).isRequired,
  removeNotification: PropTypes.func.isRequired,
};


const AlertNotifier = ({ message, removeAlert }) => (
  <div className="symbol-notifier">
    { !isEmpty(message) && (
      <div className="alert alert-success">
        <a href="javascipt:void(0);" onClick={() => { removeAlert(); }} className="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>{message}</strong>
      </div>
    )}
  </div>
);

AlertNotifier.propTypes = {
  message: PropTypes.string.isRequired,
  removeAlert: PropTypes.func.isRequired,
};


export {
  AlertNotifier,
  SymbolNotifier,
};
