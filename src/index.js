// App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider } from '@mantine/core';
import App from './App'; // Your main App component

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
