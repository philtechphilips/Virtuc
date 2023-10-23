import React, { useEffect, useState } from 'react'
import apiService from '../../../api/apiRequests';


const CTA = () => {
  const [content, setContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await apiService.getHeaderBar();
      setContent(response.data.payload);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000); // Change content every 5 seconds

    return () => clearInterval(interval);
  }, [content]);
  return (
    <>
      {content && content.length > 0 && content.map((item, index) => (
         <div key={index} className={`h-full z-[1000000] ${index === currentIndex ? 'fade-in' : 'fade-out'}`}>
             <div
               className={` text-center h-full p-400 text-sm flex-col items-center justify-center  ${index > 0 ? 'bg-gray-900 text-gray-50' : 'bg-gray-200 text-gray-900'} py-1 md:py-2 z-[100000] md:px-20`}
             >
               {item.content}
             </div>
         </div>
      ))}
    </>

  )
}

export default CTA