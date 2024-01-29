import React from 'react'

export const InputBox = ({label , placeholder , onChange , name , value , type}) => {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'> {label} </div>
        <input type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} className='w-full p-2 border rounded border-slate-300 bg-gray-950' />
    </div>
  )
}
