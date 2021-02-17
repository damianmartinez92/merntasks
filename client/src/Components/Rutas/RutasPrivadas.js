import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/Autenticacion/AuthContext";

const RutasPrivadas = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default RutasPrivadas;
