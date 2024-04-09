document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  if (!localStorage.getItem("leopardData")) {
    fetch("leopard.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("leopardData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("leopardData"));
    loadDataIntoPage(storedData);
  }

  const editFirstSectionForm = document.getElementById(
    "edit-first-section-form"
  );
  editFirstSectionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("edit-first-section-title").value;
    const content = document.getElementById("edit-first-section-content").value;

    const data = JSON.parse(localStorage.getItem("leopardData"));
    data.section1.title = title;
    data.section1.content = content.split("\n");

    localStorage.setItem("leopardData", JSON.stringify(data));
    loadFirstSection(data.section1);

    document.getElementById("edit-first-section-popup").style.display = "none";
  });
});

function loadDataIntoPage(data) {
  loadFirstSection(data.section1);
  loadSecondSection(data.section2);
  loadThirdSection(data.section3);
}

function loadFirstSection(section) {
  const titleElement = document.querySelector(".location-web-4");

  Array.from(titleElement.children).forEach((child) => {
    if (
      !child.classList.contains("images") &&
      !child.classList.contains("cont1")
    ) {
      child.remove();
    }
  });

  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.justifyContent = "space-between";
  titleContainer.style.alignItems = "center";
  titleContainer.style.width = "100%";

  const title = document.createElement("h1");
  title.className = "web-4-topic";
  title.innerHTML = section.title;

  titleContainer.appendChild(title);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.onclick = () => showFirstSectionEditPopup();
    titleContainer.appendChild(editButton);
  }

  titleElement.insertBefore(titleContainer, titleElement.firstChild);

  const contentContainer = document.querySelector(".location-web-4 .cont1");
  let contentHtml = "";
  section.content.forEach((paragraphText) => {
    contentHtml += `<p>${paragraphText}</p>`;
  });

  contentContainer.innerHTML = contentHtml;
}

function showFirstSectionEditPopup() {
  const popup = document.getElementById("edit-first-section-popup");
  const titleInput = document.getElementById("edit-first-section-title");
  const contentTextarea = document.getElementById("edit-first-section-content");

  const currentTitle = document.querySelector(".location-web-4 h1").textContent;
  const currentContent = document.querySelector(
    ".location-web-4 .cont1"
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";
}

function loadSecondSection(section) {
  const outerContainer = document.getElementById("section2");

  let sectionHtml = `<h1 class="web-4-topic2">${section.title}</h1>`;
  section.locations.forEach((location) => {
    sectionHtml += `
      <div class="location-2-web4">
        <h1 class="web-4-sub">${location.name}</h1>
        <div>
          <img class="web-4-pic2" src="${location.image}" alt="leopard" />
        </div>
        <p>${location.description}</p>
      </div>
      <br />
      <br />
    `;
  });
  outerContainer.innerHTML += sectionHtml;
}

function loadThirdSection(section) {
  const outerContainer = document.getElementById("section3");

  let sectionHtml = `<h1 class="web-4-topic2">${section.title}</h1>`;
  section.content.forEach((subSection) => {
    sectionHtml += `
      <div class="location-3-web4">
        <h1 class="web-4-nxt">${subSection.title}</h1>
        <div>
          <img class="web-4-pic3" src="${subSection.image}" alt="${subSection.title}" />
        </div>
        <p>${subSection.description}</p>
      </div>
    `;
  });

  outerContainer.innerHTML += sectionHtml;
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
