## MySQL Database Design

### Table: patients
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), Not Null
- last_name: VARCHAR(100), Not Null
- email: VARCHAR(150), Unique, Not Null
- phone: VARCHAR(20), Not Null
- date_of_birth: DATE, Not Null
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table: doctors
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), Not Null
- last_name: VARCHAR(100), Not Null
- specialty: VARCHAR(100), Not Null
- email: VARCHAR(150), Unique, Not Null
- phone: VARCHAR(20), Not Null
- availability_status: VARCHAR(50), Default 'AVAILABLE'

### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- status: VARCHAR(50), Default 'SCHEDULED'
- notes: TEXT, Nullable

### Table: admin
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(100), Unique, Not Null
- password_hash: VARCHAR(255), Not Null
- role: VARCHAR(50), Default 'ADMIN'
## MongoDB Collection Design

### Collection: prescriptions
This collection stores flexible, document‑based prescription data that does not fit neatly into relational tables. Prescriptions may include optional notes, metadata, tags, or pharmacy details, making MongoDB a good choice due to its schema‑less nature.

Example document:
```json
{
  "_id": "ObjectId('65f12ab3490cde1234567890')",
  "patientId": 12,
  "doctorId": 4,
  "appointmentId": 88,
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "250mg",
      "frequency": "3 times a day"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "As needed for pain"
    }
  ],
  "doctorNotes": "Patient should complete full antibiotic course.",
  "tags": ["infection", "antibiotic", "follow-up-required"],
  "pharmacy": {
    "name": "CityCare Pharmacy",
    "location": "Downtown Vancouver",
    "contact": "604-555-0199"
  },
  "metadata": {
    "createdAt": "2026-01-07T19:46:00Z",
    "updatedAt": "2026-01-07T19:46:00Z",
    "version": 1
  }
}
