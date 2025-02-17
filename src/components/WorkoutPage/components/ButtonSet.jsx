import React, { useState, useEffect } from 'react';
import { RiTimerFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";

const ButtonSet = ({ tips,handelTips, handelSkip, additionlClass, handelPause, handleStartTimer, setPopUpActive, pause, ButtonVal }) => {
  return (
    <div className="flex items-center gap-[1rem] text-sm  md:text-lg lg:text-xl">
{!additionlClass && (
  <button 
    onClick={handelTips} 
    className="text-sm  md:text-lg lg:text-xl text-[#EBEBEB] bg-black p-[0.6rem] rounded-lg font-playfairdisplay"
  >
    {tips ? <HiSpeakerWave /> : <HiMiniSpeakerXMark />}  
  </button>
)}

      
      <button
        onClick={additionlClass ? () => { } : handleStartTimer}
        className={`bg-black text-[#EBEBEB] p-[1rem] font-playfairdisplay font-bold rounded-lg w-fit h-fit`}
      >
        {ButtonVal}
      </button>
      <button
        onClick={handelPause}
        className=" text-[#EBEBEB] bg-black p-[0.6rem] rounded-lg font-playfairdisplay"
      >{additionlClass ? "20+" : (pause ? <FaPlay /> : <TbPlayerPauseFilled />)}

      </button>

      

      <button
        onClick={additionlClass ? handelSkip : () => setPopUpActive(true)}
        className=" text-[#EBEBEB] bg-black p-[0.6rem] rounded-lg"
      >
        {additionlClass ? "Skip Break" : <RiTimerFill />}
      </button>
    </div>
  )
}

export default ButtonSet