import './App.css';
import React from "react";
import "./style/typography.css";
import "./style/general.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import IndexMenu from './components';

function App() {

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact  path={["/:id", "/menu/:id"]} children={<IndexMenu />} />
          </Switch>
        </Router>
    </div>
  );
}


export default App;
