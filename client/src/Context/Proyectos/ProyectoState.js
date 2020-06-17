import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import ProyectoContext from "./ProyectoContext";
import ProyectoReducer from "./ProyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../Types/index";

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Proyecto 1" },
    { id: 2, nombre: "Proyecto 2" },
    { id: 3, nombre: "Proyecto 3" },
  ];
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ProyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  // Carga de PROYECTOS
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  // Agrega un proyecto
  const agregarProyecto = (proyecto) => {
    proyecto.id = uuidv4();
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  // Selecciona el proyecto
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = (proyectoId) => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId,
    });
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
