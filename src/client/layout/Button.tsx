import React, { ReactNode } from "react"

interface Props {
    className?: string,
    onClick: () => void,
    children: ReactNode
}

export const Button = React.memo((props: Props) => {
    const { children, className, onClick } = props

    return (
        <button className={`button ${className ?? ""}`} onClick={onClick}>
            {children}
        </button>
    )
})
