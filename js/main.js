const navbarPath = window.location.pathname.includes("/html")
    ? "../partials/navbar-sub.html"
    : "partials/navbar.html"
console.log(`Navpath${navbarPath}`)

fetch(navbarPath)
    .then(response => {
        if(!response.ok) {
            throw new Error("Nav File Not found")
        }
        return response.text()
    })
    .then(html => {
        document.getElementById("navbar").innerHTML = html
    })