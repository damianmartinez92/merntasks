import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../Types/index";
import clienteAxios from "../../Config/Axios";
import tokenAuth from "../../Config/token";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log("respLog", respuesta.data);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response.data);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Funcion para enviar token por headers
      tokenAuth(token);
    }
    try {
      const resp = await clienteAxios.get("/api/auth");
      // console.log(resp);
      dispatch({
        type: OBTENER_USUARIO,
        payload: resp.data.usuario,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      const resp = await clienteAxios.post("/api/auth", datos);
      console.log(resp);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: resp.data,
      });
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
