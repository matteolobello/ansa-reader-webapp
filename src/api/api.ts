import X2JS from "x2js"
import { ICategory } from "../models/ICategory"
import { IArticle } from "../models/IArticle"

// Used as a workaround for Cross Origin Security Policy
const ALL_ORIGINS_BASE_URL = "https://api.allorigins.win/get?url="

const x2js = new X2JS()

export const getArticles = async (category: ICategory) => {
    const resRaw = await fetch(ALL_ORIGINS_BASE_URL + category.url)
    const resJson = await resRaw.json()
    const resXml = resJson.contents

    return x2js.xml2js<any>(resXml).rss.channel.item
}

export const getArticleText = async (article: IArticle) => {
    const resRaw = await fetch(ALL_ORIGINS_BASE_URL + article.link)
    const resJson = await resRaw.json()
    const resHtml = resJson.contents

    const tmpEl = document.createElement("html")
    tmpEl.innerHTML = resHtml
    const body = tmpEl.querySelector(".news-txt")?.innerHTML

    tmpEl.remove()

    return body
}
