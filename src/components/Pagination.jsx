import React, { useEffect, useState } from 'react'

import { Pagination } from 'antd';

function Product_Pagination({total, active,setPage,pagLimit}) {
    const [current, setCurrent] = useState(active || 1);

    useEffect(() => {
        setCurrent(active || 1); // Update current when active changes
    }, [active]);

    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
        setPage(page);
    };
    return (
        <>

            <div className='pagination'>
                
            <Pagination current={current} pageSize={pagLimit} onChange={onChange} total={total} />
                
            </div>
        </>
    )
}

export default Product_Pagination
