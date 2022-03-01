import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

import Expenses from '../interfaces/expenses'

interface Props {
  budget: string,
  expenses: Expenses[]
  setExpenses:Dispatch<SetStateAction<Expenses[]>>
  setBudget: Dispatch<SetStateAction<string>>
  setIsValidBudget:Dispatch<SetStateAction<boolean>>
}

const BudgetControl = ({ budget, expenses, setExpenses, setBudget, setIsValidBudget }:Props) => {
  const [ percentage, setPercentage ] = useState(0)
  const [available, setAvailable] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalBudget = expenses
      .reduce((total, { amount }) => total + parseFloat(amount), 0)
    const totalAvailable = parseFloat(budget) - totalBudget
    const newPercentage =  (( (parseFloat(budget) - totalAvailable) / parseFloat(budget) ) * 100).toFixed(2)
      setTimeout(() => {
        console.log(newPercentage)
        setPercentage(parseFloat(newPercentage))
      }, 1000);
    
    setAvailable(totalAvailable)
    setSpent(totalBudget)
  }, [expenses])

  const formatToCurrency = (budget:number) => {
    return budget.toLocaleString('en-US', {
      style: 'currency',
      currency: 'EUR'

    })
    }

  const handleResetApp = () =>{
    const result = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if(result) {
      setExpenses([])
      setIsValidBudget(false)
      setBudget('0')
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor:Number(budget) < 0 ? 'red': '#3B82f6',
            trailColor:'f5f5f5',
            textColor: '#3B82f6'
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          onClick={handleResetApp}
        >
          Resetear app
        </button>
        <p>
          <span>Presupuesto: </span>{formatToCurrency(parseFloat(budget))}
        </p>
        <p className={Number(budget) < 0 ? 'negativo': ''}>
          <span>Disponible: </span>{formatToCurrency(available)}
        </p>
        <p>
          <span>Gastado: </span>{formatToCurrency(spent)}
        </p>
      </div>
    </div>
  )
}

export default BudgetControl
