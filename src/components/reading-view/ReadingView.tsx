import { useEffect, useState } from "react"
import { getArticleText } from "../../api/api"
import { IArticle } from "../../models/IArticle"
import "./ReadingView.css"

interface IProps {
    article?: IArticle
    onClose: () => void
}

export const ReadingView = (props: IProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [text, setText] = useState<string>()

    useEffect(() => {
        if (!props.article) {
            setIsExpanded(false)
            return
        }

        setIsExpanded(true)

        const fetchData = async () => {
            const fetchedText = await getArticleText(props.article!)
            setText(
                fetchedText
                    ?.replaceAll(/^\s+|\s+$/gm, " ")
                    ?.replaceAll(/<\/?[a-z][a-z0-9]*[^<>]*>/gi, "")
                    ?.replaceAll("&nbsp;", "")
                    ?.trim()
            )
        }

        fetchData()
    }, [props.article])

    useEffect(() => {
        if (!isExpanded) {
            setText(undefined)
        }
    }, [isExpanded, text])

    return (
        <div
            key={"reading-view-expanded-panel"}
            className="expanded-panel reading-view"
            style={{
                transform: `translate(0, ${isExpanded ? "0" : "100%"})`,
            }}
        >
            <button className="close" onClick={() => setIsExpanded(false)}>
                Close
            </button>

            {!text ? (
                <span className="loading">Loading...</span>
            ) : (
                <>
                    <span className="text">{text}</span>
                    <a href={props.article?.link} className="link">
                        ↗ View on ansa.it
                    </a>
                </>
            )}
        </div>
    )
}
