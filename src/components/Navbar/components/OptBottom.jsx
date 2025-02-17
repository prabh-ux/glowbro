import React from 'react';
import { NavLink } from 'react-router-dom';

const OptBottom = ({ options }) => {
  return (
    <div className="  w-full bg-white h-fit sticky z-20 bottom-0 flex justify-evenly gap-8 lg:hidden px-[2rem] py-[0.4rem] ">
      {options.map((item, index) => (
        <NavLink
          to={item.link}
          key={index}
          className=" text-[#80B918] hover:text-[#537D06] transition-colors duration-300 ease-in-out mt-auto font-stickNoBills font-bold  text-sm  md:text-xl lg:text-2xl flex flex-col items-center "
        >
          {item.logo}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default OptBottom;
