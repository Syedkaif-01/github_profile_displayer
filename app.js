const BASE_URL = "https://api.github.com/users/";





let main = document.querySelector(".main");
let form = document.querySelector("form");
let input = document.querySelector("input");
let cursor = document.querySelector(".cursor");
let flag;





const getuser = async (username) => {
    let response = await fetch(BASE_URL + username);
    let data = await response.json();

    if (data.bio == null || data.bio == undefined) {
        data.bio = "----User doesn't have any Bio----"
    }

    if (data.public_repos == 0) {
        flag = true;
    }
    else {
        flag = false;
    }
    let template = `
    <form action="">
    <input type="text" value="" placeholder="Enter Github user name"></form>



    <div class="container">

    <div class="container-first">
        <img src=${data.avatar_url} alt="some image" class="user-image">
        <h1 class="user-name"><a href=${data.html_url}  target="_blank" >${data.name}</a></h1>
    </div>

    <div class="container-second">
        <p><span>${data.followers}</span>Followers</p>
        <p><span>${data.following}</span>Following</p>
        <p><span>${data.public_repos}</span>Repository</p>
    </div>

    <div class="container-third">
        <h1>Bio</h1>
        <p>${data.bio}</p>
    </div>

    <div class="container-last">
       
    </div>
    </div>`
        ;

    main.innerHTML = template;
    getrepo(username);
}



const getrepo = async (username) => {
    let response = await fetch(BASE_URL + username + "/repos");
    let data = await response.json();
    // console.log(data);
    let container_last = document.querySelector(".container-last");

    if (flag) {
        container_last.innerText = "----User doesn't have any repository----"
    }
    else {
        data.forEach(
            (item) => {
                let a = document.createElement("a");
                a.classList.add("repo-link");
                a.href = item.html_url;
                a.innerText = item.name;
                a.target = "_blank";
                container_last.appendChild(a);
            }
        );
    }




}

const formSubmit = () => {

    let username = input.value;
    if (username != "") {
        getuser(username);
    }

    return false;
}

form.addEventListener("focusout", (evt) => {
    evt.preventDefault();
    formSubmit();
});





main.addEventListener("mousemove",(evt)=>{
   cursor.style.left = evt.x+"px";
   cursor.style.top = evt.y+"px";
});




















