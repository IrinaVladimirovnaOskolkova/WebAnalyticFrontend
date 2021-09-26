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
let nameCorrect = false;
let loginCorrect = false;
let passwordCorrect = false;

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
