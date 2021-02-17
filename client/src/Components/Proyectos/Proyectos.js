import React, { useEffect, useContext } from "react";
import Sidebar from "../Layout/Sidebar";
import Barra from "../Layout/Barra";
import FormTarea from "../Tareas/FormTarea";
import ListadoTareas from "../Tareas/ListadoTareas";
import AuthContext from "../../Context/Autenticacion/AuthContext";

const Proyectos = () => {
  const authContext = useContext(AuthContext);

  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
