import React, { version } from 'react';
import ReactDOM from 'react-dom/client';
import { MathJaxContext } from 'better-react-mathjax';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Task, { RandomTaskRedirect } from './Task';
import Browse from './Browse';
import Edit from './Edit';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import '../env.d'
import Login from './Login';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <MathJaxContext config={{
          options: {
            // enableMenu: false,
            menuOptions: { settings: { speech: false, braille: false } }
          }
        }} version={4}>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/solve/:collection/:task" element={<Task />} />
            <Route path="/solve/:collection" element={<RandomTaskRedirect />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/edit/:collection" element={<Edit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MathJaxContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
