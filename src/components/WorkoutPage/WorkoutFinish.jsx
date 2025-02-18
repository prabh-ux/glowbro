import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import WorkoutDetailSP from "./WorkoutDetailSP";
import { fetchData } from "../accessdata/fetch";


const WorkoutFinish = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const {timerVal,caloriesVal} = location.state|| 0;
  const [totalCal,setTotalCal]=useState(0);


const {bodymuscle, exercisename,id } = useParams();
  const [instruction, setInstruction] = useState([]);
  const [exerciseImage, setExerciseImage] = useState([]);
  const [remainingTime, setRemainingTime] = useState(20);
  const [ButtonVal, setButtonVal] = useState("00:00:20");
  const [timeRunning, setTimeRunning] = useState(true);
  const [nextExercise, setNextExercise] = useState("");
  const [nextWorkoutName, setnextWorkoutName] = useState("");

//caeries counter
//  useEffect(() => {
//   const calculateCaleries=()=>{
//    const storedWeight=JSON.parse(localStorage.getItem("myDetails"))||[];
//    let weight=55;
//    if(storedWeight?.weight )
//    {
//     weight=storedWeight.weight;
//    }
  
//    const timeinMin=timerVal/60;
//    const caloriesBurned = caloriesVal * weight * (timeinMin / 60); // Apply formula
//       setTotalCal(caloriesBurned);
//   }
//   calculateCaleries();
//  }, [])
 

//add 20 sec 
  const handelPause = () => {
    if (timeRunning) {
   setRemainingTime(remainingTime+20);
    }
  };

//skip
const handelSkip=()=>{

  navigate(`/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${encodeURIComponent(nextWorkoutName)}/${encodeURIComponent(bodymuscle)}/SP`);
}


  useEffect(() => {
    let interval;
    if (timeRunning&& remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setTimeRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }else{

      navigate(`/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${encodeURIComponent(nextWorkoutName)}/${encodeURIComponent(bodymuscle)}/SP`);
    }

    return () => clearInterval(interval);
  }, [timeRunning]);

  useEffect(() => {

    const hours=Math.floor(remainingTime/3600);
    const minutes=Math.floor((remainingTime%3600)/60);
    const seconds=remainingTime%60;

    const formattedTime = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    setButtonVal(formattedTime);


  }, [remainingTime]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
  

        // Filter exercises based on conditions
        const filteredData = data
          .filter(
            (item) =>
              item.primaryMuscles[0] === bodymuscle&&item.equipment===id
            
          )
          .slice(0, 21); // Limit results to 21 exercises
          const BookMarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
          const BookMarksName = new Set(BookMarks.map((item) => item.headingname));
  
          // Sorting: Bookmarked items first
          filteredData.sort((a, b) => BookMarksName.has(b.name) - BookMarksName.has(a.name));
  
        // Find current exercise index in the filtered list
        const currentIndex = filteredData.findIndex(
          (item) => item.name === exercisename
        );
  
        // Set the next exercise from the filtered list
        if (currentIndex !== -1 && currentIndex < filteredData.length - 1) {
          setNextExercise(filteredData[currentIndex + 1]);
        } 
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getData();
  }, [exercisename, bodymuscle, id]); // Ensure effect runs when dependencies change
  
  
  useEffect(() => {
    if (nextExercise) {
      setInstruction(nextExercise.instructions || []);
      setExerciseImage(
        nextExercise.images?.map(
          item => `/images/${item}`
        ) || []
      );
      setnextWorkoutName(nextExercise.name);
    }
  }, [nextExercise]);
  
  return (
    <div className='p-[1rem] overflow-y-hidden overflow-x-hidden'>
      
      <WorkoutDetailSP handelPause={handelPause}
      totalCal={totalCal}
        exerciseImage={exerciseImage} 
        ButtonVal={ButtonVal} 
        headingname={nextWorkoutName} 
        secondheadingname={"Next Workout"} 
        instructions={instruction} 
        additionlClass={"flex-col-reverse"} 
        hideVideo={"hidden"} 
        handelSkip={handelSkip}
      />
    </div>
  );
};

export default WorkoutFinish;
