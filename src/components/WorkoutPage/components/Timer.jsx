import React, { useState } from 'react';

const Timer = ({handleChange,timervalue}) => {
    const exceptThisSymbols = ["e", "E", "+", "-", "."];
  return (
    <div className='flex gap-[0.5rem] items-center justify-center'>
      {timervalue.map((item, index) => (
        <input
          key={index}
          type="number"
          placeholder={item.t}
          onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
          onChange={(e) => handleChange(index, e)}
          className="bg-black text-center w-[6rem] p-[0.5rem] px-[1.5rem] text-xl text-white rounded-xl"
        />
      ))}
    </div>
  );
};

export default Timer;
