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
import tokenAuth from "./Config/token";
// COMPONENTE PARA VALIDAR USUARIO POR PANTALLA
import RutasPrivadas from "./Components/Rutas/RutasPrivadas";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    tokenAuth(token);
  }

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutasPrivadas exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
