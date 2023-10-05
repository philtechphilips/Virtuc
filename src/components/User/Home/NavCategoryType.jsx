import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import useAuthContext from '../../../context/AuthContext';

const NavCategoryType = ({category, isLoading}) => {
    const { activeCategory, setActiveCategory, activeCategoryId, setActiveCategoryId } = useAuthContext();
  return (
    <>
      <div className='hidden md:flex px-10 gap-5 pb-5 relative'>
                {isLoading ? (
                    <>
                        <Skeleton className='px-8' style={{ zIndex: "10000" }} />
                    </>
                ) : (
                    category
                        .filter((item) => item.category === activeCategory)
                        .map((item, index) => (
                            item.categoryTypes.map((type, typeIndex) => (
                                <Link
                                    to={`/shop/${type.type}`}
                                    className='text-sm p-400 text-gray-950'
                                    key={typeIndex}
                                >
                                    {type.type}
                                </Link>
                            ))
                        ))
                )}
            </div>

    </>
  )
}

export default NavCategoryType