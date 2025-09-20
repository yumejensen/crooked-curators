import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App'
import ActiveGame from './Views/ActiveGame';

const app = createRoot(document.getElementById('root'))

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
