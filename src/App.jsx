import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? [])  // creamos las funciones de React que van a usarse en varios componentes. Al asignarle el useState como un JSON.parse le decimos que busque en el localStorage el arreglo que esté guardado como anterior, si no hay nada, un arreglo vacío. Esto hace que si no cargamos ningún paciente, no muestra nada; pero si ya cargamos, al dar F5 la página va a tomar el que quedó en el local Storage del navegador
  const [paciente, setPaciente] = useState({})    // creamos un segundo state para un sólo Paciente individual
  
  useEffect(() => {   
    localStorage.setItem('pacientes', JSON.stringify(pacientes))    // se utiliza este "localStorage" para que el "useEffect" tome la información actualizada y la guarde en el Local Storage (en Inspeccionar > Application > Storage > Local Storage aparecen los arreglos guardados en la memoria)
  }, [pacientes])
  

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id) // la forma de eliminar es filtrando todos los id restantes del que se desea. Entonces al filtrar todos los restantes al id actual, va a mostrar esos sin el actual. Es de alguna manera eliminarlo y mostrar el resto.
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes= {pacientes} //agregamos las props con sus funciones dentro de cada componente que vayamos a usarlo
          setPacientes= {setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
