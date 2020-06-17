import React, { Fragment, useState, useContext } from "react";

import proyectoContext from "../../Context/Proyectos/ProyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);

  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  // Lee el nombre del proyecto que agrega
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  // Submit de proyecto nuevo
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    // Valida el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    // Agrega al state
    agregarProyecto(proyecto);

    // Reinicia el form
    guardarProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          />
          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
