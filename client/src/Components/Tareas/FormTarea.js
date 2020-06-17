import React, { useContext } from "react";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";

const FormTarea = () => {
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  if (!proyecto) return null;

  // Array destructuring para extraer las tareas del proyecto actual
  // const [proyectoActual] = proyecto;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea..."
            name="nombre"
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
