import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import { AuthProvider } from "./context/AuthContext";

import React from 'react';
import ReactDOM from 'react-dom/client';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(

  <AuthProvider>
    <App />
  </AuthProvider>

);
