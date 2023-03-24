import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './input.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
//import { initializeApp } from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';

console.log(process.env.REACT_APP_PROJECT_ID);
console.log("deployed");
// Firebase configuration with secrets from .env
const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID
 };

// Initialize Firebase and export auth for use in AuthManager module
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();