import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import Authorize from "./Authorize";
import SignIn from "./SignIn";
import Home from "./Home";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/authorize" component={Authorize} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
