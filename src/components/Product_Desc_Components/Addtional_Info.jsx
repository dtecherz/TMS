import React from 'react'

function Addtional_Info({ data = "" }) {
    return (
        <>
            {
                data ||
                <>
                    <h2>It's a dummy data</h2>
                    <h5>Weight <span className='span'>0.5kg</span></h5>
                    <h5>Dimensions <span className='span'>15 × 20 × 20 cm</span></h5>
                </>
            }
        </>
    )
}

export default Addtional_Info
