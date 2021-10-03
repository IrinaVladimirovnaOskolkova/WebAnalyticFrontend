// *********************** СТРАНИЦА УПРАВЛЕНИЯ ПОЛЬЗОВТЕЛЯМИ *************************
// Заполнение таблицы

window.onload = () => {
    loadUserList();
    validationName();
    validationLogin();
    validationPassword();
}

let userJson = `{
    "userListPermission":
    [{"vasya":55,"access":true},{"petya":75,"access":true},{"nikolas":117,"access":false}]
}`;

function loadUserList(){
    let tableBody = document.getElementById("tableSiteBody");
    tableBody.innerHTML = "";     
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            if(xhr.status === 200){
                let obj = JSON.parse(userJson);
        
                for(let item of obj.userListPermission){

                    let name;
                    let id;
                    for (let key in item){
                    name = key;
                    id = item[name];
                    break;
                    }

                    tableBody.innerHTML += '<tr><td width="90%"><p id="' + id + '" class="mb-0">' 
                    + name + '</p></td><td width="10%" class="text-center admin">\
                    <a href="/DeleteAccount" id="btnUser"><i class="fa fa-trash-o" aria-hidden="true"></i>\
                    </i></a></td>'
                }
            }  
            else{
                tableBody.innerHtml = "Error:" + xhr.status + "!"; 
            }
        }
    }
    xhr.send();
}

// активация кнопки
function turnOnBtnReg() {
    btnReg.classList.remove("disabled");
    btnReg.classList.add("btnReg");
  }
  // деактивация кнопки
  function tunrOffBtnReg() {
    btnReg.classList.remove("btnReg");
    btnReg.classList.add("disabled");
  }
  // Проверка полей
  let inputName = document.getElementById("InputName");
  let inputLogin = document.getElementById("InputLogin");
  let inputPassword = document.getElementById("InputPassword");
  let inputPassConfirm = document.getElementById("InputPassConfirm");
  let message = document.getElementById("message");
  let btnReg = document.getElementById("btnReg");
  let modal = document.getElementById("Modal");
  let btnModalClose = document.getElementById("btnModalClose");
  let serverResponse =document.getElementById("serverResponse");
  let nameCorrect = false;
  let loginCorrect = false;
  let passwordCorrect = false;
  
  
  let temp = `{
    "actionStatus":{
    "message":"Успешная регистрация",
    "status":true
    }
  }`;
  
  function validationName() {
    nameCorrect = false;
    if (inputName.value !== "") nameCorrect = true;
    fullFieldValidation();
  }
  function validationLogin() {
    loginCorrect = false;
    if (inputLogin.value !== "") loginCorrect = true;
    fullFieldValidation();
  }
  
  function validationPassword() {
    passwordCorrect = false;
  
    if (inputPassword.value === "" || inputPassConfirm.value === "") {
      fullFieldValidation();
      message.innerHTML = "";
      return;
    }
  
    if (inputPassword.value === inputPassConfirm.value) {
      message.style.color = "green";
      message.innerHTML = "* пароли совпадают";
      passwordCorrect = true;
    } else {
      message.style.color = "red";
      message.innerHTML = "* пароли не совпадают";
    }
  
    fullFieldValidation();
  }
  function fullFieldValidation() {
    if (nameCorrect == true && loginCorrect == true && passwordCorrect == true)
      turnOnBtnReg();
    else tunrOffBtnReg();
  }

// нажатие на кнопку "зарегистрировать"
btnReg.onclick = () => {

    loadUserList();
    tunrOffBtnReg();
    inputName.value = "";
    inputLogin.value = "";
    inputPassword.value = "";
    inputPassConfirm.value = "";
    message.innerHTML = "";
}