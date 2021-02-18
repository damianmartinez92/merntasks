import React, { useReducer } from "react";
import TareaReducer from "./TareaReducer";
import TareaContext from "./TareaContext";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../Types/index";
import clienteAxios from "../../Config/Axios";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Carga de tareas segun proyecto
  const obtenerTareas = async (proyecto) => {
    try {
      const res = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: res.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Agrega tarea
  const agregarTarea = async (proyecto) => {
    try {
      const res = await clienteAxios.post("/api/tareas", proyecto);
      dispatch({
        type: AGREGAR_TAREA,
        payload: res.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const actualizarTarea = async (tarea) => {
    try {
      const res = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: res.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
