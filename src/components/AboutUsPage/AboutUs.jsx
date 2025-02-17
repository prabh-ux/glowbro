import React, { useEffect, useState } from 'react'
import aboutUss from"../DataFile/aboutus.json";

const AboutUs = () => {
const [aboutUs,setAboutUs]=useState([]);
useEffect(() => {
const fetchAboutUs=  ()=>{

 try {
  

  if(aboutUss)
  {
    const aboutUsDetails=aboutUss.map((item=>({
  
      title:item.title,
      info:item.info  
  
     })))
     setAboutUs(aboutUsDetails);
  }
  else{
    console.log("data not avalible");
  }
  

 } catch (error) {
  console.log(error);
 }

}
fetchAboutUs();
}, [])


  return (
    <div className="relative rounded-lg bg-[#EBEBEB] h-fit w-[90%] flex flex-col justify-center items-center gap-[4rem] m-8 p-[4rem] self-center">
   
    {/* Logo */}
    <div className=" ">
        <img src="/images/logo.png" alt="Logo" />
    </div>

    {/* Article Content */}
    <div className=" w-full flex flex-col gap-[4rem] ">
        {aboutUs.map((item, index) => (
            <div key={index} className="flex flex-col gap-[2rem] self-start">
                <p className="text-[#80B918] font-extrabold font-playfairdisplay text-lg md:text-xl lg:text-2xl  ">{item.title}</p>
                <ul className=" list-disc space-y-1 font-bold font-playfairdisplay flex flex-col gap-[0.1rem]">
                    {item.info.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
</div>
  )
}

export default AboutUs
