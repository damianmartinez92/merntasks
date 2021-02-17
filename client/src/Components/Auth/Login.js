import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import AuthContext from "../../Context/Autenticacion/AuthContext";

const Login = (props) => {
  const alertaContext = useContext(AlertaContext);
  const authContext = useContext(AuthContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const { mensaje, autenticado, iniciarSesion } = authContext;

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    iniciarSesion({ email, password });
  };

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history]);

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
