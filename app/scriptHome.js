// *********************** ГЛАВНАЯ СТРАНИЦА *************************
window.onload = () => {
    loadWebSiteList();
}
// Заполнение таблицы
let siteJson = `{
    "webSiteList":
    [{"site":96},
    {"autocars.net":78}]
    }`;
  
function loadWebSiteList(){
  let tableBody = document.getElementById("tableSiteBody");
  tableBody.innerHTML = "";
  let obj = JSON.parse(siteJson);
  for(let item of obj.webSiteList){
    for (i in item){
      
      tableBody.innerHTML += '<tr><td width="90%"><a href="/?id=' + item[i] + '">' 
      + i + '</td><td width="10%" class="text-center admin">\
      <a data-bs-toggle="modal" id="btnUser" data-bs-target="#ModalHome"><i class="fa fa-user-o" aria-hidden="true">\
      </i></a></td>'
    }
  }

  loadUserList();
}
// Заполнение и редактирование модального окна
let userJson = `{
  "userListPermission":
  [{"vasya":55,"access":true},{"petya":75,"access":true},{"nikolas":117,"access":false}]
}`;

function loadUserList(){
  let btnUser = document.getElementById("btnUser");

  btnUser.onclick = () => {
  let modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = "";

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhr.onreadystatechange = function() {
  if (xhr.readyState === 4){
    if(xhr.status === 200){
      let obj = JSON.parse(userJson);
      for(let item of obj.userListPermission){

        let name;
        let id;
        let state = item["access"];
        for (let key in item){
          name = key;
          id = item[name];
          break;
        }

        if(state == true) {
          modalBody.innerHTML += `<div class="form-check form-switch">
          <label class="form-check-label"> ${name}  </label>
          <input class="form-check-input" type="checkbox" checked/>
          <input type="hidden" name="id" value="${id}"></div>`;
        }
        else {
          modalBody.innerHTML += `<div class="form-check form-switch">
          <label class="form-check-label"> ${name}  </label>
          <input class="form-check-input" type="checkbox"/>
          <input type="hidden" name="id" value="${id}"></div>`;
        }


      }
    }
    else{
      modalBody.innerHtml = "Error:" + xhr.status + "!"; 
    }
  }  
}
xhr.send();
}
}

// Добавление веб-сайта
function turnOnBtn() {
  btnModal.classList.remove("disabled");
  btnModal.classList.add("btnModal");
}
// деактивация кнопки
function tunrOffBtn() {
  btnModal.classList.remove("btnModal");
  btnModal.classList.add("disabled");
}

let webSiteInput = document.getElementById("InputAddr");
let btnModal = document.getElementById("btnModal");
let serverStatus = document.getElementById("text");
let btnClose = document.getElementById("btnClose");
let siteAddrInput = false;

function validationSiteAddr(){
  siteAddrInput = false;
  if(webSiteInput.value !== "") siteAddrInput = true;
  validationBtn();
}

function validationBtn(){
  if (siteAddrInput == true) turnOnBtn();
  else tunrOffBtn();
}

btnModal.addEventListener("click", function(){
  webSiteInput.value = "";
  let request = new XMLHttpRequest();
  request.open('POST', 'https://jsonplaceholder.typicode.com/users', true);
  request.addEventListener('readystatechange', function(){
    if(request.readyState == 4) {
      if(request.status == 201){
        loadWebSiteList();
        serverStatus.style.color = "green";
        serverStatus.innerHTML = "Успешно добавлен!";
      }
      else {
        serverStatus.innerHTML = 'Error: ' + request.status;
      }
    }
  });

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send();
});

btnClose.addEventListener("click", function(){
  serverStatus.innerHTML = "";
  
});
window.onclick = () => {serverStatus.innerHTML = "";}