import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

try {
  console.log('Mounting React application...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />
  );
  console.log('Mount successful!');
} catch (error) {
  console.error('CRITICAL: App failed to mount:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: sans-serif; text-align: center;">
      <h1>Mounting Error</h1>
      <pre style="text-align: left; background: #eee; padding: 10px; border-radius: 5px;">${error.message}</pre>
      <p>Check the console for more details.</p>
    </div>
  `;
}
