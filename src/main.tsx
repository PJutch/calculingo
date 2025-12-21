import React from 'react';
import ReactDOM from 'react-dom/client';
import { MathJaxContext } from 'better-react-mathjax';
import Menu from './Menu';
import Task, {RandomTaskRedirect} from './Task';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Browse from './Browse';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <MathJaxContext>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/solve/:collection/:task" element={<Task />} />
          <Route path="/solve/:collection" element={<RandomTaskRedirect />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </MathJaxContext>
    </BrowserRouter>
  </React.StrictMode>
);
