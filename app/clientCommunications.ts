const serverURL = "http://192.168.1.99:3002"
//const serverURL = "http://alextai.ddns.net:3002"

let emglob: string
let passglob : string
let currentId : string

async function login(em:string, pass:string){
    //let res = (await fetch(serverURL + "/login?" + new URLSearchParams({email : email, password : pass}), )).text()
    let url = serverURL + "/login"
    let res = (await fetch(url, {
        method : 'GET',
        headers : {'Password' : pass, 'Email' : em}
    })).text()
    //let res = (await fetch(serverURL + "/login")).text()
    if ((await res).length != 20)
        return 0
    emglob = em
    passglob = pass
    currentId = await (await fetch(serverURL + "/id", {
        method : 'GET',
        headers : {'Password' : pass, 'Email' : em}
    })).text()
    console.log("successfull login")
    return 1
}

async function getGroups(){
    await new Promise(r => setTimeout(r, 1000));
    let url = serverURL + "/groups"
    //console.log("going to fetch groups")
    let res = await (await fetch(url, {
        method : 'GET',
        headers : {'Password' : passglob, 'Email' : emglob}
    })).text()
    //console.log(typeof res)
    return JSON.parse(res) 
}

async function getMsgs(chatID : string, lowerBound? : string, upperBound? : string){
    //await new Promise(r => setTimeout(r, 500));
    let url = serverURL + "/msgs?" + new URLSearchParams({groupID : chatID, lowerbound : lowerBound? lowerBound : "0", upperbound : upperBound ? upperBound : "0"}) 
    let res = await (await fetch(url, 
            { method : 'GET', headers : {'Password' : passglob, 'Email' : emglob}}
        )).text()
    //console.log(res)
    return JSON.parse(res)
}

async function getUserData(userid : string){
    let url = serverURL + "/user?" + new URLSearchParams({userid : userid})
    let res = await (await fetch(url)).text()
    //console.log(res)
    return JSON.parse(res)
}

function isMe(userid : string){
    return (currentId == userid)
}

async function sendMessage(chatID : string | null | undefined, textContent : string){
    if (!chatID)
        return
    let url = serverURL + "/msgstext"
    console.log(`body is ${new URLSearchParams({chat_id : chatID, text_content : textContent})}`)
    let res = fetch(url, {
        method : 'POST',
        body : new URLSearchParams({chat_id : chatID, text_content : textContent}).toString(),
        headers : {'Password' : passglob, 'Email' : emglob, 'Content-Type': 'application/x-www-form-urlencoded'}
    }) 
    console.log(res)
    console.log(await res)
    return
}


export { login, getGroups, getMsgs, getUserData, isMe, sendMessage }