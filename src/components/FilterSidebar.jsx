import { Button, Drawer, Space } from 'antd'
import React, { useState } from 'react'
import Filter from './Filter';
import My_Button from './Button';

function FilterSidebar() {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <My_Button text={"Filter"} showDrawer={showDrawer} htmlType="button" />

            <Drawer title="Filter" placement={placement} width={400} onClose={onClose} open={open}  >
                <Filter />
            </Drawer>
        </>
    )
}

export default FilterSidebar
