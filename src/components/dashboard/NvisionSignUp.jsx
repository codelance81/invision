import React from 'react'
import { Link } from 'react-router-dom'

const NvisionSignUp = () => (
  <div className="nVisionSignUp">
    <h3 className="common-heading">NVision SignUp</h3>
    <p>Signup to the Invision to access the advance stock informations.</p>
    <Link className="btn btn-success" to="/signin">NVISION SIGNUP</Link>
  </div>
);

export default NvisionSignUp;
