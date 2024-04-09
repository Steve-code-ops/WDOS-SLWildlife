document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  if (!localStorage.getItem("animalData")) {
    fetch("animals.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("animalData", JSON.stringify(data));
        loadDataIntoPage(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    const storedData = JSON.parse(localStorage.getItem("animalData"));
    loadDataIntoPage(storedData);
  }

  const editAnimal1Form = document.getElementById("edit-animal1-form");
  editAnimal1Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal1Changes();
  });

  const editAnimal2Form = document.getElementById("edit-animal2-form");
  editAnimal2Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal2Changes();
  });

  const editAnimal3Form = document.getElementById("edit-animal3-form");
  editAnimal3Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal3Changes();
  });

  const editAnimal4Form = document.getElementById("edit-animal4-form");
  editAnimal4Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal4Changes();
  });

  const editAnimal5Form = document.getElementById("edit-animal5-form");
  editAnimal5Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal5Changes();
  });

  const editAnimal6Form = document.getElementById("edit-animal6-form");
  editAnimal6Form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveAnimal6Changes();
  });
});

function loadDataIntoPage(data) {
  loadFirstAnimal(data.animals[0]);
  loadSecondAnimal(data.animals[1]);
  loadThirdAnimal(data.animals[2]);
  loadFourthAnimal(data.animals[3]);
  loadFifthAnimal(data.animals[4]);
  loadSixthAnimal(data.animals[5]);
}

function loadFirstAnimal(animal) {
  const container = document.getElementById("animal1");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal1");
    editButton.addEventListener("click", function () {
      showAnimal1EditPopup("animal1");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal1EditPopup(section) {
  const popup = document.getElementById("edit-animal1-popup");
  const titleInput = document.getElementById("edit-animal1-title");
  const contentTextarea = document.getElementById("edit-animal1-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal1Changes() {
  const titleInput = document.getElementById("edit-animal1-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal1-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[0].title = titleInput;
  data.animals[0].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadFirstAnimal(data.animals[0]);

  const popup = document.getElementById("edit-animal1-popup");
  popup.style.display = "none";
}

function loadSecondAnimal(animal) {
  const container = document.getElementById("animal2");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal2");
    editButton.addEventListener("click", function () {
      showAnimal2EditPopup("animal2");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal2EditPopup(section) {
  const popup = document.getElementById("edit-animal2-popup");
  const titleInput = document.getElementById("edit-animal2-title");
  const contentTextarea = document.getElementById("edit-animal2-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal2Changes() {
  const titleInput = document.getElementById("edit-animal2-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal2-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[1].title = titleInput;
  data.animals[1].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadSecondAnimal(data.animals[1]);

  const popup = document.getElementById("edit-animal2-popup");
  popup.style.display = "none";
}

function loadThirdAnimal(animal) {
  const container = document.getElementById("animal3");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal3");
    editButton.addEventListener("click", function () {
      showAnimal3EditPopup("animal3");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal3EditPopup(section) {
  const popup = document.getElementById("edit-animal3-popup");
  const titleInput = document.getElementById("edit-animal3-title");
  const contentTextarea = document.getElementById("edit-animal3-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal3Changes() {
  const titleInput = document.getElementById("edit-animal3-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal3-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[2].title = titleInput;
  data.animals[2].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadThirdAnimal(data.animals[2]);

  const popup = document.getElementById("edit-animal3-popup");
  popup.style.display = "none";
}

function loadFourthAnimal(animal) {
  const container = document.getElementById("animal4");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal4");
    editButton.addEventListener("click", function () {
      showAnimal4EditPopup("animal4");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal4EditPopup(section) {
  const popup = document.getElementById("edit-animal4-popup");
  const titleInput = document.getElementById("edit-animal4-title");
  const contentTextarea = document.getElementById("edit-animal4-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal4Changes() {
  const titleInput = document.getElementById("edit-animal4-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal4-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[3].title = titleInput;
  data.animals[3].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadFourthAnimal(data.animals[3]);

  const popup = document.getElementById("edit-animal4-popup");
  popup.style.display = "none";
}

function loadFifthAnimal(animal) {
  const container = document.getElementById("animal5");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal5");
    editButton.addEventListener("click", function () {
      showAnimal5EditPopup("animal5");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal5EditPopup(section) {
  const popup = document.getElementById("edit-animal5-popup");
  const titleInput = document.getElementById("edit-animal5-title");
  const contentTextarea = document.getElementById("edit-animal5-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal5Changes() {
  const titleInput = document.getElementById("edit-animal5-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal5-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[4].title = titleInput;
  data.animals[4].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadFifthAnimal(data.animals[4]);

  const popup = document.getElementById("edit-animal5-popup");
  popup.style.display = "none";
}

function loadSixthAnimal(animal) {
  const container = document.getElementById("animal6");

  const existingDescDiv = container.querySelector(".desc");
  if (existingDescDiv) {
    existingDescDiv.remove();
  }

  const descDiv = document.createElement("div");
  descDiv.className = "desc";

  const titleElement = document.createElement("h1");
  titleElement.textContent = animal.title;

  descDiv.appendChild(titleElement);

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.setAttribute("data-section", "animal6");
    editButton.addEventListener("click", function () {
      showAnimal6EditPopup("animal6");
    });
    descDiv.appendChild(editButton);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = animal.description;

  descDiv.appendChild(descriptionElement);
  container.appendChild(descDiv);
}

function showAnimal6EditPopup(section) {
  const popup = document.getElementById("edit-animal6-popup");
  const titleInput = document.getElementById("edit-animal6-title");
  const contentTextarea = document.getElementById("edit-animal6-content");

  const currentTitle = document.querySelector(
    `#${section} .desc h1`
  ).textContent;
  const currentContent = document.querySelector(
    `#${section} .desc p`
  ).textContent;

  titleInput.value = currentTitle;
  contentTextarea.value = currentContent;

  popup.style.display = "block";

  const closeButton = popup.querySelector(".close");
  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
}

function saveAnimal6Changes() {
  const titleInput = document.getElementById("edit-animal6-title").value;
  console.log(titleInput);
  const contentTextarea = document.getElementById("edit-animal6-content").value;
  console.log(contentTextarea);

  const data = JSON.parse(localStorage.getItem("animalData"));

  data.animals[5].title = titleInput;
  data.animals[5].description = contentTextarea;

  localStorage.setItem("animalData", JSON.stringify(data));
  loadSixthAnimal(data.animals[5]);

  const popup = document.getElementById("edit-animal6-popup");
  popup.style.display = "none";
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
