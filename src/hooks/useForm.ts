import { ChangeEvent, useState } from 'react'

type EventChanged = ChangeEvent<HTMLInputElement | HTMLSelectElement>

const useForm = <T extends Object>(initialState:T) => {
  const [values, setValues] = useState(initialState)

  const handleInputChanged = (e:EventChanged) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = (valueForm:T = initialState) => {
    setValues(valueForm)
  }

  return {
    values,
    handleInputChanged,
    resetForm
  } as const
}

export default useForm
