import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Cards from '../WorkoutPage/components/Cards';
import { fetchData } from '../accessdata/fetch';

const CustomTraining = () => {


    const location = useLocation();
    const prevMyWorkout = location.state; // Directly getting the string value
    const [exerciseOptions, setExerciseOptions] = useState([]);


    console.log(prevMyWorkout); // Thi
    const saveWorkoutData = (date, name, image) => {

        const storedData = JSON.parse(localStorage.getItem("workoutHistory")) || [];
        console.log("Raw localStorage Data:", localStorage.getItem("bookmarks")) || [];

        const isBookmarked = JSON.parse(localStorage.getItem("bookmarks")) || [];

        isBookmarked.forEach((element, index) => {
            console.log(`Bookmark ${index + 1}:`, element.headingname);

        });

        storedData.unshift({ date, workouts: [{ name, image, date }] });
        console.log(`Added new date: ${date} with workout ${name}`);

        localStorage.setItem("workoutHistory", JSON.stringify(storedData));
    }

    useEffect(() => {
        const fetchedWorkout = async () => {
            const data = await fetchData();
            const storedData = JSON.parse(localStorage.getItem("customWorkouts"));
            const workouts = storedData.find((item) => item.name === prevMyWorkout) || { exercises: [] };


            const WorkoutName = workouts ? workouts.exercises : [];
            const lastWorkoutIndex = WorkoutName.length - 1;
            console.log("Last Workout Name:", WorkoutName[lastWorkoutIndex]); // Logs last workout name


            const formattedExercises = WorkoutName.map((name, index) => {
                const exercise = data.find(item => item.name === name);
                const isLastIndex = index === WorkoutName.length - 1;
                return exercise ? {
                    image: `/images/exercisesused/${exercise.images[0]}`,
                    button: exercise.name,

                    link:
                        `/workout/workoutlevel/${exercise.level}/bodyworkout/showbodyexe/${encodeURIComponent(exercise.name)}/${encodeURIComponent(exercise.primaryMuscles[0])}/SP`,


                } : null;
            }).filter(Boolean);




            setExerciseOptions(formattedExercises);

        }

        fetchedWorkout();
    }, [prevMyWorkout])








    return (
        <div className='gap-[2rem] p-[0rem] grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  lg:p-[2rem] px-[1rem]'>
            {exerciseOptions.length > 0 ? (
                exerciseOptions.map((item, index) => (
                    <div key={index}>

                        <Cards saveWorkoutData={saveWorkoutData} item={item} imgHeight="h-[200px]" imgWidth="w-[200px]" additionalclass="flex-col max-md:flex-row max-sm:flex-row" />
                    </div>

                ))
            ) : (
                <p>no exercise avalible</p>
            )}

        </div>
    );
}

export default CustomTraining