import React, { useEffect, useState } from 'react'

function Sizes({ data, selectedSize, setselectedSize, matchingVariant ,colors,setSizes}) {

    // const [selectedSize, setselectedSize] = useState('')
    console.log('ssssss',colors)
    // let size = data?.productConfig?.map((p) => p?.size).map(s => s.name)
    
    let size = data?.productConfig
    ?.map((p) => p?.size)
    .filter((size) => size !== null)
    .map(s => s.name)
    
    let sizes = [...new Set(size)]


    console.log('selectedSize', selectedSize)
    console.log('matchingVariant', matchingVariant)


    useEffect(()=>{
        if(sizes.length>0  && (!selectedSize && colors.length > 0)){
            console.log(":::::::::::::::::::::")
            setSizes(sizes)
            setselectedSize(sizes[0])
        }
    },[])


    if (sizes.length == 0) return

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
