document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  if (!localStorage.getItem("animalData")) {
    fetch("index.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("indexData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("indexData"));
    loadDataIntoPage(storedData);
  }

  const editIntroForm = document.getElementById("edit-intro-form");
  editIntroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveIntroductionChanges();
  });

  const editUniqueWildlifeForm = document.getElementById("edit-unique-form");
  editUniqueWildlifeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveUniqueWildlifeChanges();
  });

  const editMarineLifeForm = document.getElementById("edit-marine-form");
  editMarineLifeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveMarineLifeChanges();
  });

  const editTerrestrialLifeForm = document.getElementById(
    "edit-terrestrial-form"
  );
  editTerrestrialLifeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveTerrestrialLifeChanges();
  });
});

function loadDataIntoPage(data) {
  loadIntroduction(data.introduction);
  loadUniqueWildlife(data.uniqueWildlife);
  loadMarineLife(data.marineLife);
  loadTerrestrialLife(data.terrestrialLife);
}

function loadIntroduction(introduction) {
  const container = document.getElementById("intro-section");
  container.innerHTML = "";

  const titleElement = document.createElement("h1");
  titleElement.className = "title";
  titleElement.textContent = introduction.title;

  const uTag = document.createElement("u");
  uTag.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "intro-section");
    editButton.addEventListener("click", function () {
      showEditIntroPopup("intro-section");
    });

    const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.justifyContent = "space-between";
    titleContainer.style.alignItems = "center";

    titleContainer.appendChild(uTag);
    titleContainer.appendChild(editButton);
    container.appendChild(titleContainer);
  } else {
    container.appendChild(uTag);
  }

  const contentParagraph = document.createElement("p");
  contentParagraph.className = "para1";
  contentParagraph.textContent = introduction.content;
  container.appendChild(contentParagraph);
}

function showEditIntroPopup(sectionId) {
  const popup = document.getElementById("edit-intro-popup");
  popup.style.display = "block";

  const titleInput = document.getElementById("edit-intro-title");
  const contentTextarea = document.getElementById("edit-intro-content");

  const titleElement = document.querySelector(`#${sectionId} .title`);
  const contentElement = document.querySelector(`#${sectionId} .para1`);
  titleInput.value = titleElement.textContent;
  contentTextarea.value = contentElement.textContent;
}

function saveIntroductionChanges() {
  const newTitle = document.getElementById("edit-intro-title").value;
  const newContent = document.getElementById("edit-intro-content").value;

  let indexData = JSON.parse(localStorage.getItem("indexData"));

  indexData.introduction.title = newTitle;
  indexData.introduction.content = newContent;
  localStorage.setItem("indexData", JSON.stringify(indexData));

  loadIntroduction(indexData.introduction);
  document.getElementById("edit-intro-popup").style.display = "none";
}

