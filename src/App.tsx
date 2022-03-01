import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Modal from './components/Modal'
import { useToggle } from './hooks/useToggle'

import IconsPlus from './img/nuevo-gasto.svg'
import Expenses from './interfaces/expenses'
import ListExpenses from './components/ListExpenses'
import Filter from './components/Filter'

const App = () => {
  const [budget, setBudget] = useState<string>(
    localStorage.getItem('budget') ?? '0'
  )
  const [isValidBudget, setIsValidBudget] = useToggle()
  const [modal, setModal] = useToggle()
  const [modalAnimation, setModalAnimation] = useToggle()
  const [expenses, setExpenses] = useState<Expenses[]>(JSON.parse(localStorage.getItem('expenses') || ""))
  const [editBudget, setEditBudget] = useState<Expenses>()
  const [filter, setFilter] = useState<string>("")
  const [filterExpenses, setFilterExpenses] = useState<Expenses[]>([])

  useEffect(() => {
    if (editBudget && Object.keys(editBudget).length > 0) {
      setModal()
      setTimeout(() => {
        setModalAnimation()
      }, 500)
    }
  }, [editBudget])

  useEffect(()=>{
    localStorage.setItem('budget',budget)
  },[budget])

  useEffect(()=>{
    if(Number(localStorage.getItem('budget')) > 0) setIsValidBudget()
  },[])

  useEffect(()=>{
    localStorage.setItem('expenses',JSON.stringify(expenses) ?? [])
  },[expenses])

  useEffect(() => {
    if(filter){
      const filterExpenses = expenses.filter(expense=>expense.category === filter)
      setFilterExpenses(filterExpenses)
    }
  }, [filter])
  


  const handleNewBudget = () => {
    setEditBudget(undefined)
    setModal()
    setTimeout(() => {
      setModalAnimation()
    }, 500)
  }

  const addNewExpense = (expense:Expenses) => {
    setExpenses([
      ...expenses,
      expense

    ])
  }

  const setListExpenses = (editExpenses:Expenses) => {
    const budgets = expenses.map(budget => {
      if (budget.id === editExpenses.id) return editExpenses
      return budget
    })
    setExpenses(budgets)
  }

  const deleteBudget = (id:string) => {
    const budgets = expenses.filter(budget => id !== budget.id)
    setExpenses(budgets)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget ={budget}
        isValidBudget = {isValidBudget}
        expenses = {expenses}
        setBudget= {setBudget}
        setIsValidBudget = {setIsValidBudget}
        setExpenses={setExpenses}
      />
      {
        isValidBudget && (
        <>
          <main>
            <Filter 
              filter={filter}
              setFilter={setFilter}
            />
            <ListExpenses
              expenses={expenses}
              setEditBudget={setEditBudget}
              deleteBudget = {deleteBudget}
              filter = {filter}
              filterExpenses = {filterExpenses}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              onClick={handleNewBudget}
              src={IconsPlus}
              alt="icono nuevo gasto" />
          </div>
        </>
        )
      }
      {
        modal &&
        <Modal
          setModal={setModal}
          modalAnimation={modalAnimation}
          editBudget={editBudget}
          setModalAnimation = {setModalAnimation}
          setEditBudget = {setEditBudget}
          addNewExpense = { addNewExpense }
          setListExpenses = {setListExpenses}
        />
      }
    </div>
  )
}

export default App
