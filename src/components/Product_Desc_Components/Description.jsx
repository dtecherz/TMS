import React from 'react'

function Description({ data = "" }) {
    return (
        <>
            <p className='product_desc'>
                {data || `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor se incididunt ut labore et dolore magna aliqua. Ut enim ad min im veniam, quis nostruda exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ire dolor in reprehenderit in olupt ate velit esse cillum. dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.`}
            </p>
        </>
    )
}

export default Description
