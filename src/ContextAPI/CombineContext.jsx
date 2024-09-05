export const CombineComponents = (...components) => {
    return components.reduce(
        (AccumulatedComponents, CurrentComponents) => {
            return ({ children }) => (
                <>
                    <AccumulatedComponents>
                        <CurrentComponents>
                            {children}
                        </CurrentComponents>
                    </AccumulatedComponents>
                </>
            )
        },
        ({ children }) => <>{children}</>
    )
}