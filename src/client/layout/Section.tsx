import React, { ReactNode } from "react"

interface Props {
    className?: string,
    children: ReactNode
}

export const Section = React.memo((props: Props) => {
    const { children, className } = props

    return (
        <section className={`section ${className ?? ""}`}>
            {children}
        </section>
    )
})
