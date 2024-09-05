import { createContext, useContext, useState } from "react"
import { Blocks, Hourglass, InfinitySpin, MagnifyingGlass, Oval, RotatingLines, TailSpin, Watch, Radio } from "react-loader-spinner";


/**
 * 
 * Reference Link
 * https://mhnpd.github.io/react-loader-spinner/docs/intro
 * 
 */



// Step 1
const LoaderContext = createContext()

// Step 2
export const useLoader = () => {
    return useContext(LoaderContext);
}

// Step 3
export const LoaderProvider = ({ children }) => {

    const [loader, setLoader] = useState({ state: false, type: "RotatingLines" });

    const stopLoader = () => setLoader({ state: false })

    const startLoader = (type) => {
        setLoader({ state: true, type })

        setTimeout(() => {
            setLoader(false)
        }, 5000);
    }


    return (
        <LoaderContext.Provider value={{ startLoader, stopLoader }}>
            {children}

            {
                loader.state &&
                <div className="loader">

                    {
                        loader.type == "RotatingLines" ?
                            <RotatingLines
                                visible={true}
                                height="96"
                                width="96"
                                color="red"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            :
                            loader.type == "MagnifyingGlass" ?
                                < MagnifyingGlass
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="magnifying-glass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="magnifying-glass-wrapper"
                                    glassColor="#c0efff"
                                    color="#e15b64"
                                />
                                :
                                loader.type == "Blocks" ?
                                    <Blocks
                                        height="80"
                                        width="80"
                                        color="#4fa94d"
                                        ariaLabel="blocks-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="blocks-wrapper"
                                        visible={true}
                                    />
                                    :
                                    loader.type == "Hourglass" ?
                                        <Hourglass
                                            visible={true}
                                            height="80"
                                            width="80"
                                            ariaLabel="hourglass-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            colors={['#306cce', '#72a1ed']}
                                        />
                                        :
                                        loader.type == "InfinitySpin" ?
                                            <InfinitySpin
                                                visible={true}
                                                width="200"
                                                color="red"
                                                ariaLabel="infinity-spin-loading"
                                            />
                                            :
                                            loader.type == "Oval" ?
                                                <Oval
                                                    visible={true}
                                                    height="80"
                                                    width="80"
                                                    color="red"
                                                    ariaLabel="oval-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                                :
                                                loader.type == "TailSpin" ?
                                                    <TailSpin
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        color="red"
                                                        ariaLabel="tail-spin-loading"
                                                        radius="1"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                    />
                                                    :
                                                    loader.type == "Radio" ?
                                                        <Radio
                                                            visible={true}
                                                            height="80"
                                                            width="80"
                                                            color="#4fa94d"
                                                            ariaLabel="radio-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />
                                                        :
                                                        <Watch
                                                            visible={true}
                                                            height="80"
                                                            width="80"
                                                            radius="48"
                                                            color="red"
                                                            ariaLabel="watch-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />

                    }

                </div>
            }

        </LoaderContext.Provider>
    )
}