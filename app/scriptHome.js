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
// Заполнение и редактировани модального окна
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
