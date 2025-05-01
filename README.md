# Job Board Application

This is a full-stack job board application with a React frontend and a Node.js/Express backend using MongoDB.

## Project Structure

- `job-board-backend/`: Backend API server
- `job-board-frontend/`: Frontend React application

---

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd job-board-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `job-board-backend` with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd job-board-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (or as indicated in the terminal).

---

## Building for Production

### Frontend

![Screenshot 2025-05-01 185229](https://github.com/user-attachments/assets/58c7d581-b09a-4164-9021-6ff3a14463b1)

![Screenshot 2025-05-01 185240](https://github.com/user-attachments/assets/78859eea-26ce-4ded-9ea5-db58a8d28205)

![Screenshot 2025-05-01 185252](https://github.com/user-attachments/assets/636703f6-e570-4225-95ac-5eab20685cef)

![Screenshot 2025-05-01 185302](https://github.com/user-attachments/assets/2859fc0a-8197-46f1-b130-5b64fd5846fb)

![Screenshot 2025-05-01 185324](https://github.com/user-attachments/assets/5375a820-2385-4725-84ed-db88d6cb1db4)

![Screenshot 2025-05-01 185333](https://github.com/user-attachments/assets/b4255159-0cdc-4b6f-95eb-1b64254d9213)

![Screenshot 2025-05-01 185346](https://github.com/user-attachments/assets/1695f529-65b4-41a1-a955-55127a74ac04)

1. In the `job-board-frontend` directory, build the production files:

```bash
npm run build
```

2. The build output will be in the `dist` folder, which can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Backend

- Ensure your backend server is configured with the correct environment variables.
- Deploy the backend to a Node.js hosting platform (Heroku, Render, DigitalOcean, etc.).
- Make sure the MongoDB connection string points to a production database.

---

## Deployment

### Backend Deployment

- Use platforms like Heroku, Render, or your own server.
- Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) on the hosting platform.
- Deploy the backend code and start the server.

### Frontend Deployment

- Deploy the contents of the `dist` folder (after build) to static hosting platforms like Netlify, Vercel, or GitHub Pages.
- Update the frontend API base URL to point to the deployed backend server URL.

---

## Environment Variables

| Variable    | Description                      |
|-------------|---------------------------------|
| MONGO_URI   | MongoDB connection string       |
| JWT_SECRET  | Secret key for JWT authentication |
| PORT        | Port number for backend server  |

---

## Notes

- Make sure CORS is properly configured on the backend to allow requests from the frontend domain.
- Update API URLs in the frontend if backend URL changes in production.

---

## Uploading to GitHub

To upload this project to GitHub, follow these steps:

1. Initialize a git repository (if not already initialized):

```bash
git init
```

2. Add all files to the repository:

```bash
git add .
```

3. Commit the files:

```bash
git commit -m "Initial commit"
```

4. Create a new repository on GitHub (via GitHub website).

5. Add the GitHub remote URL (replace `<your-repo-url>` with your repository URL):

```bash
git remote add origin <your-repo-url>
```

6. Push the code to GitHub:

```bash
git push -u origin main
```

Make sure your default branch is `main`. If your default branch is `master`, replace `main` with `master` in the push command.

---

## License

This project is licensed under the MIT License.
