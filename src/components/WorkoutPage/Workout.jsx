import React, { useState } from 'react';
import Carausal from './components/Carausal';
import bodyImage from '../images/workoutTypes/bodyworkout.png'
import faceImage from '../images/workoutTypes/faceworkout.png'

const Workout = () => {
   

    const WorkoutOptions = [
        { name: "Body Workouts", image: bodyImage, button: "Full Body Workout", link: "/workout/workoutlevel" },
        { name: "Face Workouts", image: faceImage, button: "Coming Soon", link: "/" }
    ];

    return (
        <div className="flex justify-center overflow-x-hidden ">
           <Carausal options={WorkoutOptions}></Carausal>
        </div>
    );
};

export default Workout;
