import React, { useRef, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { ImCross } from "react-icons/im";
const SpinWheel = ({ exercises,setChallangeExe ,setIsHidden,setShowWheel}) => {

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [higlighted, setHiglighted] = useState(false);
    const [isDisable,setIsDisable]=useState("false");
    if (!exercises || exercises.length === 0) {
        return <div>Loading exercises...</div>; // Show loading state if exercises aren't available
    }


    const data = exercises && exercises.length > 0
        ? exercises.map((exercise) => ({
            option: `${exercise.name.split(" ")[0]}??? `, // Exercise name for wheel options
        }))
        : [];

        const backgroundColors = data.map((_, index) => {
            if (index === prizeNumber && higlighted) {
                return "#80B918"; // Highlight green after 4s
            }
            return "black"; // Alternate black & white
        });

    const handleSpinClick = () => {

        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setHiglighted(false);
    };
    

    return (
        <>
            <div  className="relative   w-fit h-fit flex flex-col justify-center items-center">
               <button className='ml-auto  text-red-600 text-lg' onClick={()=>setShowWheel(false)}><ImCross  /></button> 
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    outerBorderColor={["#f2f2f2"]}
                    outerBorderWidth={[10]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["#dedede"]}
                    radiusLineWidth={[1]}
                    fontSize={16}
                    textColors={["#ffffff"]}
                    backgroundColors={backgroundColors}
                    onStopSpinning={() => {
                        setMustSpin(false);
                        
                        setChallangeExe(prizeNumber);
                        setHiglighted(true);
                       setTimeout(()=>{

                        setIsHidden(true);
                       },1000)
                    }}
                />
                
                <button disabled={mustSpin} className='absolute z-20 bg-white rounded-full font-bold font-playfairdisplay text-xl p-[1rem]' onClick={handleSpinClick}>SPIN</button>
            
                
                
            </div>
        </>

    );
}

export default SpinWheel;
