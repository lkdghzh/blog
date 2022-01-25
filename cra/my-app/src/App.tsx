import React from 'react';
import './App.css';
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
        <li><Link to="/hooksRepeatRender">hooksRepeatRender</Link></li>
        <li><Link to="/ts">ts</Link></li>
      </ul>

      <Routes>
        <Route path="/hooksRepeatRender" element={<HooksRepeatRender />}>
        </Route>
        <Route path="ts" element={<Ts />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
