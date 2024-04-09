document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    getNewsletterSubscriptions();
  }
});

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

function getNewsletterSubscriptions() {
  const title = document.createElement("h2");
  title.textContent = "Newsletter Subscriptions";
  document.getElementById("subscriptions").appendChild(title);

  const subscriptions =
    JSON.parse(localStorage.getItem("newsletterSubscriptions")) || [];

  if (subscriptions.length > 0) {
    const table = document.createElement("table");
    table.setAttribute("class", "subscriptions-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    const emailHeader = document.createElement("th");
    emailHeader.textContent = "Email";
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(emailHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    subscriptions.forEach((subscription) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = subscription.name;
      const emailCell = document.createElement("td");
      emailCell.textContent = subscription.email;
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    document.getElementById("subscriptions").appendChild(table);
  } else {
    const message = document.createElement("p");
    message.textContent = "No newsletter subscriptions found.";
    document.getElementById("subscriptions").appendChild(message);
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
