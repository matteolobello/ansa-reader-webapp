let urlSearchParams = new URLSearchParams(window.location.search)
let articleUrl = urlSearchParams.get("url")
let articleTitle = urlSearchParams.get("title")

if (!articleUrl || !articleTitle) {
    location.href = "index.html"
} else {
    $(".article-title").html(articleTitle)

    $("body").on("click", ".article-toolbar-back", function () {
        history.back()
    })

    $.getJSON("https://api.allorigins.win/get?url=" + articleUrl,
        function (res) {
            if (res) {
                let article = parseArticleContent(res)

                $(".article-title").html(article.title)
                $(".article-text").html(article.text)
            } else {
                if (confirm("Error while making network request, try again?")) {
                    loadArticleContent()
                } else {
                    history.back()
                }
            }
        }
    )
}