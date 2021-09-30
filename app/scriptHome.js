// *********************** ГЛАВНАЯ СТРАНИЦА *************************
// Заполнение таблицы
window.onload = () => {
    loadWebSiteList(); 
}
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
      tableBody.innerHTML += '<tr><td width="90%"><a href="/" id="' + item[i] + '">' 
      + i + '</td><td width="10%" class="text-center admin">\
      <a data-bs-toggle="modal" data-bs-target="#ModalHome"><i class="fa fa-user-o" aria-hidden="true">\
      </i></a></td>'
    }
  }
}
// Заполнение и редактировани модального окна
