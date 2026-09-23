# Job Application Tracker
A full stack web application for tracking internship and job applications, built with a Django REST API backend and a React frontend.

**Live demo:** https://job-tracker-frontend-o1ed.onrender.com/

**Backend API:** https://job-tracker-backend-oqia.onrender.com/api/applications/

**Features**
- Add, view, edit, and delete job applications through a live web interface
- Track company, role, status, and date applied for each application
- Backend REST API built with Django REST Framework, backed by a SQLite database
- Frontend built with React, using controlled components and Fetch API to communicate with the backend in real time

### Tech Stack
- **Backend:** Python, Django, Django REST Framework, SQLite, Gunicorn
- **Frontend:** React, JavaScript, CSS
- **Deployment:** Render, source and version control via Git and GitHub

### How It Works
1. The `Application` model defines the contents of each job application (company, role, status, date applied, notes) and maps to a SQLite table through Django's ORM.
2. Django REST Frameowrk exposes this models as a full REST API through `ModelViewSet` and router, supporting CRUD operations at `/api/applications/`.
3. The React frontend fetches this data on load and stores it in component state.
4. Submitting the form sends a POST request to create a new application, or a PATCH request to update an existing one.
5. Clicking Delete button sends a DELETE request for that specific application and removes it from the displayed list.
6. Django is configured with CORS headers to allow requests from the deployed React frontend's origin.

### Running Locally
**Backend:** http://127.0.0.1:8000
```bash
git clone https://github.com/lojohjucs/job-tracker-backend.git
cd job-tracker-backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:** http://localhost:5173
```bash
git clone https://github.com/lojohjucs/job-tracker-frontend.git
cd job-tracker-frontend
npm install
npm run dev
```

By default, the front end is configured to call the deployed backend URL. To run fully locally, update the fetch URLS in `src/App.jsx` back to `http://127.0.0.1:8000`.

### Possible Future Improvements
- Add filtering and sorting by status
- Add basic analytics, such as response rate by company or time to respond



