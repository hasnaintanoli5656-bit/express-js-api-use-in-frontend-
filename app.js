const signupForm = document.getElementById("signupForm");
const usersList = document.getElementById("usersList");

const API = "http://localhost:5500";

// Signup Function
signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const userData = {
        name: name,
        email: email
    };

    const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    console.log(result);

    signupForm.reset();

    // Signup ke baad users ko UI mein show karo
    getUsers();
});


// Get Users Function
const getUsers = async () => {

    const response = await fetch(`${API}/user`);

    const result = await response.json();

    usersList.innerHTML = "";

    result.data.forEach((user) => {

        usersList.innerHTML += `
            <div>
                <h1>Name: ${user.name}</h1>
                <h1>Email: ${user.email}</h1>
                <hr>
            </div>
        `;

    });

};

// Page load hote hi users show karo
getUsers();