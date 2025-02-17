import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import Timer from './Timer';
import { useRef } from 'react';
const PopUp = ({setPause,setPopUpActive,handleChange,startTimer,timervalue}) => {
    const PopRef=useRef();

    const closePopUp=(e)=>{
    if(e.target === PopRef.current)
    {
        setPopUpActive(false);
    }
    }
    

  return (
  
    <div ref={PopRef} onClick={closePopUp} className='fixed inset-0    flex items-center justify-center '>
        <div className='bg-[#EBEBEB] flex flex-col justify-between text-center  p-[1rem]  rounded-lg gap-[1rem] text-xl  md:text-2xl lg:text-3xl '>
          <button onClick={()=>setPopUpActive(false)}>
          <ImCross className='ml-auto  text-black' />
          </button>
       
           <p className='font-playfairdisplay font-bold  text-[#80B918] ' >Set A timer</p>
           
           <Timer timervalue={timervalue} handleChange={handleChange} ></Timer>
          
           
           <button onClick={()=>{startTimer(timervalue[0].t,timervalue[1].t,timervalue[2].t);  setPause(false); }} className='bg-black text-[#EBEBEB] p-[0.5rem] text-lg rounded-lg  ' >Start The Timer</button>
        </div>
    </div>
  )
}

export default PopUp