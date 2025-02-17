import React, { useState } from 'react'
import Cards from './Cards'
import { motion } from "framer-motion";


const Carausal = ({options}) => {
    const [activeIndex, setActiveIndex] = useState(0);


    const handleDragEnd = (event, info) => {
      const swipeThreshold = 50; // Minimum swipe distance to register a slide
  
      if(info.offset.x<-swipeThreshold){
    setActiveIndex((prev)=>(prev+1)%options.length);

      }else if(info.offset.x>swipeThreshold){
        setActiveIndex((prev)=>(prev-1+options.length)%options.length);
      }
    };
  return (
    <motion.div className="relative flex items-center"
    drag="x"
    dragConstraints={{left:0,right:0}}
    onDragEnd={handleDragEnd}
    
    >

    {options.map((item, index) => (
        <div
            key={index}
           onClick={()=>setActiveIndex(index)}
           className={`cursor-pointer transform transition-all duration-200 ease-in-out  grayscale-75
             ${index===activeIndex?'scale-90 opacity-100 z-20 ':(index===activeIndex-1||index===activeIndex+1?"scale-75 opacity-40 w-40 md:w-64 lg:w-64 ":"hidden" )} mx-1 `}    >
            <Cards item={item} activeIndex={activeIndex} index={index} />
        </div>
    ))}
</motion.div>
  )
}

export default Carausal