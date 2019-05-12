import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GlobalStyle } from 'styles';
import { store } from 'redux/store';
import Routes from 'views/RootRoutes';

const App = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={{}}>
        <React.Fragment>
          <Routes />
          <GlobalStyle />
        </React.Fragment>
      </ThemeProvider>
    </Router>
  </Provider>
);

export default App;
