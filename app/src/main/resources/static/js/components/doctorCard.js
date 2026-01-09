// doctorCard.js
// Component to render a single doctor card with role-based actions

// Import required functions
import { showBookingOverlay } from "../loggedPatient.js";          // overlay for booking
import { deleteDoctor } from "../services/doctorServices.js";      // API to delete doctor
import { getPatientData } from "../services/patientServices.js";   // fetch patient details

export function createDoctorCard(doctor) {
    // Create main card container
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    // Retrieve current user role
    const role = localStorage.getItem("userRole");

    // Doctor info section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = `Specialty: ${doctor.specialty}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${doctor.email}`;

    const availability = document.createElement("p");
    availability.textContent = `Availability: ${Array.isArray(doctor.availability) ? doctor.availability.join(", ") : doctor.availability}`;

    // Append info elements
    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    // Actions container
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    // === ADMIN ROLE ACTIONS ===
    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("adminBtn");

        removeBtn.addEventListener("click", async () => {
            if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
                const token = localStorage.getItem("token");
                try {
                    const result = await deleteDoctor(doctor.id, token);
                    if (result.success) {
                        alert("Doctor deleted successfully.");
                        card.remove();
                    } else {
                        alert("Failed to delete doctor.");
                    }
                } catch (err) {
                    alert("Error deleting doctor. Please try again.");
                }
            }
        });

        actionsDiv.appendChild(removeBtn);
    }

    // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
    else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.classList.add("bookBtn");

        bookNow.addEventListener("click", () => {
            alert("Please log in before booking an appointment.");
        });

        actionsDiv.appendChild(bookNow);
    }

    // === LOGGED-IN PATIENT ROLE ACTIONS ===
    else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.classList.add("bookBtn");

        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Session expired. Please log in again.");
                window.location.href = "/";
                return;
            }

            try {
                const patientData = await getPatientData(token);
                showBookingOverlay(e, doctor, patientData);
            } catch (err) {
                alert("Error fetching patient data. Please try again.");
            }
        });

        actionsDiv.appendChild(bookNow);
    }

    // Final assembly
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    // Return the complete doctor card element
    return card;
}
