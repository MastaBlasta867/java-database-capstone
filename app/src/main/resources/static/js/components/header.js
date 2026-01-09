// header.js
// Reusable header component for all pages

function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    // Reset header on homepage
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        headerDiv.innerHTML = ""; // no header on homepage
        return;
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // Handle invalid session
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    let headerContent = "";

    // Role-based header rendering
    if (role === "admin") {
        headerContent += `
            <nav class="header-nav">
                <button id="addDocBtn" class="adminBtn">Add Doctor</button>
                <a href="#" id="logoutBtn">Logout</a>
            </nav>
        `;
    } else if (role === "doctor") {
        headerContent += `
            <nav class="header-nav">
                <a href="/templates/doctor/doctorDashboard.html">Home</a>
                <a href="#" id="logoutBtn">Logout</a>
            </nav>
        `;
    } else if (role === "patient") {
        headerContent += `
            <nav class="header-nav">
                <a href="/pages/login.html" id="loginBtn">Login</a>
                <a href="/pages/signup.html" id="signupBtn">Sign Up</a>
            </nav>
        `;
    } else if (role === "loggedPatient") {
        headerContent += `
            <nav class="header-nav">
                <a href="/pages/patientDashboard.html">Home</a>
                <a href="/pages/patientAppointments.html">Appointments</a>
                <a href="#" id="logoutPatientBtn">Logout</a>
            </nav>
        `;
    }

    // Inject header HTML
    headerDiv.innerHTML = headerContent;

    // Attach event listeners
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => {
            openModal("addDoctor");
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    const logoutPatientBtn = document.getElementById("logoutPatientBtn");
    if (logoutPatientBtn) {
        logoutPatientBtn.addEventListener("click", logoutPatient);
    }
}

// Logout for admin/doctor
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
}

// Logout for patient (retain role as patient)
function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}

// Export function so it can be called globally
window.renderHeader = renderHeader;
 
