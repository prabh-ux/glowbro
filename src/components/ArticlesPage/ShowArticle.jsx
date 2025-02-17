import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticles } from '../accessdata/fetch';

const ShowArticle = () => {
    const { articlename } = useParams();
    const [title, setTitle] = useState("title");
    const [articleInfo, setArticleInfo] = useState([]);
    const [articleImage, setArticleImage] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await fetchArticles();
                const article = data.find(item => item.title === articlename);

                if (article) {
                    setTitle(article.title);
                    setArticleImage(article.image);
                    setArticleInfo(article.sections.map(item => ({
                        heading: item.heading,
                        info: item.info,
                    })));
                } else {
                    setTitle("Article not found");
                    setArticleInfo([]);
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };
        fetchdata();
    }, [articlename]);

    return (
        <div className="relative rounded-lg bg-[#EBEBEB] h-fit w-[90%] flex flex-col justify-center items-center gap-[3rem] m-8 p-8 self-center">
            {/* Background Image  */}
            {articleImage && (
                <div className="absolute z--10 inset-0">
                    <img className="h-full w-full object-cover opacity-10" src={articleImage} alt="Article Background" />
                </div>
            )}

            {/* Logo */}
            <div className=" ">
                <img src="/images/logo.png" alt="Logo" />
            </div>

            {/* Article Title */}
            <div className=" flex w-full">
                <p className="text-[#80B918] font-playfairdisplay font-bold text-2xl">{title}</p>
            </div>

            {/* Article Content */}
            <div className=" w-full flex flex-col gap-[2rem] ">
                {articleInfo.map((item, index) => (
                    <div key={index} className="flex flex-col gap-[2rem] self-start">
                        <p className="text-[#80B918] font-extrabold font-playfairdisplay text-xl">{item.heading}</p>
                        <ul className=" pl-5 space-y-1 font-bold font-playfairdisplay flex flex-col gap-[0.5rem]">
                            {item.info.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowArticle;
