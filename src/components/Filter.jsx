import React, { useEffect, useState } from 'react'
import { Flex, Image, Input, Rate, Slider, Space } from 'antd'
import My_Button from './Button'
import related_1 from "../assets/related-shop-img-1.jpg"
import { getlistPageData } from '../ContextAPI/APIs/api';
import { useNavigate } from 'react-router-dom';
import { removeProductCategoriesFilter, updateMinMaxPriceFilter } from '../helpers/productFilters';
import ProductSearch from './Product_Desc_Components/productSearch';



const { Search } = Input;


function Filter() {

    const navigate = useNavigate();
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const [category, setCategory] = useState([])
    const [priceRange, setPriceRange] = useState([0, 20000])
    const [minMaxPrice, setMinMaxPrice] = useState([0, 20000])

    const getPageData = async () => {
        const res = await getlistPageData()
        console.log('rsssssssssssssss',res)
        if (res.success) {
            setCategory(res.categoies.filter((c)=> c.pCount !== 0 ))
            setPriceRange([res.lowestPrice, res.highestPrice])
            setMinMaxPrice([res.lowestPrice, res.highestPrice])
        }
    }

    const filterProducts = (filterName, filterValue) => {
        // Update URL with new filter parameters

        console.log("ddddddd", filterName, filterValue)
        if (location.search == "") {
            // means there is no query param in url
            const a = filterValue.replace(' ', '+')
            navigate(`?${filterName}=${a}`);
            console.log('navv', `?${filterName}=${a}`)

        } else {
            // means there are query param in url
            let query = (location.search).replace(/\+/g, ' ')
            console.log('query', query)
            const match = query.indexOf(`${filterName}=${filterValue}`)

            if (match >= 0) {

                let newStr = removeProductCategoriesFilter(query, filterName, filterValue)
                newStr = newStr.replace(/ /g, '+')
                navigate(newStr);

            } else {
                query = query.replace(/ /g, '+')
                const a = filterValue.replace(/ /g, '+')
                navigate(`${query}&${filterName}=${a}`);

            }
        }
    };

    const priceFilter = (e) => {
        console.log(e);
        setMinMaxPrice(e)


        if (location.search == "") {
            // means there is no query param in url
            navigate(`?min=${e[0]}&max=${e[1]}`);

        } else {

            let query = location.search;
            const match = query.indexOf(`min=`)

            if (match >= 0) {
                console.log("min value found");
                query = updateMinMaxPriceFilter(location.search, "min", e[0], "max", e[1])
                navigate(`?${query}`)

            } else {
                console.log("min value mot found");
                navigate(`${query}&min=${e[0]}&max=${e[1]}`);
            }
        }
    }


    // active class function 
    const activeCategory = (categorySlug) => {
        const params = new URLSearchParams(window.location.search);
        const bestFor = params.getAll("bestFor");
        console.log('bestfor', bestFor)
        return  bestFor.includes(categorySlug) ? 'CategoryActive' : 'not'
        
        // return bestFor.includes(categorySlug) ? 'active' : '';
    }



    // const sortingFunction = (sortingValue) => {
    //     const queryParams = new URLSearchParams(window.location.search);
    //     queryParams.set('price', sortingValue);
    //     navigate(`?${queryParams.toString()}`);
    //   };


    useEffect(() => {
        getPageData()

    }, [])



    return (
        <>
            <div className='product_filter_area'>

                <div className="search mb-5">
                    <h5>Search</h5>

                    <Space direction="vertical">
                        <ProductSearch />
                    </Space>
                </div>

                <div className="filter">
                    <h5>Filter</h5>

                    <Slider range value={minMaxPrice} min={priceRange[0]} max={priceRange[1]} onChange={priceFilter} />

                    <My_Button text={"Apply"} />
                </div>

                <div className='categories'>
                    <h5>Categories</h5>

                    <ul>
                        {
                            category.map((category, i) => {
                                return <li key={i} className={`${activeCategory(category?.slug)}`}><a className={`active`} href="#" onClick={(e) => {
                                    e.preventDefault();
                                    filterProducts('bestFor', category?.slug)
                                }
                                }>{category?.category_name} <span>({category?.pCount})</span></a></li>
                            })
                        }

                    </ul>
                </div>

                {/* Will use it leter */}
                {   /* <div className='related_products'>
                    <h5>Related Products</h5>

                    <ul>
                        <li>
                            <Flex gap={15}>
                                <div className=''>
                                    <Image src={related_1} alt="related_product" preview={false} className='related_product_image' />
                                </div>

                                <div>
                                    <h4 className='related_product_name'>Wooden mortar</h4>
                                    <Rate allowHalf defaultValue={2.5} />
                                    <p className='related_product_price'>$14.49</p>
                                </div>
                            </Flex>
                        </li>
                        <li>
                            <Flex gap={15}>
                                <div className=''>
                                    <Image src={related_1} alt="related_product" preview={false} className='related_product_image' />
                                </div>

                                <div>
                                    <h4 className='related_product_name'>Wooden mortar</h4>
                                    <Rate allowHalf defaultValue={2.5} />
                                    <p className='related_product_price'>$14.49</p>
                                </div>
                            </Flex>
                        </li>
                        <li>
                            <Flex gap={15}>
                                <div className=''>
                                    <Image src={related_1} alt="related_product" preview={false} className='related_product_image' />
                                </div>

                                <div>
                                    <h4 className='related_product_name'>Wooden mortar</h4>
                                    <Rate allowHalf defaultValue={2.5} />
                                    <p className='related_product_price'>$14.49</p>
                                </div>
                            </Flex>
                        </li>
                    </ul>

                </div> */}

            </div>
        </>
    )
}


export default Filter