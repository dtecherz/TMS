import React, { useState } from 'react'

function Material({ data ,selectedmaterial,setselectedMaterial,matchingVariant}) {

    // const [selectedmaterial, setselectedMaterial] = useState('')

    let material = data?.productConfig?.map((p) => p.materail).map(s => s?.name)
    let materials = [...new Set(material)]
    console.log("materials", materials)
    return (
        <>

            {

                materials.every(value => value  !== undefined) ?
                <div className="materials">

                <h5>Material</h5>

           


                <div className="flex flex-wrap gap-3">
                    {
                        (materials).length > 0 ? (materials).map((materail, i) => {

                const isEnabled = matchingVariant ? matchingVariant?.some(variant => variant.size.name === size) : true;

                            return (
                            <span key={i} className={`tag ${materail === selectedmaterial ? "materialSelected" : "defaultTagStyle"}  ${isEnabled ? "" : "disabled"}`} onClick={(e) => isEnabled &&  setselectedMaterial(materail)}>{materail}</span>
                        )
                        })
                            :
                            <></>
                    }
                </div>


            </div>
            :
            <></>
            }
           



        </>
    )
}

export default Material
