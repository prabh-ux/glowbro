import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaRegSquare } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { BodyWorkoutDetails, fetchData } from '../../accessdata/fetch';
import { useNavigate } from 'react-router-dom';
const CustomWorkouts = ({ setShowWorkouts }) => {

    const [tickMark, setTickMark] = useState([]);
    const [Showimage, setShowImage] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [activeMuscle, setActiveMuscle] = useState("abdominals");
    const [saveWorkoutName, setSaveWorkoutName] = useState(false);
    const [workoutName, setWorkoutName] = useState("");
    const [savedWorkoutsLoaded, setsavedWorkoutsLoaded] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [prevMyWorkout, setPrevMyWorkout] = useState("");
    const [isViewing, setIsViewing] = useState(false);
    const navigate = useNavigate();
    const getData = async () => {
        try {
            const data = await fetchData();
            const fetchedWorkout = data.filter(item => item.primaryMuscles[0] === activeMuscle);
            setWorkouts(fetchedWorkout);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {

        getData();
    }, [activeMuscle])




    const handelImage = (index) => {
        setShowImage(prev => prev === index ? null : index);

    }
    const handelTick = (name) => {

        setTickMark((prev) =>
            prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name])


    }
    const editWorkout = () => {
        const storedData = JSON.parse(localStorage.getItem("customWorkouts")) || [];
        setWorkouts(storedData);
        setsavedWorkoutsLoaded(true);
    };

    const handelEditedSave = () => {
        const storedData = JSON.parse(localStorage.getItem("customWorkouts")) || [];
        const existingIndex = storedData.findIndex(item => item.name === prevMyWorkout);

        storedData[existingIndex] = { name: prevMyWorkout, exercises: tickMark };
        localStorage.setItem("customWorkouts", JSON.stringify(storedData));
        setShowWorkouts(false);
    }

    const handelLoadSavedWorkout = (name) => {
        const storedData = JSON.parse(localStorage.getItem("customWorkouts")) || [];
        getData();
        setPrevMyWorkout(name);
        setsavedWorkoutsLoaded(false);
        const fetchedWorkouts = storedData.filter(item => item.name === name);
        setisEdit(true)

        setTickMark(fetchedWorkouts[0].exercises);
    }

    const handelViewSavedWorkout = async (name) => {
        try {
            setIsViewing(true);
            const data = await fetchData(); // Fetch latest data

            const storedData = JSON.parse(localStorage.getItem("customWorkouts")) || [];
            const fetchedWorkoutsNames = storedData.find(item => item.name === name);

            if (!fetchedWorkoutsNames) return; // Exit if workout not found

            setPrevMyWorkout(name);
            setsavedWorkoutsLoaded(false);
            setisEdit(true);
            setTickMark(fetchedWorkoutsNames.exercises);

            // Filter only tick-marked exercises
            const filteredWorkout = data.filter(workout =>
                fetchedWorkoutsNames.exercises.includes(workout.name)
            );



            setWorkouts(filteredWorkout);

        } catch (error) {
            console.error("Error fetching workout data:", error);
        }
    };




    const handelSaveWorkout = () => {
        setSaveWorkoutName(false);

        const storedData = JSON.parse(localStorage.getItem("customWorkouts")) || [];

        const existingIndex = storedData.findIndex(item => item.name === workoutName)
        if (existingIndex !== -1) {

            storedData[existingIndex] = { name: workoutName, exercises: tickMark };
        }
        else {
            storedData.unshift({ name: workoutName, exercises: tickMark });

        }
        localStorage.setItem("customWorkouts", JSON.stringify(storedData));
    };


    return (
        <div className=' relative rounded-lg   bg-[#EBEBEB] h-[50%] w-[90%] self-center flex flex-col items-center mx-[1rem] lg:mx-[6rem]    ' >
            <div className=' w-full flex items-center justify-between px-3  '>
                {isViewing || (!savedWorkoutsLoaded ?
                    <div className='flex'>
                        <select name='muscles' id="muscles" className='outline-none text-gray-500' onChange={(e) => setActiveMuscle(e.target.value)} >
                            {BodyWorkoutDetails.map((item, index) => (
                                <option key={index} value={item.name}>{item.button}</option>

                            ))}

                        </select>
                    </div> : null)}

                <button onClick={() => setShowWorkouts(false)} className='text-xl ml-auto p-[1rem]'><ImCross className='text-red-600  ' /></button>
            </div>
            <div className='p-[1rem] overflow-y-scroll flex flex-col w-full h-full gap-[0.5rem] '  >


                {workouts.map((item, index) => (

                    <div key={index} className='text-[#656565]  text-sm  md:text-xl lg:text-2xl bg-[#d3d0d0] p-[0.5rem] rounded-md w-full h-fit flex justify-between lg:justify-around md:justify-around items-center '>

                        {Showimage === index && <div className='fixed inset-0 flex flex-col  justify-center items-center '>

                            <div className='flex flex-col justify-center items-center gap-4 ' >
                                <button onClick={() => setShowImage(false)} className='text-xl w-full  '><ImCross className='text-red-600 ml-auto ' /></button>
                                <img src={`/images/${item.images[0]}`} className='rounded-lg h-[60%]' ></img>
                            </div>

                        </div>}




                        <div className='flex items-center justify-center gap-[0.5rem] w-[50%] '>
                            {!savedWorkoutsLoaded && <button onClick={() => handelImage(index)}  >{Showimage === index ? <FaRegEye className='text-[#79ab1c]' /> : <LuEyeClosed />}</button>}
                            <p className=' text-center overflow-hidden text-nowrap' >{item.name}</p>

                        </div>
                        <div className=' w-[50%] flex items-center justify-center '>

                            {!savedWorkoutsLoaded ? (
                                <button onClick={() => handelTick(item.name)}>
                                    {tickMark.includes(item.name) ? (
                                        <IoMdCheckboxOutline className='text-[#79ab1c]' />
                                    ) : (
                                        <FaRegSquare />
                                    )}
                                </button>
                            ) : (

                                <div className='flex  gap-[0.5rem] p-[1rem]' >
                                    {!isViewing && <button
                                        onClick={() => handelLoadSavedWorkout(item.name)}
                                        className='text-[#EBEBEB] bg-[#AACC00] flex items-center gap-[0.5rem] rounded-md p-[0.3rem]'
                                    >
                                        <FaPencilAlt />
                                    </button>}

                                    {!isViewing && <button onClick={() => {
                                        navigate("/me/CustomTraining", {
                                            state: item.name

                                        });

                                    }} className='  text-[#EBEBEB] bg-[#AACC00]  items-center gap-[0.5rem] rounded-md p-[0.3rem] hidden' >Train</button>}

                                    {!isViewing && <button
                                        onClick={() => handelViewSavedWorkout(item.name)}
                                        className='text-[#EBEBEB] bg-[#AACC00] flex items-center gap-[0.5rem] rounded-md p-[0.3rem]'
                                    >
                                        view
                                    </button>}
                                </div>
                            )}


                        </div>
                    </div>
                ))}



            </div >
            {!savedWorkoutsLoaded && <div className='flex  text-lg  md:text-xl lg:text-2xl items-center justify-evenly w-full p-[0.5rem]'>
                {isViewing || (isEdit ? <button onClick={handelEditedSave} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem] '><FaSave /></button> : <button onClick={() => setSaveWorkoutName(true)} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem] '><FaSave /></button>)}
                {!isEdit && <button onClick={editWorkout} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem]'><FaPencilAlt /></button>}
            </div>}
            {saveWorkoutName && <div className='fixed inset-0 flex flex-col  justify-center items-center  '>
                <div className='bg-white p-[1rem] flex flex-col items-center gap-[1rem] ' >
                    <input onChange={(e) => setWorkoutName(e.target.value)} placeholder='Enter workout name' className='rounded-md outline-none bg-gray-300 text-gray-700 p-[0.5rem]' ></input>
                    &&  <div className='flex  gap-[0.5rem] '>
                        <button onClick={() => {
                            if (workoutName.trim().length > 0) {
                                handelSaveWorkout();
                            }
                        }} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem] '>SAVE<FaSave /></button>
                        <button onClick={() => setSaveWorkoutName(false)} className=' text-[#EBEBEB] bg-[#AACC00] flex items-center  gap-[0.5rem] rounded-md p-[0.3rem] '>CANCEL<ImCross /></button>

                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default CustomWorkouts