function loadUniqueWildlife(uniqueWildlife) {
  const container = document.getElementById("unique-wildlife");

  Array.from(container.children).forEach((child) => {
    if (
      child.tagName !== "OL" &&
      !child.classList.contains("unique-sri-lanka")
    ) {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.textContent = uniqueWildlife.title;

  const titleDiv = document.createElement("div");
  titleDiv.className = "title1";
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.className = "title-container";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "unique-wildlife");
    editButton.addEventListener("click", function () {
      showUniqueEditPopup("unique-wildlife");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  uniqueWildlife.paragraphs.forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.textContent = paragraphText;
    container.insertBefore(paragraph, container.querySelector("ol"));
  });
}

function showUniqueEditPopup(sectionId) {
  const popup = document.getElementById("edit-unique-popup");
  popup.style.display = "block";

  const titleInput = document.getElementById("edit-unique-title");
  const contentTextarea = document.getElementById("edit-unique-content");

  const titleElement = document.querySelector(`#${sectionId} .title1`);
  const contentElement = document.querySelectorAll(`#${sectionId} .para`);
  const contentTexts = Array.from(contentElement).map(
    (element) => element.innerText
  );
  const contentText = contentTexts.join("\n\n");
  titleInput.value = titleElement.textContent;
  contentTextarea.value = contentText;
}

function saveUniqueWildlifeChanges() {
  const newTitle = document.getElementById("edit-unique-title").value;
  const newContent = document.getElementById("edit-unique-content").value;

  let indexData = JSON.parse(localStorage.getItem("indexData"));

  indexData.uniqueWildlife.title = newTitle;
  indexData.uniqueWildlife.paragraphs = newContent.split("\n");

  localStorage.setItem("indexData", JSON.stringify(indexData));

  loadUniqueWildlife(indexData.uniqueWildlife);
  document.getElementById("edit-unique-popup").style.display = "none";
}

function loadMarineLife(marineLife) {
  const container = document.getElementById("marine-life");

  Array.from(container.children).forEach((child) => {
    if (child.tagName !== "IMG") {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.textContent = marineLife.title;

  const titleDiv = document.createElement("div");
  titleDiv.className = "title1";
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "inline-flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "marine-life");
    editButton.addEventListener("click", function () {
      showMarineEditPopup("marine-life");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  marineLife.paragraphs.forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.textContent = paragraphText;
    container.insertBefore(paragraph, container.children[1]);
  });
}

function showMarineEditPopup(sectionId) {
  const popup = document.getElementById("edit-marine-popup");
  popup.style.display = "block";

  const titleInput = document.getElementById("edit-marine-title");
  const contentTextarea = document.getElementById("edit-marine-content");

  const titleElement = document.querySelector(`#${sectionId} .title1`);
  const contentElement = document.querySelectorAll(`#${sectionId} .para`);
  const contentTexts = Array.from(contentElement).map(
    (element) => element.innerText
  );
  const contentText = contentTexts.join("\n\n");
  titleInput.value = titleElement.textContent;
  contentTextarea.value = contentText;
}

function saveMarineLifeChanges() {
  const newTitle = document.getElementById("edit-marine-title").value;
  const newContent = document.getElementById("edit-marine-content").value;

  let indexData = JSON.parse(localStorage.getItem("indexData"));

  indexData.marineLife.title = newTitle;
  indexData.marineLife.paragraphs = newContent.split("\n");

  localStorage.setItem("indexData", JSON.stringify(indexData));

  loadMarineLife(indexData.marineLife);
  document.getElementById("edit-marine-popup").style.display = "none";
}

function loadTerrestrialLife(terrestrialLife) {
  const container = document.getElementById("terrestrial-life");

  Array.from(container.children).forEach((child) => {
    if (child.tagName !== "UL" && child.tagName !== "IMG") {
      child.remove();
    }
  });

  const titleElement = document.createElement("h1");
  titleElement.textContent = terrestrialLife.title;

  const titleDiv = document.createElement("div");
  titleDiv.className = "title1";
  titleDiv.appendChild(titleElement);

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "inline-flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "terrestrial-life");
    editButton.addEventListener("click", function () {
      showTerrestrialEditPopup("terrestrial-life");
    });
    titleContainer.appendChild(titleDiv);
    titleContainer.appendChild(editButton);
  } else {
    titleContainer.appendChild(titleDiv);
  }

  container.insertBefore(titleContainer, container.firstChild);

  terrestrialLife.paragraphs.forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.className = "para";
    paragraph.textContent = paragraphText;
    container.insertBefore(paragraph, container.querySelector("ul"));
  });
}

function showTerrestrialEditPopup(sectionId) {
  const popup = document.getElementById("edit-terrestrial-popup");
  popup.style.display = "block";

  const titleInput = document.getElementById("edit-terrestrial-title");
  const contentTextarea = document.getElementById("edit-terrestrial-content");

  const titleElement = document.querySelector(`#${sectionId} .title1`);
  const contentElement = document.querySelectorAll(`#${sectionId} .para`);
  const contentTexts = Array.from(contentElement).map(
    (element) => element.innerText
  );
  const contentText = contentTexts.join("\n\n");
  titleInput.value = titleElement.textContent;
  contentTextarea.value = contentText;
}

function saveTerrestrialLifeChanges() {
  const newTitle = document.getElementById("edit-terrestrial-title").value;
  const newContent = document.getElementById("edit-terrestrial-content").value;

  let indexData = JSON.parse(localStorage.getItem("indexData"));

  indexData.terrestrialLife.title = newTitle;
  indexData.terrestrialLife.paragraphs = newContent.split("\n");

  localStorage.setItem("indexData", JSON.stringify(indexData));

  loadTerrestrialLife(indexData.terrestrialLife);
  document.getElementById("edit-terrestrial-popup").style.display = "none";
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

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  document.getElementById("edit-popup").style.display = "none";
});
