import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store';
import { App } from './App';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#353945',
    },
    secondary: {
      main: '#e0afa0',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
