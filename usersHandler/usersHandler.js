import { auth } from "../firebase.js"
import Cookies from '../node_modules/js-cookie/dist/js.cookie.mjs'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js"

const registerEmailInput = document.querySelector(".registerEmail")
const registerPasswordInput = document.querySelector(".registerPassword")
const loginEmailInput = document.querySelector(".loginEmail")
const loginPasswordInput = document.querySelector(".loginPassword")
const registerBtn = document.querySelector(".register-btn")
const logInBtn = document.querySelector(".log-in-btn")
const currentUserText = document.querySelector(".current-user")
const susy = document.querySelector(".susy")

let registerEmail = ""; // because of not adding the "" firebase was returning an error meaning the data that was being send wasnt correct
let registerPassword = "";
let loginEmail = "";
let loginPassword = "";
let userOn = "";

registerEmailInput.value = ""
registerPasswordInput.value = ""


onAuthStateChanged(auth, (currentUser) =>{
    userOn = currentUser.email
    currentUserText.textContent = currentUser.email
    if(currentUser.email != ""){
        Cookies.set("userOn", userOn, { secure: true, sameSite: "none"})
        window.location.replace("../index.html")
    }
})


registerEmailInput.addEventListener("change", e =>{
    registerEmail = e.target.value
})
registerPasswordInput.addEventListener("change", e =>{
    registerPassword = e.target.value
})
loginEmailInput.addEventListener("change", e =>{
    loginEmail = e.target.value
})
loginPasswordInput.addEventListener("change", e =>{
    loginPassword = e.target.value
})


const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        //console.log(user)
        registerEmailInput.value = ""
        registerPasswordInput.value = ""
        

    } catch (error) {
        console.log(error)
    }
}
const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
            );
            //console.log(user)
        registerEmailInput.value = ""
        registerPasswordInput.value = ""
        

    } catch (error) {
        console.log(error)
    }
}

registerBtn.addEventListener("click", register)
logInBtn.addEventListener("click", login)