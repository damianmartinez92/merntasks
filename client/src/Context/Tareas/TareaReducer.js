import { TAREAS_PROYECTO, AGREGAR_TAREA } from "../../Types/index";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: state.tareas.filter(
          (tarea) => tarea.proyectoId === action.payload
        ),
      };
    case AGREGAR_TAREA: {
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };
    }
    default:
      return state;
  }
};
