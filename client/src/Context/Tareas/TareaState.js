import React, { useReducer } from "react";
import TareaReducer from "./TareaReducer";
import TareaContext from "./TareaContext";

import { TAREAS_PROYECTO, AGREGAR_TAREA } from "../../Types/index";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      { nombre: "Elegir Hosting", estado: true, proyectoId: 3 },
      { nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      { nombre: "Elegir Hosting", estado: true, proyectoId: 3 },
    ],
    tareasProyecto: null,
  };
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Carga de tareas segun proyecto
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  // Agrega tarea
  const agregarTarea = (tarea) => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        obtenerTareas,
        agregarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
