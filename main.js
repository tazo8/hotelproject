const urlMain = location.href;
const page = urlMain.split("/").pop().split(".")[0];

if (sessionStorage.getItem("user_id")) {
  const id = sessionStorage.getItem("user_id");
  if (id.length === 36) {
    const user = getRefFromFirebase("User", id);
    user
      .then((user) => {
        sessionStorage.setItem(
          "user_data",
          JSON.stringify({
            name: user.data.name,
            lastName: user.data.lastName,
            email: user.data.email,
          })
        );
        document.querySelectorAll(".auth").forEach((element) => {
          element.remove();
        });
        document.querySelectorAll(".afterAuth").forEach((element) => {
          element.style.display = "block";
        });
      })
      .catch(() => {
        logOut();
      });

    if (page === "auth") {
      location.href = "index.html";
    }
  } else {
    logOut();
  }
}
