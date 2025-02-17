import React, { useState } from 'react'

import Carausal from './components/Carausal';
import bodyWeight from '../images/workoutForm/BodyWeight.jpg'
import Weight from '../images/workoutForm/Weight.jpg'
import Cardio from '../images/workoutForm/Cardio.jpg'

const WorkoutLevelPage = () => {
  

  const WorkoutOptions = [
      { image: bodyWeight, button: "BodyWeight Workout", level:"bodyweightWorkout" },
      { image: Weight, button: "Weights Workout", level:"weightWorkout" },
      { image: Cardio, button: "Cardio", level: "cardioWorkout" },
  ].map(item=>{
    return{ 
...item,
link: `/workout/workoutlevel/${item.level}/bodyworkout`,
    }
});


    return (
        <div className="flex justify-center overflow-x-hidden ">
           <Carausal options={WorkoutOptions} ></Carausal>
        </div>
    );
  
}

export default WorkoutLevelPage