import React, { useEffect, useState } from 'react'
import { fetchArticles } from '../accessdata/fetch'
import ArticlesCard from './article components/ArticlesCard'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
const Articles = () => {

  const [article,setArticle]=useState([]);
  


useEffect(() => {
  const getArticles= async () => {
    try {
      
 const data= await fetchArticles();

  const allarticles= data.map((item)=>({
   title:item.title,
   image:`${item.image}`,
  }));
setArticle(allarticles);


    } catch (error) {
      console.error(error);
    }
  }
 getArticles();
}, [])



  return (
    <div className='w-full flex justify-center pb-[2rem]  '  >
<div className=' grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-y-[1rem] gap-x-[3rem]  overflow-hidden ' >
{article.map((item,index)=>(
<motion.div key={index}
          initial={{scale:1,opacity:0}}
          animate={{scale:1}}
          whileInView={{scale:1,opacity:1}}
          transition={{duration:0.5,ease:"easeOut"}}>
<ArticlesCard   item={item} ></ArticlesCard>
</motion.div>

) )}
</div>
      
      
    </div>
  )
}

export default Articles
