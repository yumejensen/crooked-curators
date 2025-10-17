import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App'
import './CSS/style.css'

import {
  ConfigProvider,
} from "./antdComponents";

const app = createRoot(document.getElementById('root'))

app.render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#058f6fff", // --cyan
          colorBgLayout: "#611530ff", // --maroonbg
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#F0E7CA", // --cream
        },
      }}
    >

      <App />
    </ConfigProvider>
  </BrowserRouter>
);
