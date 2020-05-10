import firebase from "../lib/firebase"
import axios from "axios"
// export function getMessages(){
//         return JSON.parse(localStorage.getItem("messages"));
// }

// export function addMessages(object){
//         let message=getMessages()
//         message.push(object);
//         saveList(message);
// }

// function saveList(messages){
//     localStorage.setItem("messages", JSON.stringify(messages));
// }

// export function getMessages(){
//     return axios.get("https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet")
// }

// export function addMessages(object){
//     return axios.post("https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet",{tweet:object})
// }

const db = firebase.firestore();
export function addMessages(object){
    return db.collection("twitter").add(object)
}

export function getMessages(){
 return db.collection("twitter").get()
}

export function addUserById(id,object){
    return db.collection("users").doc(id).set(object)
}

export function getUsernameById(id){
    return db.collection("users").doc(id).get()
    

}
