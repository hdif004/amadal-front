import React from 'react'

const NavFiltersCard = ({ name }) => {
  return (
    <div className='px-6 py-4 w-fit h-fit bg-primary text-white flex items-center justify-center rounded-lg whitespace-nowrap'>
        {name}
    </div>
  )
}

export default NavFiltersCard