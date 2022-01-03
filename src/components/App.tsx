import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
/* import Authorize from "./Authorize"; */
import { SignIn } from "./SignIn";
/* import Home from "./Home";
 *  */
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
