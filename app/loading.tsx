import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Circle 1 */}
        <div className="absolute w-20 h-20 border-2 border-green-500 rounded-full animate-grow1"></div>

        {/* Circle 2 */}
        <div className="absolute w-28 h-28 border-2 border-green-500 rounded-full animate-grow2"></div>

        {/* Circle 3 */}
        <div className="absolute w-36 h-36 border-2 border-green-500 rounded-full animate-grow3"></div>

        {/* Logo */}
        <img src="/assets/zenya-logo-green.png" alt="Logo" className="w-14 h-14 z-10" />
      </div>
    </div>
  )
}

export default loading