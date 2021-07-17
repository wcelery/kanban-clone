import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Board from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/">
            <Board />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
