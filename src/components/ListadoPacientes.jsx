import { useEffect } from 'react'
import Paciente from './Paciente'

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {

  // useEffect( () => {    // el useEffect se encarga de ejecutar una acción siempre que alguna variable o componente cambie.
  //   if (pacientes.length > 0) {   // si no se coloca el "if" con el condicional, va a ejecutar siempre de entrada el useEffect. En este caso, si el .length > 0 entonces imprime en consola "Nuevo Paciente", sino no imprime neda
  //     console.log("Nuevo Paciente");
  //   }
  // },[pacientes])


  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll"> {/* el h-screen para que tenga el mismo tamaño y el "overflow-y-scroll" para que tenga scroll sólo este div*/}
      
      {pacientes && pacientes.length ? (  // hacemos una validación, de que si hay algún paciente agregado, muestra el header siguiente
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className='text-xl mt-5 mb-5 text-center'>Administra tus {' '} 
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>
    
          {pacientes.map( paciente => (
            <Paciente
              key={paciente.id}   // el key llama al id (la función para generar un código alfanumérico random desde Formulario)
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      ) : ( // y si no hay nigún paciente agregado muestra este otro header
        <>
        <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className='text-xl mt-5 mb-5 text-center'>Comienza a agregar pacientes {' '} 
            <span className='text-indigo-600 font-bold'>y aparecerán aquí</span>
          </p>
        </>
      )}

    </div>
  )
}

export default ListadoPacientes