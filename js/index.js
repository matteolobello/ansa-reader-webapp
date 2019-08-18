// Used as a workaround for Cross Origin Security Policy
const ALL_ORIGINS_BASE_URL = "https://api.allorigins.win/get?url="

// The message of the dialog that appears 
// when you tap on the 'Add to homescreen' icon 
const PWA_ALERT_MSG = `
    This page can be downloaded and installed like a normal app
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
        $("#articles-list").css("display", "none")
        spawnShimmerLoadingItems()
        $(".loading").css("display", "block")
    } else {
        $("#articles-list").css("display", "block")
        $(".loading").html("")
        $(".loading").css("display", "none")
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

let slideout = new Slideout({
    panel: document.getElementById("panel"),
    menu: document.getElementById("menu"),
    padding: 256,
    tolerance: 70,
    touch: false
});

$(".toggle-button").click(() => {
    slideout.toggle();
    if (slideout.isOpen()) {
        $("#panel").addClass("disable-scroll");
        $(".toggle-button").addClass("is-active")
    } else {
        $("#panel").removeClass("disable-scroll");
        $(".toggle-button").removeClass("is-active")
    }
})

slideout.on("translate", () => {
    if (!slideout.isOpen()) {
        $("#panel").addClass("disable-scroll");
        $(".toggle-button").addClass("is-active")
    } else {
        $("#panel").removeClass("disable-scroll");
        $(".toggle-button").removeClass("is-active")
    }
});

slideout.on("close", () => {
    if (slideout.isOpen()) {
        $("#panel").addClass("disable-scroll");
        $(".toggle-button").addClass("is-active")
    } else {
        $("#panel").removeClass("disable-scroll");
        $(".toggle-button").removeClass("is-active")
    }
});

/** Clicks */

$("body").on("click", ".add-to-homescreen", function () {
    alert(PWA_ALERT_MSG)
})

$("body").on("click", ".menu-item", function () {
    let url = $(this).data("url")
    if (url) {
        slideout.close()
        dispatchArticlesByCategory(url)
    }
})

$("body").on("click", ".article", function () {
    let articleUrl = $(this).data("article-url")
    let title = $(this).find(".article-title").html()
    if (articleUrl) {
        location.href = "article.html?url=" + articleUrl + "&title=" + title
    }
})

/** Init */

function init() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/js/service-worker.js").then(function (registration) {
            console.log("Service worker installed correctly, scope:", registration.scope)
        }).catch(function (error) {
            console.log("Error installing Service Worker:", error)
        })
    }

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
        $(".add-to-homescreen").css("display", "none")
    }

    dispatchArticlesByCategory(FIRST_MENU_ITEM.url)
}

init()