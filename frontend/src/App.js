import React from 'react';
import store from './reduxSetup/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SiteContainer from './containers/SiteContainer/SiteContainer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <SiteContainer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
