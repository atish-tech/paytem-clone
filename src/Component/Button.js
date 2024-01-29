import React from 'react'

export const Button = ({label , onClick}) => {
  return (
    <button onClick={onClick} className='bg-gray-700 my-3 hover:bg-slate-600 w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-3 me-2 ' >{label}</button>
  )
}
