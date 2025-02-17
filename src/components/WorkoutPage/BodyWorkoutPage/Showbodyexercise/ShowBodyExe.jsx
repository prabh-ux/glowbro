import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../accessdata/fetch';
import Cards from '../../components/Cards';




import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

const ShowBodyExe = ({ setRemoveWorkout,  }) => {
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const { bodymuscle, id } = useParams();
 

  const saveWorkoutData = (date, name, image) => {

    const storedData = JSON.parse(localStorage.getItem("workoutHistory")) || [];
  

    storedData.unshift({ date, workouts: [{ name, image, date }] });
   

    localStorage.setItem("workoutHistory", JSON.stringify(storedData));
  }


  
useEffect(() => {
  console.log(bodymuscle);
}, [bodymuscle])


  useEffect(() => {
    const getExercises = async () => {
      try {
        const data = await fetchData();

       const equip=[...new Set(data.map(item=>item.equipment))];
       console.log(equip);


  
        const BookMarkes=JSON.parse(localStorage.getItem("bookmarks"))||[];
        const BookMarksName=BookMarkes.map(item=>item.headingname);
        
        const formattedExercises = data
.filter(item => item.primaryMuscles[0] === bodymuscle&&item.equipment===id).slice(0,21)  // Filter by target muscle
          .map(item => ({
            image: `/images/${item.images[0]}`,
            button: item.name,  // Exercise name
            link: `/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${encodeURIComponent(item.name)}/${encodeURIComponent(bodymuscle)}/SP`, // Dynamic link
            isBookmarked: BookMarksName.includes(item.name),  // Check if bookmarked
          }));



const sortedExe=formattedExercises.sort((a,b)=>b.isBookmarked-a.isBookmarked);

        setExerciseOptions(sortedExe);
        if (sortedExe.length === 0) {
          setRemoveWorkout((prev) => [...new Set([...prev, bodymuscle])]);
        }

      } catch (error) {
        console.error(error);
      }
    };

    getExercises();
  }, [bodymuscle, id]);



  return (
    <div className='gap-[2rem] p-[0rem] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  lg:p-[2rem] px-[1rem]'>
      {exerciseOptions.length > 0 ? (
        exerciseOptions.map((item, index) => (
          <motion.div key={index}
          initial={{scale:1,opacity:0}}
          animate={{scale:1}}
          whileInView={{scale:1,opacity:1}}
          transition={{duration:0.5,ease:"easeOut"}}
          
          >

            <Cards saveWorkoutData={saveWorkoutData} item={item} imgHeight="h-[200px]" imgWidth="w-[200px]" additionalclass="flex-col max-md:flex-row max-sm:flex-row" />
          </motion.div>

        ))
      ) : (
        <p>no exercise avalible</p>
      )}

    </div>
  );
};

export default ShowBodyExe;
