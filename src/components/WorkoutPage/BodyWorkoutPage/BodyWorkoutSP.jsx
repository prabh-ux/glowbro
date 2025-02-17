import React, { useEffect, useState } from 'react'
import WorkoutDetailSP from '../WorkoutDetailSP'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchData } from '../../accessdata/fetch';
import PopUp from '../components/PopUp';
import WorkoutFinish from '../WorkoutFinish';


const BodyWorkoutSP = () => {
  const navigate = useNavigate();
  const {bodymuscle, exercisename, id } = useParams();
  const [instruction, setInstruction] = useState([]);
  const [exerciseImage, setExerciseImage] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [second, setSeconds] = useState(0);
  const [ButtonVal, setButtonVal] = useState("Start Now");
  const [timeRunning, setTimeRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [pause, setPause] = useState(true);
const [totalTime,setTotalTime]=useState(0);
  const [lastExercise,setLastExercise]=useState(false);
const [calories,setCalories]=useState(0);
  const timervalue = [
    { t: hour, setter: setHour },
    { t: minutes, setter: setMinutes },
    { t: second, setter: setSeconds },
  ];

  const handelPause = () => {
    if (timeRunning) {
      setPause((prevPause) => !prevPause);
    } else {
      setTimeRunning(true);
      setPause(false);
    }
  };

  const startTimer = (hour, minutes, second) => {


    setPopUpActive(false);
    setButtonVal(`${hour} : ${minutes} : ${second}`);
    const totalSec = hour * 3600 + minutes * 60 + second;
    setTotalTime(totalSec);
    setRemainingTime(totalSec);
    setTimeRunning(true);
  };

  useEffect(() => {
    if (timeRunning && remainingTime > 0 && !pause) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          const hrs = Math.floor(newTime / 3600);
          const mins = Math.floor((newTime % 3600) / 60);
          const secs = newTime % 60;
  
          setButtonVal(
            `${String(hrs).padStart(2, "0")} : ${String(mins).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`
          );
          return newTime;
        });
      }, 1000);
  
      return () => clearTimeout(timer);
    } 
    
    // 🚀 FIX: Check if timer was started before navigating
    else if (remainingTime === 0 && totalTime > 0) {  
      setTimeRunning(false);
      setButtonVal("Start Now");
  
      if (!lastExercise) {
        navigate(`/workout/workoutlevel/${id}/bodyworkout/showbodyexe/${encodeURIComponent(exercisename)}/${encodeURIComponent(bodymuscle)}/SP/Workoutfinish`, { 
          state: { timerVal: totalTime, caloriesVal: calories } 
        });
      } else {
        navigate(`/workout/workoutlevel/${id}/bodyworkout`);
      }
    }
  }, [remainingTime, timeRunning, pause]);
  

  const handleChange = (index, e) => {
    const parsedValue = parseInt(e.target.value);

    if (!isNaN(parsedValue)) {
      if (parsedValue >= 0 && parsedValue <= 60) {
        timervalue[index].setter(parsedValue);
      } else {
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();

        const filteredData = data
        .filter(
          (item) =>
            item.primaryMuscles[0] === bodymuscle&&item.equipment===id
        )
        .slice(0, 21);

        const BookMarks=JSON.parse(localStorage.getItem("bookmarks"))||[];
        const BookMarksName = new Set(BookMarks.map((item) => item.headingname));

      // Sorting: Bookmarked items first
      filteredData.sort((a, b) => BookMarksName.has(b.name) - BookMarksName.has(a.name));
      const exercise = filteredData.find((item) => item.name === exercisename);
      
       setCalories(exercise.caloriesBurnedPerMinute) ;


        const currentIndex = filteredData.findIndex(
          (item) => item.name === exercisename
        );
  
        if (currentIndex === filteredData.length - 1 && filteredData.length > 0) {
          setLastExercise(true);
        }
        if (exercise) {
          setInstruction(exercise.instructions || []);
          const imgUrls =exercise.images?.map((item) => `/images/${item}`) ||
            [];
          setExerciseImage(imgUrls);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [exercisename,bodymuscle,id]);




  return (
    <div  className='p-[1rem] overflow-y-hidden overflow-x-hidden'>
      <WorkoutDetailSP
        setPause={setPause}
        pause={pause}
        handelPause={handelPause}
        startTimer={startTimer}
        setPopUpActive={setPopUpActive}
        exerciseImage={exerciseImage}
        ButtonVal={ButtonVal}
        headingname={exercisename}
        secondheadingname={"INSTRUCTION"}
        instructions={instruction}
        mainBtn={"Start Now"}
      
      />
      {popUpActive && (
        <PopUp
          setPause={setPause}
          timervalue={timervalue}
          handleChange={handleChange}
          startTimer={startTimer}
          setPopUpActive={setPopUpActive}
        />
      )}
      <div className="hidden">
        <WorkoutFinish
        totalTime={totalTime}
          
        />
      </div>
    </div>
  );
};

export default BodyWorkoutSP;
