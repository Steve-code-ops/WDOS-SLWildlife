document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  if (!localStorage.getItem("wilpatuwaData")) {
    fetch("wilpatuwa.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("wilpatuwaData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("wilpatuwaData"));
    loadDataIntoPage(storedData);
  }
});

function loadDataIntoPage(data) {
  loadAbout(data.about);
  loadHistory(data.history);
}

function loadAbout(about) {
  const container = document.getElementById("about-section");
  container.innerHTML = "";

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const titleElement = document.createElement("h2");
  titleElement.innerHTML = about.title;

  titleContainer.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.onclick = () => showAboutEditPopup();
    titleContainer.appendChild(editButton);
  }

  container.appendChild(titleContainer);

  const contentParagraph = document.createElement("p");
  contentParagraph.textContent = about.description;
  container.appendChild(contentParagraph);
}

function showAboutEditPopup() {
  const popup = document.getElementById("edit-about-popup");
  const titleInput = document.getElementById("edit-about-title");
  const contentTextarea = document.getElementById("edit-about-content");

  const currentTitle = document.querySelector("#about-section h2").textContent;
  const currentContent = document.querySelector("#about-section p").textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  document
    .getElementById("edit-about-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      saveAboutChanges();
    });
}

function saveAboutChanges() {
  const titleInput = document.getElementById("edit-about-title").value;
  const contentTextarea = document.getElementById("edit-about-content").value;

  const about = {
    title: titleInput,
    description: contentTextarea,
  };

  const storedData = JSON.parse(localStorage.getItem("wilpatuwaData"));
  storedData.about = about;

  localStorage.setItem("wilpatuwaData", JSON.stringify(storedData));
  loadAbout(about);

  document.getElementById("edit-about-popup").style.display = "none";
}

function loadHistory(history) {
  const container = document.getElementById("history-section");
  container.innerHTML = "";

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const titleElement = document.createElement("h2");
  titleElement.innerHTML = history.title;

  titleContainer.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.onclick = () => showHistoryEditPopup();
    titleContainer.appendChild(editButton);
  }

  container.appendChild(titleContainer);

  const contentParagraph = document.createElement("p");
  contentParagraph.textContent = history.description;
  container.appendChild(contentParagraph);
}

function showHistoryEditPopup() {
  const popup = document.getElementById("edit-history-popup");
  const titleInput = document.getElementById("edit-history-title");
  const contentTextarea = document.getElementById("edit-history-content");

  const currentTitle = document.querySelector(
    "#history-section h2"
  ).textContent;
  const currentContent =
    document.querySelector("#history-section p").textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  document
    .getElementById("edit-history-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      saveHistoryChanges();
    });
}

function saveHistoryChanges() {
  const titleInput = document.getElementById("edit-history-title").value;
  const contentTextarea = document.getElementById("edit-history-content").value;

  const history = {
    title: titleInput,
    description: contentTextarea,
  };

  const storedData = JSON.parse(localStorage.getItem("wilpatuwaData"));
  storedData.history = history;

  localStorage.setItem("wilpatuwaData", JSON.stringify(storedData));
  loadHistory(history);

  document.getElementById("edit-history-popup").style.display = "none";
}

function loadNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navLinks = document.querySelector(".nav-links");

  if (user) {
    const dashboardLink = `<li><a href="dashboard.html">Dashboard</a></li>`;
    const logout = `<li><a href="#" id="logout-link">Logout</a></li>`;

    navLinks.innerHTML += dashboardLink + logout;

    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("user");
        window.location.href = "index.html";
      });
    }
  } else {
    navLinks.innerHTML +=
      "<button onclick=\"location.href='login.html';\">Login</button>";
  }
}

const newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("subscriber-name").value;
  const email = document.getElementById("subscriber-email").value;
  const newSubscriber = { name, email };

  const subscriptions =
    JSON.parse(localStorage.getItem("newsletterSubscriptions")) || [];

  subscriptions.push(newSubscriber);
  localStorage.setItem(
    "newsletterSubscriptions",
    JSON.stringify(subscriptions)
  );

  alert("Thank you for subscribing to our newsletter!");

  document.getElementById("subscriber-name").value = "";
  document.getElementById("subscriber-email").value = "";
});
