import React, { useState } from 'react'
import ProductCard from '../Home/Cards/ProductCard';
import { products } from "../../../assets/data/data"
const RelatedProducts = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

    const prevSlide = () => {
        const step = isMobile ? 2 : 4;
        const newIndex = (currentIndex - step + products.length) % products.length;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const step = isMobile ? 2 : 4;
        const newIndex = (currentIndex + step) % products.length;
        setCurrentIndex(newIndex);
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + (isMobile ? 2 : 4));

  return (
      <div className='mt-10 w-full'>
                <div className='flex items-center justify-between'>
                    <h1 className='homepage-categories-container-heading p-600 text-xl md:text-2xl'>Related Products</h1>
                    <div className='flex gap-0'>
                        <div
                            onClick={prevSlide}
                            className='text-2xl p-1 rounded-tl rounded-bl border-r border-gray-100 bg-gray-100 text-gray-900 cursor-pointer'
                        >
                            <i className="ri-arrow-drop-left-line text-2xl"></i>
                        </div>
                        <div
                            onClick={nextSlide}
                            className='text-2xl p-1 bg-gray-100 rounded-tr rounded-br border-l text-gray-900 cursor-pointer'
                        >
                            <i className="ri-arrow-drop-right-line text-2xl"></i>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start gap-2 md:gap-4 mt-7 w-full overflow-x-auto'>
                    {visibleProducts.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
  )
}

export default RelatedProducts