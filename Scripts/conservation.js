document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  if (!localStorage.getItem("conservationData")) {
    fetch("conservation.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("conservationData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("conservationData"));
    loadDataIntoPage(storedData);
  }

  const editConservationForm = document.getElementById(
    "edit-conservation-form"
  );
  
  editConservationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");

    const titleInput = document.getElementById("edit-conservation-title").value;
    const contentTextarea = document.getElementById(
      "edit-conservation-content"
    ).value;

    let conservationData = JSON.parse(localStorage.getItem("conservationData"));

    conservationData.title = titleInput;
    conservationData.description = contentTextarea.split("\n\n");

    localStorage.setItem("conservationData", JSON.stringify(conservationData));

    loadDataIntoPage(conservationData);
    document.getElementById("edit-conservation-popup").style.display = "none";
  });
});

function loadDataIntoPage(data) {
  const container = document.querySelector(".location-web-3");

  Array.from(container.children).forEach((child) => {
    if (!child.classList.contains("map-em")) {
      child.remove();
    }
  });

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";
  titleContainer.style.display = "flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";

  const titleElement = document.createElement("h1");
  titleElement.setAttribute("id", "intro-h1");
  titleElement.textContent = data.title;
  titleContainer.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.addEventListener("click", function () {
      showEditPopup();
    });
    titleContainer.appendChild(editButton);
  }

  container.insertBefore(titleContainer, container.firstChild);

  data.description.forEach((paragraphText) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = paragraphText;
    container.appendChild(paragraphElement);
  });
}

function showEditPopup() {
  const popup = document.getElementById("edit-conservation-popup");
  const titleInput = document.getElementById("edit-conservation-title");
  const contentTextarea = document.getElementById("edit-conservation-content");

  const currentTitle = document.querySelector(
    ".location-web-3 #intro-h1"
  ).textContent;
  const paragraphs = document.querySelectorAll(".location-web-3 p");
  const currentContent = Array.from(paragraphs)
    .map((p) => p.textContent)
    .join("\n\n");

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.onclick = function () {
    popup.style.display = "none";
  };
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
