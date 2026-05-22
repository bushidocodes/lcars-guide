import { NavLink } from 'react-router-dom';

export default () => (
  <div className="lcars-column u-1-8" style={{ width: 50 }}>
    <ul className="lcars-menu left">
      <li className="lcars-blue-bg tall">
        <NavLink to="/seasons/1"><span className="lcars-link" style={{ fontSize: 24, marginLeft: '20px' }}>I</span></NavLink>
      </li>
      <li className="lcars-blue-bg tall">
        <NavLink to="/seasons/2"><span className="right" style={{ fontSize: 24 }}>II</span></NavLink>
      </li>
      <li className="lcars-blue-bg tall">
        <NavLink to="/seasons/3"><span className="right" style={{ fontSize: 24 }}>III</span></NavLink>
      </li>
      <li className="lcars-blue-bg tall large-gap">
        <NavLink to="/seasons/4"><span className="right" style={{ fontSize: 24 }}>IV</span></NavLink>
      </li>
      <li className="lcars-tan-bg tall">
        <NavLink to="/seasons/5"><span className="right" style={{ fontSize: 24 }}>V</span></NavLink>
      </li>
      <li className="lcars-tan-bg tall">
        <NavLink to="/seasons/6"><span className="right" style={{ fontSize: 24 }}>VI</span></NavLink>
      </li>
      <li className="lcars-tan-bg tall">
        <NavLink to="/seasons/7"><span className="right" style={{ fontSize: 24 }}>VII</span></NavLink>
      </li>
    </ul>
  </div>
);
