import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
const Cards = ({ saveWorkoutData , additionalclass, item, activeIndex, index, imgHeight,imgWidth}) => {
  const [hovering, setHovering] = useState(false);
 const [showBookMark,setShowBookMark]=useState(false);

useEffect(() => {

const storedData=JSON.parse(localStorage.getItem("bookmarks"))||[];
const isBookmarked=storedData.some((data)=>data.headingname===item.button)
setShowBookMark(isBookmarked);
  
}, [item])


  return (
       <div 
         onMouseEnter={() => setHovering(true)} 
         onMouseLeave={() => setHovering(false)} 
         className={` ${hovering ? "bg-[#EBEBEB]" : "bg-black"} transition-all duration-300  ease-in-out flex  ${additionalclass?additionalclass:"flex-col"}  text-[#EBEBEB]  gap-[1rem] rounded-lg items-center justify-around p-[1rem]  `}
       >

         <div className=' max-w-[350px] h-fit  '>
       
           <img 
             src={item.image} 
             alt='' 
             loading='lazy'
             className={`object-center object-cover rounded-lg ${imgHeight}  ${imgWidth}  `} 
           />
         </div>
         
         {index === activeIndex && item.button&& (
           <Link  to={item.link} onClick={()=>saveWorkoutData(new Date().toLocaleString("en-CA"),item.button,item.image)}  className={` ${hovering ? "bg-black text-[#EBEBEB]" : "bg-[#EBEBEB] text-black"}     font-bold p-[0.7rem] rounded-lg transition-all duration-300 ease-in-out  font-playfairdisplay text-md overflow-x-hidden text-nowrap  text-center w-full flex justify-around items-center `} >
            <p className={`w-[100%] text-nowrap text-sm md:text-lg lg:text-lg overflow-x-hidden ${showBookMark?"":""}  `} >{item.button} </p>  <div className={`ml-auto  ${showBookMark?"block":"hidden"}`}>
  <IoStar className={`transition-all duration-300  ease-in-out  text-${showBookMark ? "yellow-500" : `${!hovering ? "black" : "[#EBEBEB]"}`}`} />
</div>
           </Link>
         )}
       </div>
  );
};

export default Cards;
