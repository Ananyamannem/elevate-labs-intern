const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUserData() {
  userContainer.innerHTML = "<p>Loading users...</p>";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then(users => {
      userContainer.innerHTML = "";
      users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
      });
    })
    .catch(error => {
      userContainer.innerHTML = `<p style="color: red;">Error fetching users: ${error.message}</p>`;
    });
}

// Initial fetch
fetchUserData();

// Reload button
reloadBtn.addEventListener("click", fetchUserData);
