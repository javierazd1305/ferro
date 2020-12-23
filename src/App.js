
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Feature from "./components/Features/index";
import DPF from "./components/DPF/index";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Feature} />
        <Route path="/dpf" strict component={DPF} />
      </Router>
    </div>
  );
}

export default App;
