import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
// @ts-ignore
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register({
    onUpdate: (registration: any) => {
        console.log("New version available!")

        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" })
        }
        window.location.reload()
    },
})
