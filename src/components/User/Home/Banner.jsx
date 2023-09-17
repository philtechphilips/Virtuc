import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../../api/apiRequests';
import Skeleton from 'react-loading-skeleton';
import useAuthContext from '../../../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/bundle';

const Banner = () => {
    const [banner, setBanner] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { activeCategory, setActiveCategory } = useAuthContext();
    useEffect(() => {
        async function fetchBanner() {
            try {
                const response = await apiService.fetchBanner();
                setBanner(response.data.payload);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBanner();
    }, []);

    return (
        <Swiper loop={true} autoplay={{ delay: 3000, disableOnInteraction: true }} modules={[Scrollbar, Autoplay]} scrollbar={{ draggable: true, dragSize: 60 }} initialSlide="1" spaceBetween={10} className='px-5 md:px-10'>
            {isLoading ? <Skeleton className="mt-20 py-5 md:py-20 h-56 md:h-[400px] flex w-full relative" /> :
                (banner.map((item, index) => (
                    <>
                        {item.categoryId && item.categoryId.category === activeCategory && (
                            <SwiperSlide className="mt-20 py-5 md:py-20 h-56 md:h-[400px] flex w-full relative" style={{ backgroundImage: `url(${item.imageUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} key={index}>
                                <div className='px-5 md:px-10 flex flex-col justify-end gap-1 md:gap-2 w-[450px] z-[100]'>
                                    <h1 className='p-700 text-gray-100 text-2xl'>{item.title}</h1>
                                    <p className='p-400 text-gray-100 text-sm'>{item.body}</p>
                                    <Link to={item.buttonUrl} className='p-400 text-gray-100 text-sm px-4 py-2 mt-2 border border-gray-100 w-fit rounded-sm hover:px-[17px]'>{item.buttonText}</Link>
                                </div>
                                <div style={{ content: '', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}></div>
                            </SwiperSlide>
                        )}
                    </>
                )))
            }

        </Swiper>
    );
};

export default Banner;
