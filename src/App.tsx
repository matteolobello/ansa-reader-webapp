import { useEffect, useState } from "react"
import { getArticles } from "./api/api"
import "./App.css"
import { Article } from "./components/article/Article"
import { ArticleSkeleton } from "./components/article/ArticleSkeleton"
import { Menu } from "./components/menu/Menu"
import { ReadingView } from "./components/reading-view/ReadingView"
import { IArticle } from "./models/IArticle"
import { CATEGORIES, ICategory } from "./models/ICategory"

export const App = () => {
    const [category, setCategory] = useState<ICategory>(
        CATEGORIES[0] as ICategory
    )
    const [articles, setArticles] = useState<Array<IArticle> | undefined>()
    const [selectedArticle, setSelectedArticle] = useState<
        IArticle | undefined
    >()
    const [shouldLockBodyScroll, setShouldLockBodyScroll] = useState<boolean>(
        false
    )

    useEffect(() => {
        setArticles(undefined)

        const fetchData = async () => {
            try {
                const fetchedArticles = await getArticles(category)
                setArticles(fetchedArticles)
            } catch (err) {
                console.error(err)
                alert("Error while fetching news")
            }
        }

        fetchData()
    }, [category, setArticles])

    return (
        <div style={shouldLockBodyScroll ? { position: "fixed" } : {}}>
            <Menu
                onExpandToggle={setShouldLockBodyScroll}
                onCategorySelected={setCategory}
            />

            <ReadingView
                article={selectedArticle}
                onClose={() => setSelectedArticle(undefined)}
            />

            <h1>ANSA</h1>

            <div className="articles">
                {!articles
                    ? new Array(50)
                          .fill(0)
                          .map((_: number, index: number) => (
                              <ArticleSkeleton key={`skeleton-${index}`} />
                          ))
                    : articles?.map((article: IArticle, index: number) => (
                          <Article
                              key={`article-${index}`}
                              article={article}
                              onClick={() => setSelectedArticle({ ...article })}
                          />
                      ))}
            </div>
        </div>
    )
}
