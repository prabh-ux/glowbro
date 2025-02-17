import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Calendar from "react-calendar";
import "../Historypage/components/calander.css"
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { fetchData } from '../accessdata/fetch';
import { motion } from "framer-motion";
const History = ({ toggle }) => {

  const [workoutDates, setWorkoutDates] = useState([]);
  const [workout, setWorkout] = useState([]);
  
  

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workoutHistory")) || [];

    const dates = storedData.map(entry => entry.date.split(",")[0]);
    const workoutdata = storedData.flatMap(entry => entry.workouts);

    setWorkoutDates(dates);
    setWorkout(workoutdata);


  }, [])



  return (
    <div className="flex flex-col items-center text-sm  md:text-lg lg:text-xl px-[1rem] md:px-[3rem] lg:px-[4rem] gap-[3rem] mb-auto ">
      <Calendar
        className="p-[1rem] "
        nextLabel={<FaChevronRight className="ml-auto" />}
        prevLabel={<FaChevronLeft />}
        next2Label={<MdKeyboardDoubleArrowRight className="ml-auto" />}
        prev2Label={<MdKeyboardDoubleArrowLeft />}
        weekStartsOn={0}
        tileClassName={({ date }) => {
          const formattedDate = date.toLocaleDateString("en-CA");
          return workoutDates.includes(formattedDate) ? "workout-day" : "";
        }}
      />
      <div className='h-[300px]  w-full flex flex-col gap-[3rem] items-center overflow-y-scroll bg-[#577d10] p-[1rem]  rounded-lg' style={{ scrollbarWidth: 'none' }} >
        {workout.map((item, index) => (

          <motion.div 
          initial={{scale:1,opacity:0}}
          animate={{scale:1}}
          whileInView={{scale:1,opacity:1}}
          transition={{duration:0.5,ease:"easeOut"}}
          
          key={index} className='h-[111px] md:h-[150px]  lg:h-[150px]  w-full  flex flex-col  gap-[0.5rem] '>
            <p className='text-[#f0f0f0] font-semibold text-sm  md:text-lg lg:text-xl ' >{item.date}</p>
            <div className=' h-[111px] md:h-[150px]  lg:h-[150px]  w-full bg-[#f0f0f0] rounded-lg flex items-center p-[1rem] justify-between  ' >
              <img src={item.image} className=' h-full object-cover  ' ></img>
              <p className=' text-nowrap font-playfairdisplay font-bold text-sm  md:text-xl lg:text-2xl text-[#80B918] text-center  w-[50%] overflow-x-hidden' >{item.name}</p>
            </div>
            
          </motion.div>

        ))}

      </div>
    
    </div>
  );
}

export default History
