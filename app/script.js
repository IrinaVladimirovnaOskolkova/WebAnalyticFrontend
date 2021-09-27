// *********************** СТРАНИЦА РЕГИСТРАЦИИ НОВОГО ПОЛЬЗОВАТЕЛЯ *************************
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

window.onload = function () {
  validationName();
  validationLogin();
  validationPassword();
};
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
// Нажатие на кнопку "зарегистрироваться"

btnReg.addEventListener("click", function(){
  let name = 'userName=' + encodeURIComponent(inputName.value);
  let login = 'userLogin=' + encodeURIComponent(inputLogin.value);
  let password = 'userPassword=' + encodeURIComponent(inputPassword.value);

  let request = new XMLHttpRequest();
  request.open('POST', 'https://jsonplaceholder.typicode.com/users', true);
  request.addEventListener('readystatechange', function(){
    if(request.readyState == 4) {
      if(request.status == 201){
        let obj = JSON.parse(temp);
        serverResponse.innerHTML = obj.actionStatus.message;

        if(obj.actionStatus.status == true) {
          modal.style.backgroundColor = "#939699";
          btnModalClose.innerHTML = "Авторизоваться";
          btnModalClose.onclick = () => {
            document.location.href = "authorization.html"
          };
          window.onclick = () => {
            btnModalClose.onclick();
            window.onclick = null;
            message.innerHTML = "";
          };

        }
      }
      else {
        serverResponse.innerHTML = 'Error: ' + request.status;
      }
    }
  });

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(name, login, password);
});
