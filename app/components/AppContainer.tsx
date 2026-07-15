import { Outlet } from 'react-router-dom';
import BottomRow from './LCARS/bottomRow';
import LeftColumn from './LCARS/leftColumn';
import TopRow from './LCARS/topRow';

const AppContainer = () => (
  <div className="lcars-container">
    <TopRow />
    <div className="lcars-row">
      <LeftColumn />
      <div
        className="lcars-column u-7-8"
        style={{ width: 'calc(100% - 50px)' }}
      >
        <div className="lcars-row">
          <Outlet />
        </div>
      </div>
    </div>
    <BottomRow />
  </div>
);

export default AppContainer;
