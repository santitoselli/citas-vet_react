const Error = ({mensaje}) => {  // le agregamos el valor "mensaje" que vamos a escribir donde necesitemos. En este caso en el Error del Formulario
  return (
    <div className=" bg-red-600 text-white text-center p-3 uppercase mb-3 font-bold rounded-md">
        <p>{mensaje}</p>    {/* sólo tenemos que llamar al mensaje*/}
    </div>
  )
}

export default Error