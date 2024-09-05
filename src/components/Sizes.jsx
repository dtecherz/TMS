import React, { useState } from 'react'

function Sizes({ data, selectedSize, setselectedSize, matchingVariant }) {

    // const [selectedSize, setselectedSize] = useState('')

    let size = data?.productConfig?.map((p) => p.size).map(s => s.name)
    let sizes = [...new Set(size)]

    console.log('selectedSize', selectedSize)
    console.log('matchingVariant', matchingVariant)
    return (
        <>

        {sizes.every(value => value  !== undefined)  ? 
        <div className="sizes">

        <h5>Sizes</h5>
        {/* 
        <div className='flex flex-wrap gap-3'>
            <span className={"defaultTagStyle"} >{"M"}</span>
            <span className={"sizeSelected"} >{"M"}</span>
        </div> */}


        {/* <div className="flex flex-wrap gap-3">
            {
                (sizes).length > 0 && (sizes).map((size, i) => {
                    return <span key={i} className={`${size === selectedSize ? "sizeSelected" : "defaultTagStyle"}`} onClick={(e) => setselectedSize(size)}>{size}</span>
                })
            }
        </div> */}


        <div className="flex flex-wrap gap-3">
            {sizes.length > 0 && sizes.map((size, index) => {
                // Check if size exists in matchingVariant
                const isEnabled = matchingVariant ? matchingVariant?.some(variant => variant.size.name === size) : true;
                return (
                    <span
                        key={index}
                        className={`tag ${size === selectedSize ? "sizeSelected" : ""} ${isEnabled ? "" : "disabled"}`}
                        onClick={() => isEnabled && setselectedSize(size)}
                    >
                        {size}
                    </span>
                );
            })}
        </div>
    </div>

    :
    <></>
    
    
    
    }
            
        </>
    )
}

export default Sizes
