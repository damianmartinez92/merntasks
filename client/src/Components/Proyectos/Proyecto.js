import React, { useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  // Context de proyecto
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;

  // Context de tareas
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  // Al hacer click seteamos proyecto y tarea por el ID
  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
