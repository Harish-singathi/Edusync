async function register() {

    let name = document.getElementById("name").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.getElementById("role").value;
    let adminCode = document.getElementById("adminCode").value;
    let message = document.getElementById("message");

    if (
        name === "" ||
        username === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        message.innerText = "Please fill all required fields.";
        return;
    }

    if (password !== confirmPassword) {
        message.innerText = "Passwords do not match.";
        return;
    }

    if (role === "admin" && adminCode !== "ADMIN123") {
        message.innerText = "Invalid Admin Registration Code.";
        return;
    }

    try {

        let checkResponse = await fetch(
            `/Users?username=${username}`
        );

        let existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
            message.innerText = "Username already exists.";
            return;
        }

        let newUser = {
            name: name,
            username: username,
            password: password,
            role: role
        };

        let response = await fetch(
            "/Users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            }
        );

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        alert("Registration successful!");

       document.getElementById("message").innerHTML = `
    Registration successful! 
    <a href="./login.html">Click here to Login</a>
`;

    }
    catch (error) {

        console.log(error);

        message.innerText = "Registration failed.";

    }

}