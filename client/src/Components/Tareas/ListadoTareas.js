import React, { Fragment, useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";

import Tarea from "./Tarea";

const ListadoTareas = () => {
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectoContext;

  if (!proyecto) return <h2>Selecciona un Proyecto</h2>;

  // Array destructuring para extraer proyecto actual
  const [proyectoActual] = proyecto;

  const tareasProyecto = [
    { nombre: "Elegir Plataforma", estado: true },
    { nombre: "Elegir Colores", estado: false },
    { nombre: "Elegir Hosting", estado: true },
  ];

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasProyecto.map((tarea, i) => <Tarea tarea={tarea} key={i} />)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual.id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
