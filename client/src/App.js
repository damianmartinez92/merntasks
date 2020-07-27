import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routes
import Login from "./Components/Auth/Login";
import NuevaCuenta from "./Components/Auth/NuevaCuenta";
import Proyectos from "./Components/Proyectos/Proyectos";

import ProyectoState from "./Context/Proyectos/ProyectoState";
import TareaState from "./Context/Tareas/TareaState";
import AlertaState from "./Context/Alertas/AlertaState";
import AuthState from "./Context/Autenticacion/AuthState";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <Route exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
