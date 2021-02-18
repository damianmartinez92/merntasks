import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const FormTarea = () => {
  // Extrae proyecto del context
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  const tareasContext = useContext(TareaContext);
  const {
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  if (!proyecto) return null;

  // Array destructuring para extraer las tareas del proyecto actual
  const [proyectoActual] = proyecto;
  const { nombre } = tarea;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Detecta si es nueva tarea o edición
    if (tareaSeleccionada === null) {
      // Agregar tarea
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      // Limpia tarea seleccionada
      limpiarTarea();
    }

    // Obtener tareas y filtrar
    obtenerTareas(proyectoActual.id);

    // reiniciar form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio.</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
