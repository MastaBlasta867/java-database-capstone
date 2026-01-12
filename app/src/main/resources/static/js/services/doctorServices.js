import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

// Fetch all doctors
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.error("Failed to fetch doctors");
      return [];
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

// Delete a doctor by ID
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      return { success: false, message: "Failed to delete doctor" };
    }
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return { success: false, message: error.message };
  }
}

// Save (Add) a new doctor
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      return { success: false, message: "Failed to save doctor" };
    }
  } catch (error) {
    console.error("Error saving doctor:", error);
    return { success: false, message: error.message };
  }
}

// Filter doctors
export async function filterDoctors(name, time, specialty) {
  try {
    const url = `${DOCTOR_API}/filter?name=${name || ""}&time=${time || ""}&specialty=${specialty || ""}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.error("Failed to filter doctors");
      return [];
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    return [];
  }
}
