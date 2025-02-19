import React, { useEffect, useState } from 'react'
import SpinWheel from '../components/WorkoutPage/components/SpinWheel'
import { fetchData } from './accessdata/fetch';
import { ImCross } from "react-icons/im";
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Spinner = ({setShowWheel}) => {
  const [exercises, setExercises] = useState([]);
  const [challengeExe,setChallangeExe]=useState();
  const[isHidden,setIsHidden]=useState(false);
  const fetched = useRef(false);
  const spinnerRef=useRef();

 

  useEffect(() => {
    if (fetched.current) return; // Prevents double execution
    fetched.current = true;


    const getExercises = async () => {
      try {
        const fetchExercises = await fetchData();

        // Filter unwanted exercises
        
         
        // Shuffle and pick 5 random exercises
        const randomExercises = [...fetchExercises]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);

        setExercises(randomExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    getExercises();
  }, []);




  return (
    <div ref={spinnerRef} onClick={(e)=>{if(spinnerRef.current===e.target){setShowWheel(false)}}} className=" fixed inset-0  flex justify-center items-center ">
      <div className="relative flex flex-col justify-center items-center">
        
     
        {isHidden ? (
          <div className="flex flex-col rounded-lg bg-black h-[80%] w-[80%] p-[2rem] justify-center items-center gap-6 ">
           
           <button className='ml-auto  text-white text-lg' onClick={()=>setShowWheel(false)}><ImCross  /></button> 
           {exercises?.[challengeExe]?.name?(<p className='text-white font-playfairdisplay font-bold'  >{exercises[challengeExe].name}</p>) :(<p>loading</p>)}


            {exercises?.[challengeExe]?.images?.[0] ? 
              (  
              <img className=' rounded-md h-[20rem] w-[25rem] object-cover ' src={`/images/${exercises[challengeExe].images[0]}`}  alt="Exercise"/>
            ) : (
              <p>Loading or no image available</p>
            )}

{exercises?.[challengeExe]?.images?.[0] ? 
           ( <button onClick={()=>setShowWheel(false)} className='text-black bg-white font-playfairdisplay rounded-md p-[0.8rem] font-bold' > <Link  to={`/workout/workoutlevel/${exercises[challengeExe].equipment}/bodyworkout/showbodyexe/${encodeURIComponent(exercises[challengeExe].name)}/${exercises[challengeExe].primaryMuscles}/SP`}
           state={{ myState: true }}   >Do the Exercise</Link> </button>
):(<p>loading</p>)}
          </div>
        ) : (
         
             
             <SpinWheel 
            exercises={exercises} 
            setChallangeExe={setChallangeExe} 
            setIsHidden={setIsHidden} 
            setShowWheel={setShowWheel}
          />
            
          
        )}
      </div>
    </div>
  );
  
}

export default Spinner