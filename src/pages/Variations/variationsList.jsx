import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllVariants } from '../../ContextAPI/APIs/api';
import formatDate from '../../helpers/dateFormater';
import { Link } from 'react-router-dom';
import MyModal1 from '../../components/MyModal1';

function VariationsList() {


    const [variation, setVariations] = useState([])
    const [page, setPage] = useState(1)
    const [totalVariation, setTotalVariation] = useState(0);
    const [VariationLimitPerPage, setVariationLimitPerPage] = useState(10);



    const getVraiations = async () => {
        try {
            const response = await getAllVariants(page)
            if (response.success) {
                setVariations(response.variations)
                setTotalVariation(response.totalVariations)
                setVariationLimitPerPage(response.VariationPerPage)
            }
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
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },

    ];

    const data = variation.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,
            createdAt: formatDate(e.createdAt),
            action: <button className='option' style={{ background: "transparent", border: "1px solid grey", color: "black" }}><Link to={`/variation-option-list/${e._id}`}> Options</Link></button>

        }
    })
    const onChange = (page) => {
        console.log("page", page)
        setPage(page);
    };


    useEffect(() => {
        getVraiations()
    }, [page])

    return (
        <>



            <section className='addresses_area'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0rem" }}>Variation List</h2>

                    <MyModal1 getVraiations={getVraiations} />

                </div>

                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }}

                    pagination={{
                        current: page,
                        pageSize: VariationLimitPerPage,
                        total: totalVariation,
                        onChange: onChange,
                    }}

                />
            </section>
        </>
    )
}

export default VariationsList
