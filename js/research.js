
async function loadData() {
    const div_research = document.getElementById("research-container");
    console.log(`div_research:${div_research}`)

    try{
        const response = await fetch('research-paper-template.html');
        if (!response.ok){
            throw new Error("Network not ready")
        } 
        const htmlstring = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlstring,'text/html')

        const template = doc.getElementById("paper-template")
        if (!template)
            return
        
        const response_paper = await fetch('paperlist.json')
        if(!response_paper.ok){
            return new Error("Cannot read json");
        }

        response_json = await response_paper.json()
        response_json.forEach(paper => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".paper-title").textContent = paper.title 
            clone.querySelector(".paper-authors").textContent = paper.authors 
            clone.querySelector(".paper-venue").innerHTML = `${paper.venue} <b>(${paper.conference})</b>` 
            
            if (paper.pdf) {
                clone.querySelector(".paper-pdf").href = paper.pdf
                clone.querySelector(".paper-pdf").innerHTML = "PDF"
            }

            if (paper.doi) {
                clone.querySelector(".paper-doi").innerHTML = "DOI"
                clone.querySelector(".paper-doi").href = paper.doi
            }

            if (paper.video) {
                clone.querySelector(".paper-video").innerHTML = "VIDEO"
                clone.querySelector(".paper-video").href = paper.video
            }


            clone.querySelector(".thumbnail").src = paper.thumbnailurl
            console.log(`Researchjs:${paper.title}`)
            // const div = document.createElement("div")
            // div.innerHTML = `<h1>${paper.title}</h1>`;
            div_research.appendChild(clone)
        });

    } catch(error) {
        console.error("There is a problem with the fetch reponse")
    }
}

loadData()




