
export const generateId = ():string => {
  const random = Math.random().toString(36).substring(2)
  const date = Date.now().toString(36)

  return random + date
}

export const formatDate = (date:number) => {
  return new Intl.DateTimeFormat('es-Es', { year: 'numeric', month: 'long', day: '2-digit' }).format(date)
}
