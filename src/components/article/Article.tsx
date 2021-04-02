import { IArticle } from "../../models/IArticle"
import "./Article.css"

interface IProps {
    article: IArticle,
    onClick: () => void
}

export const Article = (props: IProps) => {
    return (
        <div className="article" onClick={props.onClick}>
            <span className="pub-date">{new Date(props.article.pubDate).toLocaleString()}</span>
            <span className="title">{props.article.title}</span>
            <span className="description">{props.article.description}</span>
        </div>
    )
}
