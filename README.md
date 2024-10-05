# JobPulse

**JobPortal** is a web application where students can explore and apply for jobs in the tech field. Additionally, an admin can log in to post job listings. The platform is built with a modern tech stack using **React.js**, **Shadcn-UI**, **Tailwind CSS**, **Redux Toolkit** for the frontend, **Node.js** and **Express.js** for the backend, and **MongoDB** as the database.

## Features

### Student

- Browse tech-related jobs.
- Apply for jobs directly via the portal.
- Create and manage job applications.

### Admin

- Admin login and authentication.
- Post new job opportunities.
- Manage job listings.

## Tech Stack

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Shadcn-UI**: A library for building accessible, reusable UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux Toolkit**: State management for handling application-wide states.

### Backend

- **Node.js**: JavaScript runtime environment for executing server-side code.
- **Express.js**: Web framework for building APIs.

### Database

- **MongoDB**: NoSQL database used for storing job listings, user data, and applications.

## Getting Started

### Prerequisites

- **Node.js**: Make sure Node.js is installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: A MongoDB instance should be running. You can use either a local instance or MongoDB Atlas.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/maheshraut07/JobPortal
    cd JobPortal
    ```

2.  **Backend setup** - Navigate to the `backend` directory.
    `bash
cd backend
` - Install backend dependencies.
    `bash
npm install
` - Create a `.env` file in the `backend` folder and add the following environment variables:

    ````
    MONGO_URI = < Your MongoDB Atlas Connection URI >
    PORT = < Your Desired Port to run the backend service >
    SECRET_KEY = < Your Secret key to hash the password and to be stored in the database >
    CLOUD_NAME = < Your cloudinary cloud name >
    API_KEY = < API Key of the cloudinary >
    API_SECRET = < API Secret key of the cloudinary >

          ```

        - Start the backend server.
        ```bash
        npm run dev
        ```

    ````

3.  **Frontend setup**

    - Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```

    - Install frontend dependencies.

    ```bash
    npm install
    ```

    - Start the frontend development server.

    ```bash
    npm run dev
    ```

4.  **Run MongoDB**
    - If you are running MongoDB locally, ensure the MongoDB server is up and running.

### Project Structure

### Scripts

#### Backend Scripts

- **`npm run dev`**: Run the backend server in development mode with hot-reloading.

#### Frontend Scripts

- **`npm run dev`**: Start the frontend development server.

### API Endpoints

#### User (Student)

- `POST /api/v1/user/register`: Register a new user.
- `POST /api/v1/user/login`: Login user.
- `GET /api/v1/job/get`: Get all job listings for the student.
- `POST /api/v1/apply`: Apply for a job.

#### Admin

- `POST /api/v1/user/register`: Admin login.
- `POST /api/v1/job/post`: Post a new job by the admin.
- `GET /api/v1/jobgetadminjobs`: List of a jobs posted by the admin.
- `GET /api/v1/job/get/:id`: List of a job get by the jobID posted by the admin.

### Deployment

1. **Backend**: Deploy the Node.js API on services like Heroku, AWS, or any server that supports Node.js.
2. **Frontend**: Deploy the React app on platforms like Vercel, Netlify, or GitHub Pages.

### Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

### License

This project is licensed under the MIT License.
