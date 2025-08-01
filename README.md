This application collects and displays survey data from students, parents, and guardians regarding device usage, mental health, and behavioral patterns. Each group has its own table (student_surveys, parent_surveys, guardian_surveys) with required fields and submission timestamps.

# Security is enforced through Row Level Security (RLS):

- Allows anyone to submit surveys

- Restricts data reading by default (additional policies needed for access)

# Features include:

- **Data Display Page:** Tabbed, paginated views of each survey type with responsive design

- **Analysis Dashboard:** Interactive charts, summary stats, and real-time updates via Chart.js and Supabase SQL functions

- **Navigation:** Consistent, updated links across the app

This setup offers a secure, responsive, and data-driven interface for collecting and analyzing mental wellness-related survey data.

# Live Link:

[Rising Sun School Student Survey and Analysis](https://rising-sun-school-survey.netlify.app/analysis)
