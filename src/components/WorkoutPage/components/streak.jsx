import React, { useEffect, useRef, useState } from "react";
import { ImFire, ImCross } from "react-icons/im";
import { GiFluffyWing } from "react-icons/gi";

const Streak = ({ setShowStreak }) => {
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak,setCurrentStreak]=useState(0);

  useEffect(() => {

    
    const storedData = JSON.parse(localStorage.getItem("workoutHistory")) || [];

    if (storedData.length === 0) {
        setBestStreak(0);
        setCurrentStreak(0);
        return;
      }
    

    // Extract unique dates (YYYY-MM-DD)
    const uniqueDates = [...new Set(storedData.map(item => item.date.split(",")[0]))];

    // Sort dates in ascending order
    const sortedDates = uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  
   let cStreak=1;
   let maxStreak=1;
   
   for(let i=1;i<sortedDates.length;i++)
   {
    const prevdate=new Date(sortedDates[i-1]);
    const currDate=new Date(sortedDates[i]);

    if((currDate-prevdate)/(1000 * 60 * 60 * 24)===1){

        cStreak++
    }
    else{

        cStreak=1;
    }
    maxStreak=Math.max(maxStreak,cStreak);
   }

   setBestStreak(maxStreak);

//finding current streak

const today=new Date().toISOString().split("T")[0];
const yesterday=new Date();
yesterday.setDate(yesterday.getDate()-1);
const yesterdaySTR=yesterday.toISOString().split("T")[0];

if(sortedDates.includes(today))
{
    setCurrentStreak(cStreak);
}
else if(sortedDates.includes(yesterdaySTR))
{
    setCurrentStreak(cStreak);
}
else{
    setCurrentStreak(0);
}
  }, []);

  
  return (
    <div  className="fixed inset-0 flex justify-center items-center bg-black/35 ">
      <div className="relative flex flex-col justify-center items-center bg-[#EBEBEB] p-[1rem] gap-[1rem] rounded-lg">
        <button onClick={() => setShowStreak(false)} className="  text-sm md:text-lg lg:text-xl ml-auto ">
          <ImCross className="text-red-600 " />
        </button>
        <ImFire className="font-bold p-[0.5rem] rounded-xl transition-all duration-300 text-orange-500  text-5xl md:text-6xl lg:text-7xl" />
        <div className="flex items-top font-playfairdisplay gap-[0.5rem]">
          <GiFluffyWing className="text-xl" />
        <p>Best Streak: {bestStreak} d</p>  
          <GiFluffyWing className="text-xl transform scale-x-[-1]" />
        </div>
        <p>Current Streak:{currentStreak} d</p> 
      </div>
    </div>
  );
};

export default Streak;
