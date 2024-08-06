import React from 'react'
import "../style.scss"
const Overlay = ({children}) => {
  return (
    <div className='suspended-o d-flex w-75'>
      {children}
    </div>
  )
}

export default Overlay;
