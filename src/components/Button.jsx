import React from 'react'

const Button = ({text,additionalClasses}) => {
  return (
    <div>
        <button className={`bg-gradient-to-r from-lime-700 to-lime-500 font-bold p-[1rem] rounded-3xl transition-all duration-300 text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] ${additionalClasses}`}>{text}</button>
    </div>
  )
}

export default Button
