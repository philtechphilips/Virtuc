import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bannerSlides } from '../../../assets/data/data';

const Banner = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + bannerSlides.length) % bannerSlides.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % bannerSlides.length;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const autoScrollDelay = 6000;

    useEffect(() => {
        const autoScrollTimer = setInterval(() => {
            nextSlide();
        }, autoScrollDelay);

        return () => {
            clearInterval(autoScrollTimer);
        };
    }, [currentIndex]);


    return (
        <>
            <div className='max-w-[1400px] h-[480px] hidden md:block w-full m-auto md:px-10 sm:px-5 relative group z-[-100]'>
                <div
                    style={{ backgroundImage: `url(${bannerSlides[currentIndex].image})` }}
                    className='w-full h-full rounded-lg bg-center bg-cover duration-200 relative'
                >

                    <div className="absolute top-0 left-0 z-1 w-full h-full bg-blue-900 opacity-60 rounded-lg"></div>

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-2">
                        <h1 className="text-white md:text-5xl sm:text-lg text-center p-600 leading-snug w-[800px] mb-10">{`${bannerSlides[currentIndex].title}`}</h1>
                        <div className=""><Link to="/#" className="p-600 text-gray-900 px-4 py-2 bg-white rounded-sm">Shop Now <i className="ri-arrow-right-line"></i></Link></div>
                    </div>
                </div>

                <div className='flex gap-24'>
                    <div
                        onClick={prevSlide}
                        className='absolute top-[10%] -translate-x-0 translate-y-[-50%] right-36 text-2xl  p-1 mr-8 rounded-tl rounded-bl border-r bg-white text-gray-900 cursor-pointer'
                    >
                        <i className="ri-arrow-drop-left-line text-2xl"></i>
                    </div>
                    {/* Right Arrow */}
                    <div
                        onClick={nextSlide}
                        className='absolute top-[10%] -translate-x-0 translate-y-[-50%] right-36 text-2xl p-1 bg-white rounded-tr rounded-br border-l text-gray-900 cursor-pointer'
                    >
                        <i className="ri-arrow-drop-right-line text-2xl"></i>
                    </div>
                </div>
                <div className='flex gap-2 absolute bottom-4 right-[50%] justify-center py-2'>
                    {bannerSlides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`text-sm cursor-pointer ${currentIndex === slideIndex ? 'text-white' : 'text-gray-400'}`}
                        >
                            <i className="ri-circle-fill text-xs"></i>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Banner;
