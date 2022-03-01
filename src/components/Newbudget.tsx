import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Message from './Message'

interface Props {
  budget: string,
  setBudget: Dispatch<SetStateAction<string>>
  setIsValidBudget:Dispatch<SetStateAction<boolean>>
}

type Event = FormEvent<HTMLFormElement>

const Newbudget = ({ budget, setBudget, setIsValidBudget }:Props) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e:Event):void => {
    e.preventDefault()
    setMessage('')
    const transformNumber = parseFloat(budget)
    if (isNaN(transformNumber) || transformNumber < 0) {
      setMessage('El presupuesto no es valido')
      return
    }
    setIsValidBudget(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form
        className='formulario'
        onSubmit={handleSubmit}>
          <div className="campo">
            <label>
              Definir un presupuesto
            </label>
            <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="nuevo-presupuesto"
                type="text"
                placeholder='Añade tu presupuesto'/>
          </div>
          <input
            type="submit"
            value="Añadir"/>
          {
            message && <Message type="error ">{message}</Message>
          }

      </form>
    </div>
  )
}

export default Newbudget
