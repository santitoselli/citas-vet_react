import swal from "sweetalert"

const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {

  const {nombre, propietario, email, fecha, sintomas, id} = paciente  // hacemos un destructuring para llamar las propiedades de "paciente" directamente con sus nombres. De lo contrario habría que poner {paciente.nombre}, {paciente.propietario}, etc

  const handleEliminar = () => {    // creamos la función para que pregunte si se desea eliminar y accione al presionar ELIMINAR
    
    return (
      swal({
          title: 'Eliminar paciente?',
          text: 'Si eliminas no podrás deshacer',
          icon: 'warning',
          buttons: ['No', 'Si']
          })
      .then((respuesta) => {
          if (respuesta) {
            swal({text: 'El paciente ha sido eliminado', icon: 'success'})        
            eliminarPaciente(id)
          } else {
              swal({text: 'El paciente no ha sido eliminado', icon: 'error'})  
          }
      })
  )}

  return (
    <div className="mx-5 my-5 bg-indigo-200 shadow-md px-5 py-5 rounded-xl">
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre:{' '}
          <span className=" font-normal normal-case" >{nombre}</span> {/* llamamos la propiedad del useState agregado en formulario*/}
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Propietario:{' '}
          <span className=" font-normal normal-case" >{propietario}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Email:{' '}
          <span className=" font-normal normal-case" >{email}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta:{' '}
          <span className=" font-normal normal-case" >{fecha}</span>
        </p>
        <p className="font-bold mb-2 text-gray-700 uppercase">Síntomas:{' '}
          <span className=" font-normal normal-case" >{sintomas}</span>
        </p>
        <div>
          <button 
            type="button" 
            className="py-2 px-10 mr-5 bg-indigo-700 text-white font-bold uppercase rounded-lg md:my-2" 
            onClick={() => setPaciente(paciente)}
          >Editar</button>
          <button 
            type="button" 
            className="py-2 px-10 mr-5 bg-red-600 text-white font-bold uppercase rounded-lg md:my-2"
            onClick={handleEliminar}  // asignamos la función de "handleEliminar" para borrar el State donde se clickea el botón
          >Eliminar</button>
        </div>

      </div>
  )
}

export default Paciente