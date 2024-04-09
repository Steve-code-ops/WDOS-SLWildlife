document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  if (!localStorage.getItem("wildlifeData")) {
    fetch("wildlife.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("wildlifeData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("wildlifeData"));
    loadDataIntoPage(storedData);
  }

  const editLocation1Form = document.getElementById("edit-location1-form");
  editLocation1Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveLocation1Changes();
  });

  const editLocation2Form = document.getElementById("edit-location2-form");
  editLocation2Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveLocation2Changes();
  });

  const editLocation3Form = document.getElementById("edit-location3-form");
  editLocation3Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveLocation3Changes();
  });
});

function loadDataIntoPage(data) {
  loadFirstLocation(data.locations[0]);
  loadSecondLocation(data.locations[1]);
  loadThirdLocation(data.locations[2]);
}

function loadFirstLocation(location) {
  const container = document.getElementById("location1");

  Array.from(container.children).forEach((child) => {
    if (!child.classList.contains("map") && child.tagName !== "IMG") {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.classList.add("intro2");
  titleElement.textContent = location.name;

  const titleDiv = document.createElement("div");
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";
  titleContainer.style.display = "inline-flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "location1");
    editButton.addEventListener("click", function () {
      showLocation1EditPopup("location1");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  location.description.forEach((paragraphText) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = paragraphText;
    container.insertBefore(paragraphElement, container.querySelector(".map"));
  });
}
function showLocation1EditPopup(section) {
  const popup = document.getElementById("edit-location1-popup");
  const titleInput = document.getElementById("edit-location1-title");
  const contentTextarea = document.getElementById("edit-location1-content");

  const container = document.getElementById(section);
  const currentTitle = container.querySelector("h1").textContent;
  const paragraphs = Array.from(container.querySelectorAll("p:not(.map)")).map(
    (p) => p.textContent
  );
  const currentContent = paragraphs.join("\n\n");

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.onclick = function () {
    popup.style.display = "none";
  };
}

function saveLocation1Changes() {
  const titleInput = document.getElementById("edit-location1-title").value;
  const contentTextarea = document.getElementById(
    "edit-location1-content"
  ).value;

  let wildlifeData = JSON.parse(localStorage.getItem("wildlifeData"));

  wildlifeData.locations[0].name = titleInput;
  wildlifeData.locations[0].description = contentTextarea.split("\n\n");

  localStorage.setItem("wildlifeData", JSON.stringify(wildlifeData));

  loadFirstLocation(wildlifeData.locations[0]);
  document.getElementById("edit-location1-popup").style.display = "none";
}

function loadSecondLocation(location) {
  const container = document.getElementById("location2");

  Array.from(container.children).forEach((child) => {
    if (!child.classList.contains("map") && child.tagName !== "IMG") {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.classList.add("intro2");
  titleElement.textContent = location.name;

  const titleDiv = document.createElement("div");
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";
  titleContainer.style.display = "inline-flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "location2");
    editButton.addEventListener("click", function () {
      showLocation2EditPopup("location2");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  location.description.forEach((paragraphText) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = paragraphText;
    container.insertBefore(paragraphElement, container.querySelector(".map"));
  });
}

function showLocation2EditPopup(section) {
  const popup = document.getElementById("edit-location2-popup");
  const titleInput = document.getElementById("edit-location2-title");
  const contentTextarea = document.getElementById("edit-location2-content");

  const container = document.getElementById(section);
  const currentTitle = container.querySelector("h1").textContent;
  const paragraphs = Array.from(container.querySelectorAll("p:not(.map)")).map(
    (p) => p.textContent
  );

  const currentContent = paragraphs.join("\n\n");

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.onclick = function () {
    popup.style.display = "none";
  };
}

function saveLocation2Changes() {
  const titleInput = document.getElementById("edit-location2-title").value;
  const contentTextarea = document.getElementById(
    "edit-location2-content"
  ).value;

  let wildlifeData = JSON.parse(localStorage.getItem("wildlifeData"));

  wildlifeData.locations[1].name = titleInput;
  wildlifeData.locations[1].description = contentTextarea.split("\n\n");

  localStorage.setItem("wildlifeData", JSON.stringify(wildlifeData));

  loadSecondLocation(wildlifeData.locations[1]);
  document.getElementById("edit-location2-popup").style.display = "none";
}

function loadThirdLocation(location) {
  const container = document.getElementById("location3");

  Array.from(container.children).forEach((child) => {
    if (!child.classList.contains("map") && child.tagName !== "IMG") {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.classList.add("intro2");
  titleElement.textContent = location.name;

  const titleDiv = document.createElement("div");
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";
  titleContainer.style.display = "inline-flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "location3");
    editButton.addEventListener("click", function () {
      showLocation3EditPopup("location3");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  location.description.forEach((paragraphText) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = paragraphText;
    container.insertBefore(paragraphElement, container.querySelector(".map"));
  });
}

function showLocation3EditPopup(section) {
  const popup = document.getElementById("edit-location3-popup");
  const titleInput = document.getElementById("edit-location3-title");
  const contentTextarea = document.getElementById("edit-location3-content");

  const container = document.getElementById(section);
  const currentTitle = container.querySelector("h1").textContent;
  const paragraphs = Array.from(container.querySelectorAll("p:not(.map)")).map(
    (p) => p.textContent
  );

  const currentContent = paragraphs.join("\n\n");

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.onclick = function () {
    popup.style.display = "none";
  };
}

function saveLocation3Changes() {
  const titleInput = document.getElementById("edit-location3-title").value;
  const contentTextarea = document.getElementById(
    "edit-location3-content"
  ).value;

  let wildlifeData = JSON.parse(localStorage.getItem("wildlifeData"));

  wildlifeData.locations[2].name = titleInput;
  wildlifeData.locations[2].description = contentTextarea.split("\n\n");

  localStorage.setItem("wildlifeData", JSON.stringify(wildlifeData));

  loadThirdLocation(wildlifeData.locations[2]);
  document.getElementById("edit-location3-popup").style.display = "none";
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
