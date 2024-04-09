document.addEventListener("DOMContentLoaded", function () {
  fetch("users.json")
    .then((response) => {
      return response.json();
    })
    .then((usersData) => {
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = usersData.users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "dashboard.html";
        } else {
          alert("Invalid username or password.");
        }
      });
    })
    .catch((error) => {
      console.error("Could not load user data:", error);
    });
});
