const API = "http://localhost:5500";

const userForm = document.getElementById("userForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const usersList = document.getElementById("usersList");
const submitBtn = document.getElementById("submitBtn");

// Edit ke waqt selected username yahan save hoga
let editUsername = null;


// GET - All Users
const getUsers = async () => {

    const response = await fetch(`${API}/user`);

    const result = await response.json();

    usersList.innerHTML = "";

    result.data.forEach((user) => {

        const userCard = document.createElement("div");

        userCard.className = "user-card";

        const heading = document.createElement("h3");
        heading.textContent = user.username;

        const email = document.createElement("p");
        email.textContent = user.email;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Edit button
        editBtn.addEventListener("click", () => {
            editUser(user.username);
        });

        // Delete button
        deleteBtn.addEventListener("click", () => {
            deleteUser(user.username);
        });

        userCard.append(heading, email, editBtn, deleteBtn);

        usersList.appendChild(userCard);

    });

};


// POST / PUT - Add or Update User
userForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim()
    };

    const url = editUsername
        ? `${API}/user/${encodeURIComponent(editUsername)}`
        : `${API}/user`;

    const method = editUsername ? "PUT" : "POST";

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    console.log(result);

    userForm.reset();

    editUsername = null;

    submitBtn.textContent = "Add User";

    getUsers();

});


// Edit User
const editUser = async (username) => {

    const response = await fetch(`${API}/user`);

    const result = await response.json();

    const selectedUser = result.data.find((user) => {
        return user.username === username;
    });

    if (!selectedUser) return;

    usernameInput.value = selectedUser.username;
    emailInput.value = selectedUser.email;

    editUsername = username;

    submitBtn.textContent = "Update User";

};


// DELETE - Remove User
const deleteUser = async (username) => {

    const response = await fetch(
        `${API}/user/${encodeURIComponent(username)}`,
        {
            method: "DELETE"
        }
    );

    const result = await response.json();

    console.log(result);

    getUsers();

};


// Page Load
getUsers();