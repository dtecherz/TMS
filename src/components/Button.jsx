import { Button } from 'antd'
import React from 'react'

function My_Button(props) {
    return (
        <>
            {
                props.showDrawer ?
                    <Button type="link" block className={`btn ${props.customClass}`} htmlType={props.htmlType} onClick={() => props.showDrawer()}>
                        {props.text}
                    </Button>
                    :
                    <Button type="link" block className={`btn ${props.customClass}`} htmlType={props.htmlType}    onClick={() => props.onClick()}>
                        {props.text}
                    </Button>
            }
        </>
    )
}

export default My_Button
