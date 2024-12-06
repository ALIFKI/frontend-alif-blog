import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/index.tsx';
import NotFoundPage from './pages/404Page/index.tsx';
import ArticlePage from './pages/ArticlePage/index.tsx';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './lib/redux/index.ts';
import ScrollToTop from './components/ScrollToTop/index.tsx';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <BrowserRouter>
        <ScrollToTop></ScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/article/:articleId" element={<ArticlePage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    ,
  </React.StrictMode>
);
