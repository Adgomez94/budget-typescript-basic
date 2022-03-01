import React, { Dispatch, SetStateAction } from 'react'
import Expenses from '../interfaces/expenses'
import Expense from './Expense'

interface Props {
  expenses:Expenses[]
  setEditBudget:Dispatch<SetStateAction<Expenses | undefined>>
  deleteBudget:(id:string)=>void
  filter: string 
  filterExpenses: Expenses[]
}

const ListExpenses = ({ expenses, setEditBudget, deleteBudget , filterExpenses, filter}:Props) => {
  return (
    <div className="listado-gastos contenedor">
      <>
        { filter ? (
          <>
            <h2>{filterExpenses.length ? 'Gastos' : 'No hay gastos aun'} </h2>
            {filterExpenses.map(expense=> (
              <Expense
                expense = {expense}
                setEditBudget = {setEditBudget}
                deleteBudget= {deleteBudget}
                key={expense.id}
              />))}
          </>
        ) 
        : (
          <>
            <h2>{filterExpenses.length ? 'Gastos' : 'No hay gastos aun'} </h2>
            {expenses.map(expense => (

            <Expense
              expense = {expense}
              setEditBudget = {setEditBudget}
              deleteBudget= {deleteBudget}
              key={expense.id}
            />
            ))}
        </>        
        )
        }
      </>
    </div>
  )
}

export default ListExpenses
