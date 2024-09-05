import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../ContextAPI/Components/notify';
import { getAllVariationBasisOnVariant } from '../../ContextAPI/APIs/api';
import { useParams } from 'react-router-dom';
import MyModal2 from '../../components/MyModal2';

const VariationOptionList = () => {

    const { id } = useParams()
    const [variationOption, setVariationOption] = useState([])



    const getVriationOption = async () => {
        try {
            const response = await getAllVariationBasisOnVariant(id)
            if (response.success) setVariationOption(response.variationOptions)
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },


    ];

    const data = variationOption.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,

        }
    })


    useEffect(() => {
        getVriationOption()
    }, [])
    return (
        <>
            <section className='addresses_area'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0rem" }}>Variation Option List</h2>

                    <MyModal2 variation_id={id} getVriationOption={getVriationOption} />

                </div>

                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} pagination={false} />
            </section>
        </>
    )
}

export default VariationOptionList
