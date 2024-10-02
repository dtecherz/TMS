    import { Tabs, Button } from 'antd';
    import { useState, useEffect } from 'react';
    import AddProductVariation from './Products/AddProductVariation';
    import AddProduct from './Products/AddProduct';
    import { useNavigate } from 'react-router-dom';

    function CreateProduct() {
        const [activeKey, setActiveKey] = useState('1');
        const [newProductId, setNewProductId] = useState(null);
        const [slug,setSlug] = useState("")
    const [stock,setStock] = useState(false)

        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        const navigate = useNavigate();

        useEffect(() => {
            if (id) {
                // setActiveKey('2');
            }
        }, [id]);

        const onChange = (key) => {
            setActiveKey(key);
        };

        const handleProductCreation = (key, value, slug,PStock) => {
            setNewProductId(value);
            setSlug(slug);
            
            // Update the URL with both the product ID and slug (name)
            searchParams.set(key, value);
            // searchParams.set('name', slug);  // Set the slug (name) in the URL
            setStock(PStock)
            console.log('pstock',stock,PStock)
            // Update the URL and navigate to the Add Product Variant tab
            navigate({
                pathname: window.location.pathname,
                search: searchParams.toString(),
            });
        
            // Move to the second tab (Add Product Variant)
            setActiveKey('2');
        };

        // const isTab1Disabled = activeKey === '2';
        // const isTab2Disabled = activeKey === '1';

        const items = [
            {
                key: '1',
                label: 'Create Product',
                children: <AddProduct onProductCreate={handleProductCreation}  />,
            },
            {
                key: '2',
                label: 'Add Product Variant',
                children: <AddProductVariation productId={newProductId}  stock={stock}/>,
            },
        ];

        return (
            <>
                <section className='addresses_area'>
                    <Tabs
                        activeKey={activeKey}
                        onChange={onChange}
                        className='setting_tabs'
                    >
                        {items.map((item) => (
                            <Tabs.TabPane
                                key={item.key}
                                tab={item.label}
                                // disabled={item.key === '1' ? isTab1Disabled : isTab2Disabled}
                            >
                                {item.children}
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </section>
            </>
        );
    }

    export default CreateProduct;
