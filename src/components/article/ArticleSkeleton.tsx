import "./ArticleSkeleton.css"

export const ArticleSkeleton = () => {
    return (
        <div className="article">
            <span className="skeleton pub-date" />
            <span className="skeleton title" />
            <span className="skeleton description" />
        </div>
    )
}
