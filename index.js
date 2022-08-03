import { saveFile, getFiles } from "./firebase.js"
const filesContainer = document.querySelector(".files-container")
const fileInput = document.getElementById("file")

window.addEventListener("DOMContentLoaded", async () =>{
    const querySnapshot = await getFiles()

    let html = ""
    
    querySnapshot.forEach(doc => {
        
        let toNormalData = doc.data()
        console.log(toNormalData.file)
        html += `
        <div class="container">
            <h1 class="center">
                ${toNormalData.title}
            </h1>
            <p class="center">
                ${toNormalData.desc}
            </p>
            <img src="${toNormalData.file}" class="imageOptions">
        </div>
        `
    });
    filesContainer.innerHTML = html

})

const form = document.getElementById("myForm")
let src;

fileInput.addEventListener("change", e =>{
    const file = e.target.files[0]

    console.log(e.target.files[0])

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener("load", () =>{
        src = reader.result
    })
    //filesContainer.innerHTML = `<img src=${src}>`
})

form.addEventListener("submit", e =>{
    e.preventDefault()
    
    const fileTitle = form["file-title"]
    const fileDesc = form["file-desc"]
    //const file = form["file"]
    

    saveFile(fileTitle.value, fileDesc.value, src)

    form.reset()
})