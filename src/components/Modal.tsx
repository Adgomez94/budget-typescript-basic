import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import Message from './Message'

import useForm from '../hooks/useForm'

import IconsClosed from '../img/cerrar.svg'
import Expenses from '../interfaces/expenses'
import { generateId } from '../helpers'

interface Props {
  setModal:()=> void,
  modalAnimation:boolean,
  setModalAnimation:()=> void,
  addNewExpense:(expense:Expenses)=>void
  editBudget: Expenses | undefined
  setListExpenses: (editExpenses:Expenses)=>void
  setEditBudget: Dispatch<SetStateAction<Expenses | undefined>>
}

const Modal = ({
  setModal,
  modalAnimation,
  setModalAnimation,
  addNewExpense,
  editBudget,
  setListExpenses,
  setEditBudget
}:Props) => {
  const [message, setMessage] = useState<string>('')
  const { values, handleInputChanged, resetForm } = useForm({
    name: '',
    amount: '',
    category: ''
  })

  useEffect(() => {
    if (editBudget && Object.keys(editBudget).length > 0) {
      resetForm(editBudget)
    }
  }, [editBudget])

  const { name, amount, category } = values

  const handleNewBudget = () => {
    setEditBudget(undefined)
    setModalAnimation()
    setTimeout(() => {
      setModal()
    }, 200)
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ([name, amount, category].includes('')) {
      setMessage('Todos los cambios son obligatorios')
      setTimeout(() => { setMessage('') }, 2000)
      return undefined
    }
    if (editBudget?.id) {
      setListExpenses({
        ...editBudget,
        date: Date.now(),
        ...values
      })
    } else {
      addNewExpense({
        ...values,
        id: generateId(),
        date: Date.now()
      })
    }
    handleNewBudget()
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          onClick={() => handleNewBudget()}
          src={IconsClosed}
          alt="imagen de cerrar" />
      </div>
      <form
        className={`formulario ${modalAnimation ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
        >
        <legend>{editBudget ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        { message && <Message type="error">{message}</Message> }
        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            autoComplete='off'
            onChange={handleInputChanged}
            value={name}
            type="text"
            name="name"
            placeholder="Añade el Nombre del Gasto"
            id="name" />
        </div>
        <div className="campo">
          <label htmlFor="amount">Nombre Gasto</label>
          <input
            onChange={handleInputChanged}
            value={amount}
            type="number"
            name="amount"
            placeholder="Añade la cantidad del Gasto"
            id="amount" />
        </div>
        <div className="campo">
          <label htmlFor="category">Categoria</label>
          <select
            onChange={handleInputChanged}
            value={category}
            name="category"
            id="category">
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Vatios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={editBudget ? 'Editar Gasto' : 'Añadir Gasto'} />
      </form>
    </div>
  )
}

export default Modal
