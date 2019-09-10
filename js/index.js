// Used as a workaround for Cross Origin Security Policy
const ALL_ORIGINS_BASE_URL = "https://api.allorigins.win/get?url="

// The message of the dialog that appears 
// when you tap on the 'Add to homescreen' icon 
const PWA_ALERT_MSG = `This page can be downloaded and installed like a normal app
    \n
    \nIf you're on iOS, press the share button and then "Add to homescreen".
    \nIf you're on Android, press the three dots button and tap "Add to homescreen".
`

/** Articles loading and dispatch */

function dispatchArticlesByCategory(url, optCallback) {
    setLoadingState(true)

    $.getJSON(ALL_ORIGINS_BASE_URL + url,
        function (res) {
            if (!res) {
                alert("Error while making network request")
            } else {
                let articles = parseArticlesList(res)
                addArticles(articles)
                if (optCallback) {
                    optCallback(articles)
                }
                setLoadingState(false)
            }
        }
    )
}

/** DOM manipulations */

function addArticles(articles) {
    $("#articles-list").html("")

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i]
        if (!article || !article.link || !article.title) {
            console.log("Could not add article to list")
            continue
        }

        let html = `
            <li>
                <div class="article" data-article-url="` + article.link + `">`

        if (article.pubDate) {
            html += `<span class="article-date">` + article.pubDate + `</span>`
            html += `<br>`
        }

        if (article.title) {
            html += `<span class="article-title">` + article.title + `</span>`
            html += `<br>`
        }

        if (article.description) {
            html += `<span class="article-description">` + article.description + `</span>`
        }

        html += `</div>
                 <hr>
            </li>`

        $("#articles-list").append(html)
    }
}

function spawnShimmerLoadingItems() {
    for (let i = 0; i < 10; i++) {
        $(".loading").append(`
            <div class="ph-item">
                <div class="ph-col-12">
                    <div class="ph-row">
                        <div class="ph-col-6"></div>
                        <div class="ph-col-8 big"></div>
                        <div class="ph-col-8"></div>
                    </div>
                </div>
            </div>
        `)
    }
}

function setLoadingState(loading) {
    if (loading) {
        $("#articles-list").fadeOut()
        spawnShimmerLoadingItems()
        $(".loading").fadeIn()
    } else {
        $("#articles-list").fadeIn()
        $(".loading").html("")
        $(".loading").fadeOut()
    }
}

/** Navigation Drawer */

function buildNavDrawerMenuHtml() {
    let html = ""
    for (let i = 0; i < MENU_ITEMS.length; i++) {
        var menuItem = MENU_ITEMS[i]
        if (menuItem.unselectable) {
            html += '<li class="menu-item unselectable">' + menuItem.name + '</li>'
            continue
        }

        html += '<li class="menu-item" data-url="' + menuItem.url + '">' + menuItem.name + '</li>'
    }

    return html
}

$("#menu-list").html(buildNavDrawerMenuHtml())

/** Clicks */

$("body").on("click", ".hamburger", function () {
    $(".expanded-menu").css("transform", "translate(0, 0)")
})

$("body").on("click", ".add-to-homescreen", function () {
    alert(PWA_ALERT_MSG)
})

$("body").on("click", ".menu-item", function () {
    let url = $(this).data("url")
    if (url) {
        $("body").css("overflow", "scroll")
        $(".expanded-menu").css("transform", "translate(0, 100vh)")
        dispatchArticlesByCategory(url)
    }
})

$("body").on("click", ".article", function () {
    let articleUrl = $(this).data("article-url")
    let title = $(this).find(".article-title").html()
    if (articleUrl) {
        showExpandedArticle(title, articleUrl)
    }
})

$("body").on("click", ".expanded-article-toolbar-back", function () {
    $("body").css("overflow", "scroll")
    $(".expanded-article").css("transform", "translate(0, 100vh)")
})

$("body").on("click", ".expanded-menu-toolbar-close", function () {
    $("body").css("overflow", "scroll")
    $(".expanded-menu").css("transform", "translate(0, 100vh)")
})

/** Expanded article */

function showExpandedArticle(title, articleUrl) {
    $(".expanded-article-title").html(title)
    $(".expanded-article-text").html("Loading...")

    $(".expanded-article").css("transform", "translate(0, 0)")

    $("body").css("overflow", "hidden")

    $.getJSON("https://api.allorigins.win/get?url=" + articleUrl,
        function (res) {
            if (res) {
                let article = parseArticleContent(res)
                $(".expanded-article-text").html(article.text)
            } else {
                if (confirm("Error while making network request, try again?")) {
                    showExpandedArticle(title, articleUrl)
                } else {
                    $("body").css("overflow", "scroll")
                    $(".expanded-article").css("transform", "translate(0, 100vh)")
                }
            }
        }
    )
}

/** Init */

function init() {
    let isMobileUser = function () {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod|android/.test(userAgent)
    }

    let isInStandaloneMode = function () {
        return ("standalone" in window.navigator) && (window.navigator.standalone)
    }

    if (isMobileUser() && !isInStandaloneMode()) {
        $(".add-to-homescreen").css("display", "block")
    } else {
        //$(".add-to-homescreen").css("display", "none")
    }

    dispatchArticlesByCategory(FIRST_MENU_ITEM.url)
}

init()