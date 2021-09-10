import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./Store/reducer";
import MainContainer from "./Components/MainContainer/MainContainer";

import "./App.css";

function App() {
  return (
    <Provider store={createStore(reducer, composeWithDevTools())}>
      <div className="App">
        <MainContainer />
      </div>
    </Provider>
  );
}

export default App;
