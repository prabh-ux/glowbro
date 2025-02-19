import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { BodyWorkoutDetails } from '../../accessdata/fetch';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { useMemo } from 'react';

const BodyWorkout = ({}) => {
  
     const {id}=useParams();
    // remove workout
    
// 

const updatedBW = useMemo(() => {
  return BodyWorkoutDetails.map(item => ({
    ...item,
    link: `/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${item.name}`
  }));
}, [id]); // Depend on id


   console.log(id);
    
   
  return (
    <motion.div   className=' gap-[2rem] p-[0rem] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  lg:p-[2rem] px-[1rem] '>
      {updatedBW.length > 0 ? (
        
        updatedBW.map((item, index) => (
          <motion.div  key={index} 
          initial={{scale:1,opacity:0}}
          animate={{scale:1}}
          whileInView={{scale:1,opacity:1}}
          transition={{duration:0.5,ease:"easeOut"
          }}
          >
             <Cards item={item} />
            </motion.div>
         
        ))
      ) : (
        <p>Loading exercises...</p>
      )}
    </motion.div>
  );
};


export default BodyWorkout;
