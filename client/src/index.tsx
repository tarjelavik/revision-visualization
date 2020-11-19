import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "focus-visible/dist/focus-visible"

import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} resetCSS={true}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
