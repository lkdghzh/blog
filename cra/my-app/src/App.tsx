import React from 'react';
import './App.css';
import CaptureValue from './components/captureValue';
import HooksRepeatRender from './components/hooksRepeatRender';
import Ts from './components/Ts';

import {
  Routes,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/captureValue">captureValue</Link></li>
        <li><Link to="/hooksRepeatRender">hooksRepeatRender</Link></li>
        <li><Link to="/ts">ts</Link></li>
      </ul>

      <Routes>
        <Route path="/captureValue" element={<CaptureValue />}/>
        <Route path="/hooksRepeatRender" element={<HooksRepeatRender />}/>
        <Route path="ts" element={<Ts />}/>
      </Routes>
    </div>
  );
}

export default App;
