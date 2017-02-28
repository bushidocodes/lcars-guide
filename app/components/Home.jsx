import React from 'react';
import TopRow from './LCARS/topRow';
import BottomRow from './LCARS/bottomRow';

const Home = ({ children }) => (
  <div className="lcars-container">
    <TopRow />
    <div className="lcars-row">
      <div className="lcars-column u-1-8">
        <ul className="lcars-menu left">
          <li className="lcars-blue-bg tall"><a href="#">One</a></li>
          <li className="lcars-blue-bg tall">Two</li>
          <li className="lcars-blue-bg tall"><a href="#">Three</a></li>
          <li className="lcars-blue-bg tall large-gap"><a href="#">Four</a></li>
          <li className="lcars-tan-bg tall"><a href="#">Five</a></li>
          <li className="lcars-tan-bg tall"><a href="#">Six</a></li>
          <li className="lcars-tan-bg tall"><a href="#">Seven</a></li>
        </ul>
      </div>
      <div className="lcars-column u-6-8">
        <div className="lcars-row">
          { children }
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
