import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const Adavance = () => (
  <div className="adavance" style={{ height: 220 }}>
    <div>
      <h3 className="common-heading">Adavance Features</h3>
      <p>
        Click for special features acess
        i.e. historical price, analyse etc.
      </p>
      <Link className="btn btn-success" to={routes.ADAVANCED_FEATURES} style={{ marginTop: 50 }}>ADAVANCED FEATURES</Link>
    </div>
  </div>
);

export default Adavance;
