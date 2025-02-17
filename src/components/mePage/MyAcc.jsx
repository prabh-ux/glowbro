import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoIosNuclear } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import CustomWorkouts from './mePageComponents/CustomWorkouts';

const myAcc = () => {

  

  const [weight,setWeight]=useState("55");
  const [editWeight,setEditWeight]=useState(false);
  const [showWorkouts,setShowWorkouts]=useState(false);
useEffect(() => {
  const storedData=JSON.parse(localStorage.getItem("myDetails"))||[];
  if(storedData?.weight)
  {
    setWeight(storedData.weight);
  }
}, [])

  const saveDetails=()=>{
    
    
    localStorage.setItem("myDetails",JSON.stringify({weight}));
    
    setEditWeight(false);
    }
    



const options=[{name:"My Weight",value:`${weight}Kg`,button:true},
{name:"App Version",value:"0.0.1",button:false},
{name:"Clear Data",value:<IoIosNuclear onClick={()=>localStorage.clear()} className='bg-[#AACC00] text-[#EBEBEB] text-3xl  md:text-3xl lg:text-4xl cursor-pointer rounded-md p-[0.3rem]' />,button:false},
{name:"Your Workouts",value:<GoChecklist onClick={()=>setShowWorkouts(true)} className='bg-[#AACC00] text-[#EBEBEB] text-3xl  md:text-3xl lg:text-4xl cursor-pointer rounded-md p-[0.3rem]' />,button:false},

]

  return (
    <div className=' mb-auto flex flex-col gap-[1rem] justify-center items-center font-bold font-playfairdisplay text-[#EBEBEB]' >
    
     {showWorkouts&& <div className='inset-0 fixed w-full h-full flex flex-col justify-center items-center  '>
      
       <CustomWorkouts setShowWorkouts={setShowWorkouts}></CustomWorkouts> 
      </div>}


    <p className=' text-xl  md:text-2xl lg:text-3xl font-playfairdisplay' >MY INFORMATION</p>
    <div className=' w-[90%] bg-[#EBEBEB] p-[1rem] flex flex-col gap-1 '>
{options.map((item,index)=>(
  <div key={index} className='text-[#656565]  text-sm  md:text-2xl lg:text-3xl bg-[#d3d0d0] p-[1rem] rounded-md w-full h-full flex '>
  <p className='w-[50%] text-center' >{item.name}</p>
  <div className='flex gap-[1rem] justify-center w-[50%] '>
 {item.button&& editWeight?<input onChange={(e)=>setWeight(e.target.value)} className=' rounded-md w-7 md:w-11 lg:w-14 outline-none  bg-gray-100 '/>: <p >{item.value}</p>}
 {item.button&&<button onClick={editWeight?saveDetails:()=>setEditWeight(true)} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem]'>{editWeight?<FaSave />:<FaPencilAlt  />}</button>} 
  </div>
 
</div>

))}


    </div>
    </div>
  )
}

export default myAcc