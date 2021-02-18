import React, { Fragment, useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Tarea from "./Tarea";

const ListadoTareas = () => {
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectoContext;

  const tareasContext = useContext(TareaContext);
  const { tareasProyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un Proyecto</h2>;

  // Array destructuring para extraer proyecto actual
  const [proyectoActual] = proyecto;

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
