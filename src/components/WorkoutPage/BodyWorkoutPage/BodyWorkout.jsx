import React, { useEffect, useState, useMemo } from 'react';
import Cards from '../components/Cards';
import { BodyWorkoutDetails, fetchData } from '../../accessdata/fetch';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

const BodyWorkout = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // Fetch exercise data
  useEffect(() => {
    const getExerciseData = async () => {
      try {
        const response = await fetchData();
        setData(response);  // Ensure data is properly set
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    getExerciseData();
  }, []);

  // Filter body muscles that have at least one exercise
  const updatedBW = useMemo(() => {
    return BodyWorkoutDetails.filter((muscle) =>
      data.some(
        (exercise) =>
          exercise.primaryMuscles.includes(muscle.name) && exercise.equipment === id
      )
    ).map(item => ({
      ...item,
      link: `/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${item.name}`
    }));
  }, [id, data]); // Added `data` as a dependency

  return (
    <motion.div className="gap-[2rem] p-[0rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:p-[2rem] px-[1rem]">
      {updatedBW.length > 0 ? (
        updatedBW.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
