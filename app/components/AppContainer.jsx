import React from 'react';
import TopRow from './LCARS/topRow';
import BottomRow from './LCARS/bottomRow';
import LeftColumn from './LCARS/leftColumn';

const AppContainer = ({ children }) => (
  <div className="lcars-container">
    <TopRow />
    <div className="lcars-row">
      <LeftColumn />
      <div className="lcars-column u-7-8" style={{ width: 'calc(100% - 50px)' }} >
        <div className="lcars-row" >
          {children}
        </div>
      </div>
    </div>
    <BottomRow />
  </div>
);

export default AppContainer;
