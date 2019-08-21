/**
 * All the items in the navigation drawer:
 *  {
 *      name: "Technology", => NEEDED, the title of the menu item
 *      url: "https://..."  => NEEDED, the URL to fetch when the menu item is clicked; 
 *                                     the content of that URL will be parsed 
 *                                     by the 'parseArticlesList()' functiom
 *  }
 * 
 * It's possible to create an unselectable item that will 
 * take more space and won't be clickable: this is used mainly 
 * when you want to add one or more categories:
 *  {
 *      unselectable: true, => NEEDED, makes the menu item not clickable
 *      name: "Test"        => NEEDED, the title of the category
 *  }
 */
const MENU_ITEMS = [
    { name: "Homepage", url: "https://www.ansa.it/sito/ansait_rss.xml" },
    { name: "Cronaca", url: "https://www.ansa.it/sito/notizie/cronaca/cronaca_rss.xml" },
    { name: "Politica", url: "https://www.ansa.it/sito/notizie/politica/politica_rss.xml" },
    { name: "Mondo", url: "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml" },
    { name: "Economia", url: "https://www.ansa.it/sito/notizie/economia/economia_rss.xml" },
    { name: "Calcio", url: "https://www.ansa.it/sito/notizie/sport/calcio/calcio_rss.xml" },
    { name: "Sport", url: "https://www.ansa.it/sito/notizie/sport/sport_rss.xml" },
    { name: "Cinema", url: "https://www.ansa.it/sito/notizie/cultura/cinema/cinema_rss.xml" },
    { name: "Cultura", url: "https://www.ansa.it/sito/notizie/cultura/cultura_rss.xml" },
    { name: "Tecnologia", url: "https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml" },
    { name: "Ultima Ora", url: "https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml" },
    { name: "English News", url: "https://www.ansa.it/english/english_rss.xml" },
    { name: "Foto", url: "https://www.ansa.it/sito/photogallery/foto_rss.xml" },
    { name: "Video", url: "https://www.ansa.it/sito/videogallery/video_rss.xml" },
    { name: "Ambiente & Energia", url: "https://www.ansa.it/canale_ambiente/notizie/ambiente_rss.xml" },
    { name: "Motori", url: "https://www.ansa.it/canale_motori/notizie/motori_rss.xml" },
    { name: "Terra & Gusto", url: "https://www.ansa.it/canale_terraegusto/notizie/terraegusto_rss.xml" },
    { name: "Salute & Benessere", url: "https://www.ansa.it/canale_saluteebenessere/notizie/saluteebenessere_rss.xml" },
    { name: "Scienza & Tecnica", url: "https://www.ansa.it/canale_scienza_tecnica/notizie/scienzaetecnica_rss.xml" },
    { name: "Canale Nuova Europa (IT)", url: "https://www.ansa.it/nuova_europa/it/rss.xml" },
    { name: "Canale Nuova Europa (EN)", url: "https://www.ansa.it/nuova_europa/en/rss.xml" },
    { name: "ANSA Viaggiart", url: "https://www.ansa.it/canale_viaggiart/it/notizie/viaggiart_rss.xml" },
    { name: "Lifestyle", url: "https://www.ansa.it/canale_lifestyle/notizie/lifestyle_rss.xml" },
    { unselectable: true, name: "Regioni italiane" },
    { name: "Abruzzo", url: "https://www.ansa.it/abruzzo/notizie/abruzzo_rss.xml" },
    { name: "Basilicata", url: "https://www.ansa.it/basilicata/notizie/basilicata_rss.xml" },
    { name: "Calabria", url: "https://www.ansa.it/calabria/notizie/calabria_rss.xml" },
    { name: "Campania", url: "https://www.ansa.it/campania/notizie/campania_rss.xml" },
    { name: "Emilia Romagna", url: "https://www.ansa.it/emiliaromagna/notizie/emiliaromagna_rss.xml" },
    { name: "Friuli Venezia Giulia", url: "https://www.ansa.it/friuliveneziagiulia/notizie/friuliveneziagiulia_rss.xml" },
    { name: "Lazio", url: "https://www.ansa.it/lazio/notizie/lazio_rss.xml" },
    { name: "Liguria", url: "https://www.ansa.it/liguria/notizie/liguria_rss.xml" },
    { name: "Lombardia", url: "https://www.ansa.it/lombardia/notizie/lombardia_rss.xml" },
    { name: "Marche", url: "https://www.ansa.it/marche/notizie/marche_rss.xml" },
    { name: "Molise", url: "https://www.ansa.it/molise/notizie/molise_rss.xml" },
    { name: "Piemonte", url: "https://www.ansa.it/piemonte/notizie/piemonte_rss.xml" },
    { name: "Puglia", url: "https://www.ansa.it/puglia/notizie/puglia_rss.xml" },
    { name: "Sardegna", url: "https://www.ansa.it/sardegna/notizie/sardegna_rss.xml" },
    { name: "Sicilia", url: "https://www.ansa.it/sicilia/notizie/sicilia_rss.xml" },
    { name: "Toscana", url: "https://www.ansa.it/toscana/notizie/toscana_rss.xml" },
    { name: "Trentino Alto Adige - Suedtirol", url: "https://www.ansa.it/trentino/notizie/trentino_rss.xml" },
    { name: "Umbria", url: "https://www.ansa.it/umbria/notizie/umbria_rss.xml" },
    { name: "Valle D'Aosta", url: "https://www.ansa.it/valledaosta/notizie/valledaosta_rss.xml" },
    { name: "Veneto", url: "https://www.ansa.it/veneto/notizie/veneto_rss.xml" }
]

/**
 * The URL that will be loaded on app open
 */
const FIRST_MENU_ITEM = MENU_ITEMS[0]

/**
 * After fetching the URL of the menu item, 
 * parse the JSON response.
 * 
 * Must return an array of 'article' objects:
 *  {
 *      link: "https://...",          => NEEDED, the URL to the complete article
 *      title: "Title",               => NEEDED, the title of the article
 *      pubDate: "18/08/2019",        => Optional, when the article has been published
 *      description: "This is a test" => Optional, the description of the article
 *  }
 */
function parseArticlesList(responseJsonObj) {
    let x2js = new X2JS()
    let jsonObj = x2js.xml_str2json(responseJsonObj.contents)
    return jsonObj.rss.channel.item
}

/**
 * Function needed to parse the content of the article
 * 
 * Must return an 'article' object:
 *  {
 *      title: "Title", => NEEDED, the title of the article
 *      text: "Text"    => NEEDED, the text of the article
 *  }
 */
function parseArticleContent(responseJsonObj) {
    let html = responseJsonObj.contents
    let articleTitle = $(html).find(".news-title").html()
        .replace(/^\s+|\s+$/gm, " ")
        .replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "")
        .trim()
    let articleText = $(html).find(".news-txt").html()
        .replace(/^\s+|\s+$/gm, " ")
        .replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "")
        .trim()

    return {
        title: articleTitle,
        text: articleText
    }
}

