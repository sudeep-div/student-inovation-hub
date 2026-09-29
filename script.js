/* =====================================================
   STUDENT INNOVATION HUB
   LOGIN + REGISTER SYSTEM
===================================================== */


/* ================= SHOW LOGIN ================= */

function showLogin() {

    document.getElementById("loginForm")
        .style.display = "block";

    document.getElementById("registerForm")
        .style.display = "none";

}


/* ================= SHOW REGISTER ================= */

function showRegister() {

    document.getElementById("loginForm")
        .style.display = "none";

    document.getElementById("registerForm")
        .style.display = "block";

}


/* ================= REGISTER ================= */

function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const studentId =
        document.getElementById(
            "registerStudentId"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    const department =
        document.getElementById(
            "registerDepartment"
        ).value;


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    /* Password check */

    if (password.length < 4) {

        alert(
            "Password must contain at least 4 characters."
        );

        return;
    }


    /* Confirm password */

    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    /* Check existing student */

    const existingUser =
        localStorage.getItem(
            "innovationUser"
        );


    if (existingUser) {

        const user =
            JSON.parse(existingUser);


        if (
            user.studentId === studentId
        ) {

            alert(
                "This Student ID is already registered."
            );

            return;

        }


        if (
            user.email === email
        ) {

            alert(
                "This email is already registered."
            );

            return;

        }

    }


    /* Create user */

    const newUser = {

        name: name,

        studentId: studentId,

        email: email,

        department: department,

        password: password

    };


    /* Save account */

    localStorage.setItem(

        "innovationUser",

        JSON.stringify(newUser)

    );


    alert(
        "Account created successfully! " +
        "You can now login."
    );


    /* Clear form */

    document
        .getElementById(
            "registerName"
        ).value = "";


    document
        .getElementById(
            "registerStudentId"
        ).value = "";


    document
        .getElementById(
            "registerEmail"
        ).value = "";


    document
        .getElementById(
            "registerDepartment"
        ).value = "";


    document
        .getElementById(
            "registerPassword"
        ).value = "";


    document
        .getElementById(
            "confirmPassword"
        ).value = "";


    /* Go to login */

    showLogin();

}


/* ================= LOGIN ================= */

function loginUser(event) {

    event.preventDefault();


    const username =
        document.getElementById(
            "loginUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    /* Get registered account */

    const savedUser =
        localStorage.getItem(
            "innovationUser"
        );


    /* Demo account */

    if (
        username === "student" &&
        password === "1234"
    ) {

        sessionStorage.setItem(
            "loggedIn",
            "true"
        );


        sessionStorage.setItem(
            "studentName",
            "Demo Student"
        );


        window.location.href =
            "dashboard.html";


        return;

    }


    /* No registered account */

    if (!savedUser) {

        alert(
            "No registered account found.\n\n" +
            "Please create an account first."
        );

        return;

    }


    const user =
        JSON.parse(savedUser);


    /* Check Student ID OR Email */

    const validUsername =

        username === user.studentId ||

        username === user.email;


    const validPassword =
        password === user.password;


    if (
        validUsername &&
        validPassword
    ) {

        sessionStorage.setItem(
            "loggedIn",
            "true"
        );


        sessionStorage.setItem(
            "studentName",
            user.name
        );


        sessionStorage.setItem(
            "studentDepartment",
            user.department
        );


        window.location.href =
            "dashboard.html";

    }

    else {

        alert(
            "Invalid Student ID/Email or Password."
        );

    }

}


/* ================= PASSWORD VISIBILITY ================= */

function togglePassword(id) {

    const password =
        document.getElementById(id);


    if (
        password.type === "password"
    ) {

        password.type = "text";

    }

    else {

        password.type = "password";

    }

}


/* ================= FORGOT PASSWORD ================= */

function forgotPassword(event) {

    event.preventDefault();


    const savedUser =
        localStorage.getItem(
            "innovationUser"
        );


    if (!savedUser) {

        alert(
            "No account is registered yet."
        );

        return;

    }


    const user =
        JSON.parse(savedUser);


    alert(

        "Password recovery\n\n" +

        "Registered email: " +
        user.email +
        "\n\n" +

        "For this academic prototype, " +
        "contact the administrator to reset your password."

    );

}