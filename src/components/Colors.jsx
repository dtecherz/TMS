import React, { useState } from 'react'

function Colors({data,selectedColor,setselectedColor,matchingVariant}) {

    // const [selectedColor, setselectedColor] = useState()

   let color = data?.productConfig?.map((p)=>p.color).map(s=>s.name)
   let colors = [...new Set(color)]

   console.log('colors',colors)
   console.log('selectedColor',selectedColor)
   console.log('matchingVariant',matchingVariant)
    return (
        <>
            <div className="colors">

                <h5>Colors</h5>

                {/* <div className='flex flex-wrap gap-1'>
                    <span className={"selected-color-circle"}></span>
                    <span className={"color-circle"}></span>
                </div> */}

                <div className='flex flex-wrap gap-1'>
                    {
                        (colors).length > 0 && (colors).map((color, i) => {
                            return <span key={i} className={`${selectedColor === color ? "selected-color-circle" : "color-circle"}`} onClick={() => setselectedColor(color)} style={{ backgroundColor: `${color}` }}></span>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Colors
