const isDarkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches
if (isDarkModeEnabled) {
    $("#theme-color").attr("content", "#121212")
    $("#msapplication-navbutton-color").attr("content", "#121212")
} else {
    $("#theme-color").attr("content", "#FFFFFF")
    $("#msapplication-navbutton-color").attr("content", "#FFFFFF")
}