# Task Tracker Application

This is a Task Tracker application built with React and Django. The frontend is developed using React and Vite, while the backend is built with Django and Django REST Framework.
![demo](https://github.com/tasktracker/demo.gif)

## Getting Started

### Cloning the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/mbpII/tasktracker/
cd tasktracker
```

### Setting Up the Frontend

Navigate to the `frontend` directory, install the dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

### Connecting to the API

The frontend is currently set up to connect to an API hosted on an EC2 instance with Nginx. This is a temporary workaround until the S3 connection is fully operational.

![image of the neofetch of my ssh session](https://utfs.io/f/32533950-0893-427b-818a-6e205a9982c2-61p395.png)
![image of the htop of my ssh session](https://utfs.io/f/4df06d4d-7f4c-4b31-a87e-9e6a475d6e93-9crkia.png)

### Serving Frontend

As mentioned above, the S3 connection isn’t fully operational, but the files are hosted as follows:

1. **Npm run build creates the static assest that will be hosted in s3**

2. **The static assets are then synced with the bucket via this aws cli command:**
   `aws s3 sync dist/ s3://tasktracker-frontend`

![image of the s3 bucket](https://utfs.io/f/18f7e152-16a7-4d3a-a828-ede619dcb9a2-2sg.png)

[s3 url](http://tasktracker-frontend.s3-website-us-east-1.amazonaws.com)

[cloudfront url](https://djmis10zlmp77.cloudfront.net)

## Running the API Locally

To run the API locally, follow these steps:

1. **Set Up the Backend**:

   Make sure you have Python and `pip` installed. Then, navigate to the backend directory (where `manage.py` is located), set up a virtual environment, install dependencies, and start the Django development server:

   ```bash
   cd tasktracker #This should be you prodject root directory
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

This will start the Django server at `http://127.0.0.1:8000/`.

### Example of Running the API Locally

Follow the steps mentioned above to run the API locally. Ensure that all the files are in the same repository and correctly configured.

## Notes

- Ensure that the EC2 instance and the S3 bucket are properly configured with the necessary CORS settings to allow the frontend to communicate with the backend.
- The API endpoints are defined in Django and should be accessible once the server is running.
