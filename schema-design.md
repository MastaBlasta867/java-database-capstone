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
