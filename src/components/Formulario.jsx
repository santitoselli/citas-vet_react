import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => { // se llaman las "props" que asigné en el App.js, tienen que estar entre {}
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [error, setError] = useState(false) // le asignamos un valor inicial "false" al state de Error

  useEffect( () => {    // este useEffect da la acción asignada con a cada arreglo [paciente] sobre el botón "EDITAR" (que le asignamos un onClick={setPaciente}), de manera que lee los datos cargados en la memoria (llamando a los setAlgo) y los vuelve a cargar en el formulario, si es que hay algo escrito (.length > 0)
    if (Object.keys(paciente).length > 0) { // se llama al Object.keys(paciente) para que aplique al "id" del cual se presiona "EDITAR"
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])
  
  const generarId = () => {     // creamos la fn "generarId" para crear un número aleatorio basado en 2 generadores de código
    const random = Math.random().toString(36).substr(2) // un número random decimal, transformado a string de "base=36" borrándoles el "0,"
    const fecha = Date.now().toString(36)   // un número random de la fecha del momento, transformando a string de "base=36"
    
    return random + fecha  // nos devuelve una suma de los dos números, resultando un código alfanumérico único.
  }

  /* El método ".toString(base)" puede utilizar "base=2" para valores binarios con caracteres 0 y 1, "base=16" para valores hex como los colores en los que los caracteres van de 0...9 y A...F, y en "base=36" para valores alfanuméricos con caracteres que van de 0...9 y A...Z */
  
  
  const handleSubmit = (e) => {
    e.preventDefault()  // evitamos que recargue la página al dar click en Submit

    // Validación del Formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) { // validamos si en alguno de los campos hay un string vacío
          
      setError(true)  // acá le decimos que si hay campos vacíos cambia el valor a "true"
      return  // cortamos la ejecucuón
    }
    setError(false) // si no hay espacios vacíos mantiene o vuelve al estado de "false" original

    const objetoPaciente= { //creamos el objeto para que la función "setPacientes" importada utilice todos los elementos del arreglo
      nombre, propietario, email, fecha, sintomas /*id: generarId() - ahora el id lo genera el "if" de abajo*/
    }

    if (paciente.id) {
      objetoPaciente.id = paciente.id   // el "id" del objetoPaciente generado lo tiene que sacar del paciente con "id" ya asignado
      // Editando el Paciente
      
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState) // creamos una variable de paciente actualizado. Lo que hace es iterar con un ".map" en todos los pacientes agregados. El parámetro "pacienteState" hace referencia a los valores que están en el state o la memoria (antes de guardar cambios). Entonces, si se presiona EDITAR, hace la comprobación con el "pacienteState === paciente.id", si es true, entonces aplica el arreglo objetoPaciente nuevo. Si no, o si no se presiona EDITAR, vuelve al "pacienteState" (original, previo al cambio)
        
      setPacientes(pacientesActualizados) // ahora llamamos a la función "setPacientes" con el argumento de la nueva variable
      setPaciente({})   // luego de aplicar, se llama al "setPaciente({})" con un estado vacío para que vuelva el formulario al estado inicial (campos vacíos y el botón "AGREGAR PACIENTE")

    } else {
      // Nuevo Paciente
      objetoPaciente.id = generarId() // al crear un nuevo paciente genera por única vez el "id"
      setPacientes([...pacientes, objetoPaciente])  // llamamos la función importada con el objeto creado, y como argumento le decimos que genere un paciente que copia el arreglo original con el spread "..." y devolvemos el nuevo objeto. En react NO hay que modificar con ".push" o ".pop" un arreglo ya que modifica el original. Se debe utilizar siempre el "setXxxx"
    }
     
    // REINICIAR FORM. Debemos reiniciar el form. Sino React está constantemente mostrándonos lo que se agregó últimamente en los campos.

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  
  return (
    <div className="md:w-1/2 lg:2-2/5 mx-3">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-5">
          Añade Pacientes y {''}  {/* el "{''}" añade un espacio bajo código JS */}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-xl py-10 px-5 mb-10'>
          {error &&// acá le decimos con el "&&" que si el valor de "error" es "true" que cree la ventana que genera el component <Error/>
           <Error mensaje='Todos los campos son obligatorios' /> // llamamos el componente Error y le asignamos un valor (string) al mensaje
            }

          <div className='mb-5'>
            <label htmlFor='mascota' className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input id='mascota' type="text" placeholder="Nombre de la mascota..." className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={nombre} onChange= {(e) => setNombre(e.target.value)} />
          </div>
          
          <div className='mb-5'>
            <label htmlFor='propietario' className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input id='propietario' type="text" placeholder="Nombre del propietario..." className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={propietario} onChange= {(e) => setPropietario(e.target.value)} />
          </div>
          
          <div className='mb-5'>
            <label htmlFor='email' className="block text-gray-700 uppercase font-bold">E-mail</label>
            <input id='email' type="email" placeholder="e-mail del Propietario..." className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={email} onChange= {(e) => setEmail(e.target.value)} />
          </div>
          
          <div className='mb-5'>
            <label htmlFor='date' className="block text-gray-700 uppercase font-bold">Fecha Alta</label>
            <input id='alta' type="date" placeholder="e-mail del Propietario..." className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={fecha} onChange= {(e) => setFecha(e.target.value)} />
          </div>
          
          <div className='mb-5'>
            <label htmlFor='sintomas' className="block text-gray-700 uppercase font-bold">Síntomas</label>
            <textarea id="sintomas" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Describe los síntomas...' value={sintomas} onChange= {(e) => setSintomas(e.target.value)}/>
          </div>
          
          <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" value={paciente.id ? 'Guardar cambios' : 'Agregar paciente'}/>  {/* En el value del input se coloca código de JS para que busque el paciente.id,si ya hay un paciente (es decir, si le dimos EDITAR) cambia el botón a "GUARDAR CAMBIOS". Si no hay ningún paciente , muestra el botón con un "AGREGAR PACIENTE"*/}
        
        </form>
    </div>
  )
}

export default Formulario