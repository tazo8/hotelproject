const singIn = document.querySelector("#singIn");
const singUp = document.querySelector("#singUp");
const register = document.querySelector("#register");
const login = document.querySelector("#login");
const changePasswordVisibility = document.querySelector(
  "#changePasswordVisibility"
);
const topSide = document.querySelector(".registertop");

const name = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const actionbutton = document.querySelector("#actionbutton");
const actionToggleArray = document.querySelectorAll("#actionToggle");

const showPasswordIcon = '<i class="fa-solid fa-eye"></i>';
const hidePasswordIcon = '<i class="fa-solid fa-eye-slash"></i>';
let isShowPassword = true;

const url = location.href;
const action = url.split("/").pop().split("?").pop() || "register";

if (action === "register") {
  toggle("register");
} else {
  toggle("login");
}

changePasswordVisibility.addEventListener("click", () => {
  if (isShowPassword) {
    changePasswordVisibility.innerHTML = hidePasswordIcon;
    password.type = "text";
  } else {
    changePasswordVisibility.innerHTML = showPasswordIcon;
    password.type = "password";
  }
  isShowPassword = !isShowPassword;
});

register.addEventListener("click", () => {
  toggle("register");
});

login.addEventListener("click", () => {
  toggle("login");
});

actionbutton.addEventListener("click", () => {
  const isAction = action === "register";
  if (isAction) {
    actionRegister();
  } else {
    actionLogin();
  }
});

function toggle(action) {
  const isAction = action === "register";

  if (isAction) {
    singUp.classList.add("active");
    singIn.classList.remove("active");
  } else {
    singUp.classList.remove("active");
    singIn.classList.add("active");
  }

  actionToggleArray.forEach((element) => {
    element.style.display = isAction ? "block" : "none";
  });

  actionbutton.classList.remove(isAction ? "btn-secondary" : "btn-btn-primary");
  actionbutton.classList.add(isAction ? "btn-btn-primary" : "btn-secondary");
  actionbutton.textContent = isAction ? "Sing Up" : "Sing In";
  register.style.color = isAction ? "black" : "#fff";
  login.style.color = isAction ? "#fff" : "black";
}

function actionRegister() {
  let userName = name.value;
  let userLastName = lastName.value;
  let userEmail = email.value;
  let userPassword = password.value;

  const usersArray = getRefFromFirebase("User");

  setTimeout(() => {
    let isUserUnique = usersArray.some((user) => user.data.email === userEmail);
    if (isUserUnique) {
      displayToast("Failed, Email isn't unique", "error", "red");
      return;
    }

    if (
      userName === "" ||
      userLastName === "" ||
      userEmail === "" ||
      userPassword === ""
    ) {
      displayToast("Failed, Fill every input", "error", "red");
    } else {
      displayToast("Successfully registered", "success", "green");
      addElementInFirebase("User", {
        name: userName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
      });
      actionbutton.disabled = true;

      const usersArrayUpdated = getRefFromFirebase("User");
      setTimeout(() => {
        const userIndex = usersArrayUpdated.findIndex(
          (user) =>
            user.data.email === userEmail && user.data.password === userPassword
        );
        if (userIndex === -1) {
          displayToast("Failed,auth please sing in", "error", "red");
        } else {
          const id = usersArrayUpdated[userIndex].id;
          sessionStorage.setItem("user_id", id);
          location.href = "index.html";
        }
      }, 500);
    }
  }, 500);
}

function actionLogin() {
  let userEmail = email.value;
  let userPassword = password.value;

  const usersArrayUpdated = getRefFromFirebase("User");

  setTimeout(() => {
    const userIndex = usersArrayUpdated.findIndex(
      (user) =>
        user.data.email === userEmail && user.data.password === userPassword
    );
    if (userIndex === -1) {
      displayToast("Failed, Wrong data", "error", "red");
    } else {
      displayToast("Successfully authorized", "success", "green");
      const id = usersArrayUpdated[userIndex].id;
      sessionStorage.setItem("user_id", id);
      location.href = "index.html";
    }
  }, 1000);
}
