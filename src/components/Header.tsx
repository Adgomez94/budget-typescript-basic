import React, { Dispatch, SetStateAction } from 'react'
import Expenses from '../interfaces/expenses'

import BudgetControl from './BudgetControl'
import Newbudget from './Newbudget'

interface Props {
  budget: string,
  isValidBudget: boolean
  expenses: Expenses[]
  setBudget: Dispatch<SetStateAction<string>>
  setIsValidBudget:Dispatch<SetStateAction<boolean>>
  setExpenses:Dispatch<SetStateAction<Expenses[]>>
}

const Header = ({ budget, isValidBudget, setBudget, setIsValidBudget, expenses, setExpenses }:Props) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {
        isValidBudget
          ? (
          <BudgetControl
            setExpenses={setExpenses}
            expenses = {expenses}
            budget={budget}
            setBudget= {setBudget}
            setIsValidBudget= {setIsValidBudget}
          />
            )
          : (
          <Newbudget
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget= {setIsValidBudget}
          />
            )
      }
    </header>
  )
}

export default Header
