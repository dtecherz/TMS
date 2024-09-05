import React, { useState } from 'react'
import { Flex, Form, Input, Space } from 'antd'
import { UpOutlined, DownOutlined } from "@ant-design/icons"


function Quantity_Counter({ newIncrement, qty, updateQuantity, product_id, product_config_id, index }) {

    // Quantity counter
    const [count, setCount] = useState(qty || 1)
    console.log('count', count)
    function increament() {
        const newCount = count + 1
        
        setCount(newCount)
        console.log("param", product_id, product_config_id, 1, index)
        if (typeof newIncrement != "undefined" && newIncrement) newIncrement(count + 1)
        if (typeof updateQuantity != "undefined" && updateQuantity) updateQuantity(product_id, product_config_id, 1, index)
    }
    function decreament() {
        if (count > 1) {
            const newCount = count - 1
            setCount(newCount)
            // newIncrement(newCount)

            if (typeof newIncrement != "undefined" && newIncrement) newIncrement(count - 1)
            if (typeof updateQuantity != "undefined" && updateQuantity) updateQuantity(product_id, product_config_id, -1, index)
        }
    }


    return (
        <>
            <Flex align='center' className='qty_counter'>

                <input type="number" className='form_input' value={count} readOnly style={{ display: "unset", width: '100%' }} />

                <Space direction='vertical'>
                    <button type='button' onClick={() => {
                        increament();
                    }} className="add_btn">
                        <UpOutlined />
                    </button>

                    <button type='button' onClick={() => {
                        decreament();
                    }} className="add_btn">

                        <DownOutlined />
                    </button>
                </Space>
            </Flex>

        </>
    )
}

export default Quantity_Counter
