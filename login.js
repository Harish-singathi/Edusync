async function login() {

    let username =
        document.getElementById("username").value.trim();

    let password =
        document.getElementById("password").value;

    let message =
        document.getElementById("message");


    if (username === "" || password === "") {

        message.innerText =
            "Please enter username and password.";

        return;
    }


    try {

        let response =
            await fetch(
                `/Users?username=${username}&password=${password}`
            );


        if (!response.ok) {

            throw new Error(
                "Login failed"
            );

        }


        let users =
            await response.json();


        if (users.length === 0) {

            message.innerText =
                "Invalid username or password.";

            return;
        }


        let user = users[0];




        localStorage.setItem(
            "loggedUser",
            JSON.stringify(user)
        );


    

        if (user.role === "admin") {

            window.location.href =
                "admin.html";

        }

        else if (user.role === "user") {

            window.location.href =
                "user.html";

        }

    }
    catch (error) {

        console.log(error);

        message.innerText =
            "Unable to connect to server.";

    }

}