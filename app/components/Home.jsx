import React from 'react';
import { Link } from 'react-router';
import TopRow from './LCARS/topRow';
import BottomRow from './LCARS/bottomRow';

const Home = ({ children }) => (
  <div className="lcars-container">
    <TopRow />
    <div className="lcars-row">
      <div className="lcars-column u-1-8">
        <ul className="lcars-menu left">
          <Link to="seasons/1"><li className="lcars-blue-bg tall">One</li></Link>
          <Link to="seasons/2"><li className="lcars-blue-bg tall">Two</li></Link>
          <Link to="seasons/3"><li className="lcars-blue-bg tall">Three</li></Link>
          <Link to="seasons/4"><li className="lcars-blue-bg tall large-gap">Four</li></Link>
          <Link to="seasons/5"><li className="lcars-tan-bg tall">Five</li></Link>
          <Link to="seasons/6"><li className="lcars-tan-bg tall">Six</li></Link>
          <Link to="seasons/7"><li className="lcars-tan-bg tall">Seven</li></Link>
        </ul>
      </div>
      <div className="lcars-column u-6-8">
        <div className="lcars-row">
          {children}
        </div>
      </div>
      <div className="lcars-column u-1-8">
        <ul className="lcars-menu right" >
          <li className="lcars-tan-bg tall" />
          <li className="lcars-tan-bg tall" />
          <li className="lcars-tan-bg tall" />
          <li className="lcars-tan-bg tall large-gap" />
          <li className="lcars-blue-bg tall" />
          <li className="lcars-blue-bg tall" />
          <li className="lcars-blue-bg tall" />
        </ul>
      </div>
    </div>
    <BottomRow />
  </div>
);


export default Home;
