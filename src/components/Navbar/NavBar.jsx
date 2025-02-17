import React, { useState } from 'react';
import Button from '../Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuFerrisWheel } from "react-icons/lu";
import Spinner from '../Spinner';
import Streak from '../WorkoutPage/components/streak';
import { FaUserAlt } from "react-icons/fa";
import { ImFire } from "react-icons/im";

const NavBar = ({ toggle, options }) => {
    const navigate = useNavigate();
    const [showWheel, setShowWheel] = useState(false);
    const [showStreak, setShowStreak] = useState(false);
    return (
        <nav className={` bg-white w-full h-fit p-[1rem] flex gap-[2rem] mb-[1rem] lg:flex-row justify-around items-center lg:mb-[3rem] lg:items-end sticky z-50 top-0  `}>

            <img src='/images/logo.png' className=' h-[30px] md:h-[35px] lg:h-[45px] w-fit ' ></img>

            <div className='lg:flex justify-evenly lg:w-fit gap-[2rem] hidden  '>
                {options.map((item, index) => (
                    <NavLink to={item.link} key={index} className={`text-[#80B918] hover:text-[#537D06]  transition-colors duration-300 ease-in-out  mt-auto   font-stickNoBills font-bold  text-xl`} >
                        {item.name}
                    </NavLink>
                ))}
            </div>
            <div className='flex gap-[1rem]'>
                <button onClick={() => setShowStreak(true)} className={` bg-[#EBEBEB] font-bold lg:p-[0.5rem]  md:p-[0.5rem]  p-[0.3rem] rounded-xl transition-all duration-300 text-orange-500  text-sm hover:text-sm   md:text-xl md:hover:text-lg   lg:text-2xl lg:hover:text-xl `} ><ImFire /></button>
                {showStreak && <Streak setShowStreak={setShowStreak} ></Streak>}
                <button onClick={() => setShowWheel(true)} className={` bg-black font-bold lg:p-[0.5rem]  md:p-[0.5rem] p-[0.3rem] rounded-xl transition-all duration-300 text-white  text-sm hover:text-sm   md:text-xl md:hover:text-lg   lg:text-2xl lg:hover:text-xl  `} ><LuFerrisWheel /></button>
                {showWheel && <Spinner setShowWheel={setShowWheel}></Spinner>}
                <button onClick={() => navigate("/me")} className={` bg-black font-bold lg:p-[0.5rem]  md:p-[0.5rem] p-[0.3rem] rounded-xl transition-all duration-300 text-white text-sm hover:text-sm   md:text-xl md:hover:text-lg   lg:text-2xl lg:hover:text-xl `} ><FaUserAlt /></button>
            </div>


        </nav>


    );
};

export default NavBar;
