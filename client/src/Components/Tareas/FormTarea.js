import React, { useContext, useState } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";

const FormTarea = () => {
  // Extrae proyecto del context
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  const tareasContext = useContext(TareaContext);
  const { agregarTarea } = tareasContext;

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

    // Pasar validacion

    // Agregar tarea
    tarea.proyectoId = proyectoActual.id;
    tarea.estado = false;
    agregarTarea(tarea);
    // reiniciar form
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
            value="Agregar Tarea"
          />
        </div>
      </form>
    </div>
  );
};

export default FormTarea;
