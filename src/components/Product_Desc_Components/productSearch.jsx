import { AutoComplete } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchProduct } from '../../ContextAPI/APIs/api';

export default function ProductSearch() {
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [anotherOption, setAnotherOption] = useState([]);
    let debounceTimer;
    console.log('opt',options)
    const debounce = (func, delay) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };

    const getPanelValue = async (searchText) => {
        try {
            const res = await getSearchProduct(searchText);
            if (res.success) {
                const productsFormatted = res.products.map(e => ({ value: e.name }));
                setAnotherOption(productsFormatted);
                setOptions(res.products);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            // Handle error as per your application's requirements
        }
    };

    const onSelect = (data) => {
        const product = options.find(e => e.name === data);
        console.log('////',product)
        if (product?._id) navigate(`/product/${product.slug}`);
    };

    return (
        <AutoComplete
            style={{
                width: 300,
            }}
            options={anotherOption}
            placeholder="Type Product name"
            filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={onSelect}
            onSearch={(text) => debounce(() => getPanelValue(text), 300)} // Adjust debounce delay as needed
        />
    );
}