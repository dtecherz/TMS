import React, { useEffect, useState } from 'react'

function Colors({ data, selectedColor, setselectedColor, matchingVariant, setColors }) {

    // const [selectedColor, setselectedColor] = useState()

    console.log("data?.productConfig", data?.productConfig);


    let color = data?.productConfig
        ?.map((p) => p?.color)
        .filter((color) => color !== null)
        .map(s => s.name)

    console.log("colorcolorcolor", color);
    let colors = [...new Set(color)]
    

    console.log('colors', colors)
    console.log('selectedColor', selectedColor)
    console.log('matchingVariant', matchingVariant)


    // Set the default selected color to the first item in colors
    useEffect(() => {
        if (colors.length > 0 && !selectedColor) {
            setColors(colors)
            setselectedColor(colors[0]); // Set the first color by default
        }
    }, []);

    if (colors.length == 0) return

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
