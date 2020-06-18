import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routes
import Login from "./Components/Auth/Login";
import NuevaCuenta from "./Components/Auth/NuevaCuenta";
import Proyectos from "./Components/Proyectos/Proyectos";

import ProyectoState from "./Context/Proyectos/ProyectoState";
import TareaState from "./Context/Tareas/TareaState";

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
            <Route exact path="/proyectos" component={Proyectos} />
          </Switch>
        </Router>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
