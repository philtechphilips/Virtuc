import React, { useEffect, useState } from 'react'
import apiService from '../../../api/apiRequests';
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useAuthContext from '../../../context/AuthContext';
import NavCategoryType from './NavCategoryType';
import Cookies from 'js-cookie';


const NavBar = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [category, setCategory] = useState([]);
    const [isAcountOpen, setIsAccountOpen] = useState(false);
    const { activeCategory, setActiveCategory, activeCategoryId, setActiveCategoryId, setWishList, wishList, cart, setCart } = useAuthContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searchItems, setSearchItems] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const showNavbar = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    };

    const showSubmenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen)
    };

    const showMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen)
    };

    const clearSearch = () => {
        setQuery("");
        setSearchItems([]);
    };

    const setNewCategory = (category) => {
        localStorage.setItem("category", JSON.stringify(category));
        setActiveCategory(category.category)
        setActiveCategoryId(category.id);
    }

    useEffect(() => {
        if (user) {
            const fetchCart = async () => {
                const fetchedCart = await apiService.fetchCart(user.token);
                const transformedCart = fetchedCart.data.payload.map(item => ({
                    ...item.productId,
                    cartQuantity: item.cartQuantity,
                    selectedColor: item.color,
                    selectedSize: item.sizes
                }));

                setCart(transformedCart);
            }
            fetchCart(user.token)
        } else {
            const fetchedCart = JSON.parse(localStorage.getItem("cart"));
            if (fetchedCart != null) {
                setCart(fetchedCart);
            }
        }
    }, [])
    // console.log(cart)
    useEffect(() => {
        const fetchedWishlist = JSON.parse(localStorage.getItem("wishlist"));
        if (fetchedWishlist != null) {
            setWishList(fetchedWishlist);
        }
        async function fetchMegamenu() {
            try {
                const categories = await apiService.fetchCategory();
                setCategory(categories.data.payload)
                const selectedCategory = {
                    category: categories.data.payload[0].category,
                    id: categories.data.payload[0]._id
                };
                const selectedCat = JSON.parse(localStorage.getItem("category"));
                if (selectedCat) {
                    setActiveCategory(selectedCat.category);
                    setActiveCategoryId(selectedCat.id);
                    return true;
                }
                localStorage.setItem("category", JSON.stringify(selectedCategory));

                setActiveCategory(selectedCategory.category);
                setActiveCategoryId(selectedCategory.id);

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMegamenu()
    }, []);

    useEffect(() => {
        const getSearchItems = async () => {
            try {
                const response = await apiService.getSearchItem(query);
                setSearchItems(response.data.payload);
            } catch (error) {
                console.log(error);
                setSearchItems([]);
            }
        };
        getSearchItems();

        console.log(searchItems); // Log the updated searchItems here
    }, [query]);
    return (
        <>
            {/* Desktop menu starts here */}
            <div className={`h-8  bg-white flex justify-between items-center px-5 md:px-10 py-8  mb-5 z-[1000] border-b`}>
                <div className='md:hidden' onClick={showNavbar}>
                    <i className="text-2xl ri-menu-2-line"></i>
                </div>

                <Link to="/" className='p-600 text-xl md:text-2xl text-gray-800'>VirtuC</Link>

                <ul className="hidden md:flex justify-between gap-10 items-center p-700 relative">
                    {isLoading ? (
                        <>
                            <Skeleton style={{ zIndex: "10000 !important", padding: "1px 20px" }} />
                            <Skeleton style={{ zIndex: "10000 !important", padding: "1px 20px" }} />
                            <Skeleton style={{ zIndex: "10000 !important", padding: "1px 20px" }} />
                        </>
                    ) : (
                        category.map((categoryItem, index) => (
                            <li className="p-500 text-sm capitalize" key={index}>
                                <Link
                                    key={categoryItem._id}
                                    onClick={() => {
                                        setNewCategory({ category: categoryItem.category, id: categoryItem._id })
                                        // setActiveCategory(categoryItem.category);
                                        // setActiveCategoryId(categoryItem._id);
                                    }}
                                    className={`py-5 hover:border-b-[2px] ${activeCategory === categoryItem.category
                                        ? "text-gray-950 p-700 hover:border-gray-950"
                                        : "text-gray-600 hover:border-gray-600"
                                        } ${isLoading ? "px-6" : ""}`}
                                    to="/#"
                                >
                                    {categoryItem.category}
                                </Link>

                            </li>
                        ))
                    )}
                </ul>

                <div className="relative hidden md:flex items-center gap-10">
                    <form className=" flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                    {searchItems && searchItems.length > 0 ? (
                        <i className="ri-close-line text-xl text-gray-800 mr-1 cursor-pointer" onClick={clearSearch}></i>
                    ): (
                        <i className="ri-search-line text-xl text-gray-800 mr-1 cursor-pointer"></i>
                    )}
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none focus:outline-none p-400 w-60"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={() => setSearchItems([])}
                        />
                    </form>
                    {searchItems && searchItems.length > 0 && (
                        <div className='absolute z-[100000] top-[56px] left-0 shadow-lg bg-white p-3'>
                            <h3 className='p-400 uppercase'>Suggestions</h3>
                            {searchItems.map((item, index) => (
                                <Link to={`/product-details/${item.slug}`} className='flex mt-4 gap-4 items-center border-b border-dashed pb-3'>
                                    <img className="w-20" src={item.images[0]} alt="First Image" />
                                    <div className='flex flex-col'>
                                        <h1 className='p-500 text-sm'>{item.categoryType}</h1>
                                        <h1 className='p-600'>{item.title}</h1>
                                        <p className='p-400'>{item.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-4 cursor-pointer">
                        <div className='relative'>

                            {cart && cart.length > 0 ? (
                                <Link to="/cart" className='flex items-center relative'>
                                    <i className="ri-shopping-bag-line text-2xl"></i>
                                    <div className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-2 flex items-center justify-center'>
                                        <p className='p-400 text-xs text-white font-bold'>{cart.length}</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/cart">
                                    <i className="ri-shopping-bag-line text-2xl"></i>
                                </Link>
                            )}
                        </div>
                        <div className='relative'>
                            {wishList && wishList.length > 0 ? (
                                <Link to="/wishlist" className='flex items-center relative'>
                                    <i className="ri-heart-line text-2xl"></i>
                                    <div className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-2 flex items-center justify-center'>
                                        <p className='p-400 text-xs text-white font-bold'>{wishList.length}</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/wishlist">
                                    <i className="ri-heart-line text-2xl"></i>
                                </Link>
                            )}

                        </div>

                        <div className='relative'>
                            {user ? (
                                <Link to="/my-account" className='flex items-center relative'>
                                    <i className="ri-user-line text-2xl"></i>
                                    <div className='w-5 h-5 bg-yellow-400 rounded-full absolute -top-1 -right-2 animate-bounce flex items-center justify-center'>
                                        <p className='p-400 text-xs'>1</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/my-account">
                                    <i className="ri-user-line text-2xl"></i>
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <Link><i className="ri-search-2-line text-2xl" onClick={showMobileSearch}></i></Link>
                    <div className='relative'>
                        {cart && cart.length > 0 ? (
                            <Link to="/cart" className='flex items-center relative'>
                                <i className="ri-shopping-bag-line text-2xl"></i>
                                <div className='w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-2 flex items-center justify-center'>
                                    <p className='p-400 text-xs text-white font-bold'>{cart.length}</p>
                                </div>
                            </Link>
                        ) : (
                            <Link to="/cart">
                                <i className="ri-shopping-bag-line text-2xl"></i>
                            </Link>
                        )}
                    </div>
                    <Link to="/auth/login"><i className="ri-user-3-line text-2xl"></i></Link>

                </div>
            </div>
            {/* Desktop menu ends here */}
            {/* Mobile menu start here */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full min-h-full overflow-y-auto bg-white z-[10000] shadow transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[-1000vh]'
                    }`}
            >
                <div className='flex gap-4 items-center p-5'>
                    <i className="ri-close-line text-3xl p-400" onClick={showNavbar}></i>
                    <h1 className='p-500 text-2xl'>Virtuc</h1>
                </div>
                <div className='w-full border border-dashed'></div>
                <div className='flex gap-4 flex-col p-5'>
                    <Link className='p-500 flex items-center justify-between'>
                        <p>My VirtuC Account</p>
                    </Link>
                    <Link onClick={showNavbar} className='p-500 flex items-center gap-3'>
                        <i className="ri-shopping-bag-line text-xl"></i>
                        <p>Orders</p>
                    </Link>

                    <Link onClick={showNavbar} to="/wishlist" className='p-500 flex items-center gap-3'>
                        <i className="ri-heart-line text-xl"></i>
                        <p>Saved Items</p>
                    </Link>

                    <Link onClick={showNavbar} className='p-500 flex items-center gap-3'>
                        <i className="ri-message-3-line text-xl"></i>
                        <p>Pending Review</p>
                    </Link>
                    <div className='w-full border border-dashed'></div>
                    <Link className='p-500 flex items-center justify-between'>
                        <p>Categories</p>
                    </Link>
                    {category.map((categoryItem, index) => (
                        <div onClick={() => {
                            showSubmenu();
                            setNewCategory({ category: categoryItem.category, id: categoryItem._id })
                            // setActiveCategory(categoryItem.category)
                        }} className='p-400 flex items-center justify-between' key={index}>
                            <p>{categoryItem.category}</p>
                            <i className="ri-arrow-right-s-line"></i>
                        </div>

                    ))}
                    <div className='w-full border border-dashed'></div>
                    <Link to="/auth/login" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 bg-gray-900 text-center text-white'>
                        Sign In
                    </Link>
                    <Link to="/auth/create-account" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 border-2 border-gray-900 text-center text-gray-900'>
                        Register
                    </Link>
                </div>
            </div>
            {/* Mobile menu ends here */}

            {/* Submenu for mobile */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full min-h-full overflow-y-auto bg-white z-[100000] shadow transition-transform duration-300 ease-in-out ${isSubMenuOpen ? 'translate-x-0' : 'translate-x-[1000vw]'
                    }`}
            >
                <div className='flex gap-4 items-center justify-between p-5'>
                    <div className='flex gap-4 items-center'>
                        <i className="ri-arrow-left-s-line text-3xl p-400" onClick={showSubmenu}></i>
                        <h1 className='p-500 text-xl'>{activeCategory}</h1>
                    </div>
                    <div>
                        <i className="ri-close-line text-3xl p-400" onClick={() => {
                            showNavbar()
                            showSubmenu()
                        }}></i>
                    </div>
                </div>
                <div className='w-full border border-dashed'></div>
                <div className='flex gap-4 flex-col p-5'>
                    {category
                        .filter((item) => item.category === activeCategory)
                        .map((item, index) => (
                            item.categoryTypes.map((type, typeIndex) => (
                                <Link to={`/shop/${type.type}`} className='p-400 flex items-center justify-between' key={typeIndex}>
                                    <p>{type.type}</p>
                                </Link>

                            ))))}
                    <div className='w-full border border-dashed'></div>
                    <Link className='p-500 flex items-center justify-between'>
                        <p>VirtuC Account</p>
                    </Link>
                    <Link onClick={showNavbar} className='p-500 flex items-center gap-3'>
                        <i className="ri-shopping-bag-line text-xl"></i>
                        <p>Orders</p>
                    </Link>

                    <Link onClick={showNavbar} to="/wishlist" className='p-500 flex items-center gap-3'>
                        <i className="ri-heart-line text-xl"></i>
                        <p>Saved Items</p>
                    </Link>

                    <Link onClick={showNavbar} className='p-500 flex items-center gap-3'>
                        <i className="ri-message-3-line text-xl"></i>
                        <p>Pending Review</p>
                    </Link>
                    <div className='w-full border border-dashed'></div>
                    <Link to="/auth/login" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 bg-gray-900 text-center text-white'>
                        Sign In
                    </Link>
                    <Link to="/auth/create-account" className='p-700 flex items-center justify-center py-3 rounded-lg gap-3 border-2 border-gray-900 text-center text-gray-900'>
                        Register
                    </Link>
                </div>
            </div>
            {/* Submenu for mobile ends here */}

            {/* Mobile search starts here */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full min-h-full overflow-y-scroll bg-white z-[100000] shadow transition-transform duration-300 ease-in-out ${isMobileSearchOpen ? 'translate-x-0' : 'translate-x-[1000vw]'
                    }`}
            >
                <div className='flex gap-2 items-center justify-between p-1 py-5'>
                    <div className='flex gap-4 items-center'>
                        <i className="ri-arrow-left-s-line text-2xl p-400" onClick={showMobileSearch}></i>
                        <form className=" flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
                            <i className="ri-search-line text-lg text-gray-400 mr-1 cursor-pointer"></i>
                            <input
                                type="text"
                                placeholder="Search"
                                className="flex-1 bg-transparent border-none focus:outline-none p-400 w-60"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={() => setSearchItems([])}
                            />
                        </form>
                    </div>
                    <div onClick={clearSearch}>
                        <p className='p-400'>Clear</p>
                    </div>
                </div>
                <div className='w-full border border-dashed'></div>
                <div className='flex gap-4 flex-col p-5'>
                    {searchItems.map((item, index) => (
                        <Link to={`/product-details/${item.slug}`} className='flex mt-4 gap-4 items-center border-b border-dashed pb-3'>
                            <img className="w-20" src={item.images[0]} alt="First Image" />
                            <div className='flex flex-col'>
                                <h1 className='p-500 text-sm'>{item.categoryType}</h1>
                                <h1 className='p-600'>{item.title}</h1>
                                <p className='p-400'>{item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Mobile search starts here */}

            {/* Submenu for desktop */}
            <NavCategoryType category={category} isLoading={isLoading} />
            {/* Submenu for desktop ends here */}

        </>
    )
}

export default NavBar