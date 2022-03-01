import React from 'react'

interface Props {
  children:string,
  type:string
}

const Message = ({ children, type }:Props) => {
  return (
    <div className={`alerta ${type}`}>{children}</div>
  )
}

export default Message
