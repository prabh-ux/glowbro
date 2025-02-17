import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ArticlesCard = ({ item }) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  return (
   
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={` relative h-[139px] lg:h-[341px] md:h-[341px] lg:w-[242px]  md:w-[242px] bg-[#EBEBEB] rounded-lg flex flex-row-reverse   md:flex-col lg:flex-col justify-between items-center overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg hover:cursor-pointer mx-[1rem] md:m-0 lg:m-0 `}
    >
      <span className="text-xl font-playfairdisplay font-bold text-center text-[#333] m-[1rem]">{item.title.split(':')[0]}</span>
    <img
        className="object-contain opacity-90 w-[80%] h-[80%] mt-auto rounded-md inset-0"
        src={item.image}
        alt={item.title}
      />
    {hovering&& <div className=" absolute z-20  inset-0 flex justify-center items-center backdrop-blur-md h-full w-full  ">
        <Link to={`/articles/showarticle/${encodeURIComponent(item.title)}`} className="bg-black text-white rounded-lg p-[1rem]">Read Now</Link>
      </div>} 
    </div>
  );
};

export default ArticlesCard;