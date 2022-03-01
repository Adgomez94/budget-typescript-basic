
import React, { Dispatch, SetStateAction } from 'react'
import {
  SwipeAction,
  LeadingActions, // de izquierda a derecha
  SwipeableList,
  SwipeableListItem,
  TrailingActions
  // TrailingActions // derecha a izquierda

} from 'react-swipeable-list'

import Expenses from '../interfaces/expenses'

import { formatDate } from '../helpers/index'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
import 'react-swipeable-list/dist/styles.css'

interface Props {
  expense:Expenses
  setEditBudget:Dispatch<SetStateAction<Expenses | undefined>>
  deleteBudget:(id:string)=>void
}

type tplotOptions = {
  [key: string]: string
}

const Expense = ({ expense, setEditBudget, deleteBudget }:Props) => {
  const { name, amount, date, category, id } = expense

  const diccionarioIconos: tplotOptions = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditBudget(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteBudget(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={ diccionarioIconos[category]} alt="" />
            <div className='descripcion-gasto'>
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el {''}
                <span>{ formatDate(date) }</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>€{amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense
