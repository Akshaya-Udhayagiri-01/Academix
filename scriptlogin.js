document.getElementById("student-btn").addEventListener("click", function () {
    showLoginForm("Student");
});

document.getElementById("teacher-btn").addEventListener("click", function () {
    showLoginForm("Teacher");
});

function showLoginForm(role) {
    // Update role title dynamically based on the selected role
    document.getElementById("role-title").textContent = `Login as ${role}`;

    // Show the login form
    document.getElementById("login-form").classList.remove("hidden");

    // Hide the entire role selection section (including "Select your role" text)
    document.querySelector(".role-container").classList.add("hidden");

    // Update email input placeholder dynamically based on role
    const emailInput = document.getElementById("email");
    if (role === "Student") {
        emailInput.placeholder = "e.g., username@stud.com";
    } else if (role === "Teacher") {
        emailInput.placeholder = "e.g., username@teacher.com";
    }

    // Show email format hint for better clarity
    document.getElementById("email-format-hint").classList.remove("hidden");

    // Handle the login form submission
    document.getElementById("login-form").onsubmit = function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        handleLogin(role); // Handle the login based on the selected role
    };
}

function handleLogin(role) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if email matches the expected format based on role
    if (role === "Student" && email.endsWith("@stud.com")) {
        if (password) {
            // Simulate a successful login for a student
            alert("Login successful as Student!");
            window.location.href = "student.html"; // Redirect to student page
        } else {
            alert("Please enter a password.");
        }
    } else if (role === "Teacher" && email.endsWith("@teacher.com")) {
        if (password) {
            // Simulate a successful login for a teacher
            alert("Login successful as Teacher!");
            window.location.href = "teacher.html"; // Redirect to mentors page
        } else {
            alert("Please enter a password.");
        }
    } else {
        // Handle invalid email format or password
        if (!email.endsWith("@stud.com") && !email.endsWith("@teacher.com")) {
            alert("Invalid email format. Ensure your email ends with @stud.com (for student) or @teacher.com (for teacher).");
        } else {
            alert("Invalid password. Please try again.");
        }
    }
}
