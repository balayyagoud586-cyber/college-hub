const loginForm =
    document.getElementById("loginForm");


const message =
    document.getElementById("message");


/* PASSWORD SHOW/HIDE */

function togglePassword() {

    const password =
        document.getElementById("password");

    const eyeIcon =
        document.getElementById("eyeIcon");


    if (password.type === "password") {

        password.type = "text";

        eyeIcon.className =
            "fa-regular fa-eye-slash";

    } else {

        password.type = "password";

        eyeIcon.className =
            "fa-regular fa-eye";

    }

}


/* LOGIN */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const role =
            document
                .getElementById("role")
                .value;


        const button =
            document.querySelector(
                ".login-button"
            );


        message.textContent =
            "Logging in...";

        message.style.color =
            "#64748b";

        button.disabled = true;


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/auth/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            email: email,

                            password: password

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Login failed"
                );

            }


            /*
             SAVE LOGIN DATA
            */

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            /*
             CHECK SELECTED ROLE
            */

            if (
                data.user.role !== role
            ) {

                message.textContent =
                    "Incorrect login role.";

                message.style.color =
                    "#ef4444";

                button.disabled = false;

                return;

            }


            message.textContent =
                "Login successful!";

            message.style.color =
                "#16a34a";


            /*
             REDIRECT
            */

            setTimeout(() => {

                if (
                    data.user.role ===
                    "student"
                ) {

                    window.location.href =
                        "student-dashboard.html";

                }

                else if (
                    data.user.role ===
                    "organizer"
                ) {

                    window.location.href =
                        "organizer-dashboard.html";

                }

                else if (
                    data.user.role ===
                    "admin"
                ) {

                    window.location.href =
                        "admin-dashboard.html";

                }

            }, 700);


        }

        catch (error) {

            message.textContent =
                error.message;

            message.style.color =
                "#ef4444";

            button.disabled = false;

        }

    }
);