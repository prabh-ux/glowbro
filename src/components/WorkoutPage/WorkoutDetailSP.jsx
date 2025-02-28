import React, { useState, useEffect } from 'react';
import { RiTimerFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { fetchData, workoutSearches } from '../accessdata/fetch';
import { IoStar } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import ButtonSet from './components/ButtonSet';

const WorkoutDetailSP = ({ totalCal, handelSkip, hideVideo, additionlClass, setPause, handelPause, pause, startTimer, ButtonVal, exerciseImage, headingname, secondheadingname, instructions, setPopUpActive }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [bookMarked, setBookMarked] = useState(false);
  const [tips, setTips] = useState(false);



  useEffect(() => {
    if (!headingname) return; // Prevents unnecessary updates if headingname is empty
    const searchQuery = workoutSearches[headingname] || '';
    if (videoUrl !== searchQuery) setVideoUrl(searchQuery); // Prevents re-setting the same value
  }, [headingname]);


  const handleStartTimer = () => {
    startTimer(0, 10, 0);  // Adjust timer values as needed
    setPause(false);  // Automatically set pause to false when the timer starts

  };

  const handelTips = async () => {
    try {
      const data = await fetchData();
      const exe = data.find(item => item.name === headingname);
      if (exe && exe.instructions) {
        window.speechSynthesis.cancel();
        setTips(prev => {
          const newTipsState = !prev;
  
          if (newTipsState) {
            exe.instructions.forEach((instruction, index) => {
              const speech = new SpeechSynthesisUtterance(instruction);
              speech.lang = "en-US";
              speech.rate = 1;
              speech.pitch = 1;
  
              // Add a delay between each instruction (except the last one)
              
                speech.onend = () => {
                  // After speaking this instruction, continue with the next one
                  window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
                };
              
  
              window.speechSynthesis.speak(speech);
            });
          }
          return newTipsState;
        });
      } else {
        console.log("No execution tips found.");
        setTips(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

useEffect(() => {

  return () => {
    window.speechSynthesis.cancel();
  }
}, [])


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarked = storedData.some((item) => item.headingname === headingname)
    setBookMarked(isBookmarked);
  }, [headingname]);


  //add bookmarks to localstorage
  const handelBookmark = (headingname) => {
    setBookMarked(true);
    const storedData = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const existingBookmarkIndex=storedData.findIndex(item=>item.headingname===headingname);
    if(existingBookmarkIndex!==-1){
  storedData.splice(existingBookmarkIndex,1);
  setBookMarked(false);

    }else{

      storedData.unshift({ headingname });
      setBookMarked(true);
    }



    
    localStorage.setItem("bookmarks", JSON.stringify(storedData));

  }

  return (
    <div className="relative bg-[#EBEBEB] rounded-lg flex flex-col items-center   lg:mx-[6rem] p-[1rem] gap-[2rem] additionlClass   ">
      {/* {additionlClass ? <div className='flex flex-col justify-center items-center  gap-[1rem]'> <p className="text-[#80B918] text-xl  md:text-2xl lg:text-3xl font-playfairdisplay font-bold ">Calories Burned</p>
        <p className="text-[#80B918] text-xl  md:text-2xl lg:text-3xl font-playfairdisplay font-bold ">{parseFloat(totalCal.toFixed(3))}kcal</p></div>
        : []} */}
      {!additionlClass ? <button onClick={() => handelBookmark(headingname)} className={`absolute z-10 w-full text-2xl  md:text-3xl lg:text-5xl ml-[2rem]`} > {bookMarked ? <IoStar className={`text-yellow-500`} /> : <FaRegStar className={` text-yellow-500`} />}   </button> : []}

      <p className="font-playfairdisplay font-bold text-xl  md:text-2xl lg:text-3xl ">{secondheadingname}</p>
      <p className="text-[#80B918]  text-2xl  md:text-3xl lg:text-4xl font-playfairdisplay font-bold ">{headingname}</p>
      <div className={`  flex flex-col items-center mx-[1rem]  gap-[3rem] ${additionlClass}  `}>
        <div className={`  flex flex-col items-center mx-[1rem]  gap-[3rem] ${additionlClass ? "" : additionlClass}`}>


          <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-[3rem] items-center">
            <div className="w-full  flex flex-col gap-6">

              <ul className="list-disc pl-5">
                {instructions.map((item, index) => (
                  <li key={index} className="font-playfairdisplay font-bold m-[0.5rem] text-gray-900 text-sm  md:text-lg lg:text-lg">
                    {item}
                  </li>
                ))}
              </ul>


            </div>
            <div className="flex flex-col lg:flex-row gap-3">

              <img  className={`lg:w-[400px] lg:h-[250px] md:w-[300px] md:h-[150px] w-[250px] h-[150px] object-contain ${hideVideo}`} src={exerciseImage[0]} />

            </div>
            {/* <div className={`${hideVideo}`}>
              {videoUrl ? (
                <iframe
                className="lg:w-[400px] h-[250px]"
                src={videoUrl}
                allowFullScreen
                title="Workout Video"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              ></iframe>
              
              ) : (
                <p>Loading video...</p>
              )}
            </div> */}
          </div>

          <ButtonSet tips={tips} handelTips={handelTips} handelSkip={handelSkip} additionlClass={additionlClass} handelPause={handelPause} handleStartTimer={handleStartTimer} setPopUpActive={setPopUpActive} ButtonVal={ButtonVal} pause={pause}></ButtonSet>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          {exerciseImage.map((item, index) => (
            <img className="lg:w-[400px] lg:h-[250px] md:w-[300px] md:h-[150px] w-[250px] h-[150px] object-contain   " src={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailSP;


