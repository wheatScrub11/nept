import { signOut } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js"
import Cookies from './node_modules/js-cookie/dist/js.cookie.mjs'
import {
    saveFile,
    getFiles, 
    auth 
} from "./firebase.js"

const filesContainer = document.querySelector(".files-container")
const fileInput = document.getElementById("file")
const onlineUserText = document.querySelector(".onlineUser")
const mainUl = document.querySelector(".main-ul")



let userOnline = Cookies.get("userOn")
console.log(userOnline)

//couldnt import somehow
const logOut = async () => {
    await signOut(auth)

    Cookies.remove("userOn")
    userOnline = undefined
    window.location.replace("../index.html")
}


if(userOnline != undefined){
    onlineUserText.textContent = `Conectado: ${userOnline}`
    const logOutBtn = document.createElement("button")
    logOutBtn.textContent = "Log Out"
    logOutBtn.addEventListener("click", logOut)
    logOutBtn.classList.add("log-out-btn")
    mainUl.appendChild(logOutBtn)
    mainUl.children[0].classList.add("invisible")
}



window.addEventListener("DOMContentLoaded", async () =>{
    const querySnapshot = await getFiles()

    let html = ""
    
    querySnapshot.forEach(doc => {
        
        let toNormalData = doc.data()
        //console.log(toNormalData.file)
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

//Save the img on a var to push into firestore
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
    

    saveFile(userOnline, fileTitle.value, fileDesc.value, src)

    form.reset()
})
