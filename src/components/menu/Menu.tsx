import { useEffect, useState } from "react"
import { CATEGORIES, ICategory } from "../../models/ICategory"
import "./Menu.css"

interface IProps {
    onExpandToggle: (isExpanded: boolean) => void
    onCategorySelected: (category: ICategory) => void
}

const Hamburger = (props: { onClick: () => void }) => {
    return (
        <svg
            onClick={props.onClick}
            className="hamburger"
            enableBackground="new 0 0 44 44"
            height="44"
            viewBox="0 0 32 32"
            width="44"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m4 10h24c1.104 0 2-.896 2-2s-.896-2-2-2h-24c-1.104 0-2 .896-2 2s.896 2 2 2zm24 4h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2zm0 8h-24c-1.104 0-2 .896-2 2s.896 2 2 2h24c1.104 0 2-.896 2-2s-.896-2-2-2z" />
        </svg>
    )
}

export const Menu = (props: IProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    useEffect(() => {
        props.onExpandToggle(isExpanded)
    }, [isExpanded])

    return (
        <>
            <Hamburger onClick={() => setIsExpanded(!isExpanded)} />

            <div
                key={"menu-expanded-panel"}
                className="expanded-panel"
                style={{
                    transform: `translate(0, ${isExpanded ? "0" : "100%"})`,
                }}
            >
                <button
                    className="close"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Close
                </button>

                {CATEGORIES.map((category, index) => {
                    const isDivider = typeof category == "string"
                    if (isDivider) {
                        return (
                            <div key={`divider-${index}`} className="divider">
                                {category}
                            </div>
                        )
                    }

                    return (
                        <div
                            key={`category-${index}`}
                            className="category"
                            onClick={() => {
                                setIsExpanded(false)
                                props.onCategorySelected(category as ICategory)
                            }}
                        >
                            {(category as ICategory).name}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
