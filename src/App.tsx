import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from './views/errors/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/*" element={<Views />} />
            </Routes>
          </Router>
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
