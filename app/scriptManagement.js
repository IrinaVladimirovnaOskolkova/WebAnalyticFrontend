// *********************** Страница управления учетной записью *************************
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
// Сверка паролей
let inputName = document.getElementById("InputName");
let inputPassword = document.getElementById("InputPassword");
let inputPassConfirm = document.getElementById("InputPassConfirm");
let message = document.getElementById("message");
let btnReg = document.getElementById("btnReg");
let modal = document.getElementById("Modal");
let btnModalClose = document.getElementById("btnModalClose");
let serverResponse =document.getElementById("serverResponse");
let nameCorrect = false;
let passwordCorrect = false;

window.onload = function () {
  validationName();
  validationPassword();
};
function validationName() {
  nameCorrect = false;
  if (inputName.value !== "") nameCorrect = true;
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
  if (nameCorrect == true && passwordCorrect == true)
    turnOnBtnReg();
  else tunrOffBtnReg();
}

// Нажатие на кнопку "изменить данные"

btnReg.addEventListener("click", function(){
    let name = 'userName=' + encodeURIComponent(inputName.value);
    let password = 'userNewPassword=' + encodeURIComponent(inputPassword.value);
  
    let request = new XMLHttpRequest();
    request.open('POST', 'https://jsonplaceholder.typicode.com/users', true);
    request.addEventListener('readystatechange', function(){
      if(request.readyState == 4) {
        if(request.status == 201){
          serverResponse.innerHTML = request.status;
          btnModalClose.onclick = () => {
            message.innerHTML = "";
            inputPassword.value = "";
            inputPassConfirm.value = "";
            tunrOffBtnReg();
          };
            window.onclick =  () => {
              btnModalClose.onclick();
            };
        }
        else {
          serverResponse.innerHTML = 'Error: ' + request.status;
        }
      }
    });
  
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(name, password);
  });

// Удаление учетной записи
let btnYesDel = document.getElementById("btnYesDel");
btnYesDel.onclick = () => {document.location.href = "registrationPage.html"}