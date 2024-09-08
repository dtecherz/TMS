import React from 'react'

function Addtional_Info({ data = "" }) {
    return (
        <>
            {
                data && <div dangerouslySetInnerHTML={{ __html: data }} />
            }
        </>
    )
}

export default Addtional_Info
