import React, { useEffect, useState } from 'react';
import { Flex, Image, Input, Rate, Slider, Space } from 'antd';
import My_Button from './Button';
import related_1 from "../assets/related-shop-img-1.jpg";
import { getlistPageData } from '../ContextAPI/APIs/api';
import { useNavigate } from 'react-router-dom';
import { removeProductCategoriesFilter, updateMinMaxPriceFilter } from '../helpers/productFilters';
import ProductSearch from './Product_Desc_Components/productSearch';

const { Search } = Input;

function Filter() {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 20000]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 20000]);

    const getPageData = async () => {
        const res = await getlistPageData();
        console.log('rsssssssssssssss', res);
        if (res.success) {
            // Filter categories based on active status and pCount > 0
            const activeCategories = res.categoies.filter(c => c.pCount > 0 && c.status === "active");
            setCategory(activeCategories);
            setPriceRange([res.lowestPrice, res.highestPrice]);
            setMinMaxPrice([res.lowestPrice, res.highestPrice]);
        }
    };

    const filterProducts = (filterName, filterValue) => {
        console.log("ddddddd", filterName, filterValue);
        if (location.search === "") {
            const a = filterValue.replace(' ', '+');
            navigate(`?${filterName}=${a}`);
        } else {
            let query = location.search.replace(/\+/g, ' ');
            const match = query.indexOf(`${filterName}=${filterValue}`);
            if (match >= 0) {
                let newStr = removeProductCategoriesFilter(query, filterName, filterValue);
                newStr = newStr.replace(/ /g, '+');
                navigate(newStr);
            } else {
                query = query.replace(/ /g, '+');
                const a = filterValue.replace(/ /g, '+');
                navigate(`${query}&${filterName}=${a}`);
            }
        }
    };

    const priceFilter = (e) => {
        console.log(e);
        setMinMaxPrice(e);
        if (location.search === "") {
            navigate(`?min=${e[0]}&max=${e[1]}`);
        } else {
            let query = location.search;
            const match = query.indexOf(`min=`);
            if (match >= 0) {
                query = updateMinMaxPriceFilter(location.search, "min", e[0], "max", e[1]);
                navigate(`?${query}`);
            } else {
                navigate(`${query}&min=${e[0]}&max=${e[1]}`);
            }
        }
    };

    const activeCategory = (categorySlug) => {
        const params = new URLSearchParams(window.location.search);
        const bestFor = params.getAll("bestFor");
        return bestFor.includes(categorySlug) ? 'CategoryActive' : 'not';
    };

    useEffect(() => {
        getPageData();
    }, []);

    return (
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
                    {category.map((cat, i) => (
                        <li key={i} className={activeCategory(cat?.slug)}>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                filterProducts('bestFor', cat?.slug);
                            }}>
                                {cat?.category_name} <span>({cat?.pCount})</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Filter;
