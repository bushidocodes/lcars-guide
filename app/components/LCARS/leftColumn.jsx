import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="lcars-column u-1-8" style={{ width: 50 }}>
    <ul className="lcars-menu left">
      <Link to="seasons/1"><li className="lcars-blue-bg tall">
        <span className="lcars-link" style={{ fontSize: 24, marginLeft: '20px' }}>I</span>
      </li></Link>
      <Link to="seasons/2"><li className="lcars-blue-bg tall">
        <span className="right" style={{ fontSize: 24 }}>II</span>
      </li></Link>
      <Link to="seasons/3"><li className="lcars-blue-bg tall">
        <span className="right" style={{ fontSize: 24 }}>III</span>
      </li></Link>
      <Link to="seasons/4"><li className="lcars-blue-bg tall large-gap">
        <span className="right" style={{ fontSize: 24 }}>IV</span>
      </li></Link>
      <Link to="seasons/5"><li className="lcars-tan-bg tall">
        <span className="right" style={{ fontSize: 24 }}>V</span>
      </li></Link>
      <Link to="seasons/6"><li className="lcars-tan-bg tall">
        <span className="right" style={{ fontSize: 24 }}>VI</span>
      </li></Link>
      <Link to="seasons/7"><li className="lcars-tan-bg tall">
        <span className="right" style={{ fontSize: 24 }}>VII</span>
      </li></Link>
    </ul>
  </div>
);
