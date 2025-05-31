# YouTube Clone Backend

## Overview

This repository contains the Express.js backend for a YouTube-style application. It uses MongoDB for data storage and provides RESTful APIs for user authentication, video management, comments, and likes/dislikes. JSON Web Tokens (JWT) are used for stateless authentication, and the application follows a modular folder structure for clean separation of concerns.

## Key Features

- User registration and login with password hashing
- JWT-based authentication and authorization for protected routes
- CRUD operations for videos, including:
  - Creating new video entries (title, description, video URL, category)
  - Fetching all videos or a single video by ID
  - Updating and deleting videos only by their owners
- CRUD operations for comments on videos:
  - Creating new comments
  - Fetching all comments for a video
  - Editing and deleting your own comments
- Like and dislike functionality for both videos and comments
- Separate controllers, services, and models for clean code organization
- Mongoose schemas for User, Video, and Comment entities

## Prerequisites

- Node.js (version 14 or higher)
- npm (bundled with Node) or yarn
- A MongoDB database (Atlas or local) with a connection string
- Postman or similar API testing tool (optional)

## Setup Instructions

1. Navigate into the `YT_BACKEND` folder within the project
2. Create an environment file named `.env` in `YT_BACKEND` with the following variables:
   • `PORT` set to the port number the server will listen on (for example, 5000)  
   • `MONGO_URI` set to your MongoDB connection string  
   • `JWT_SECRET` set to a strong secret for signing JSON Web Tokens  
   • `JWT_EXPIRES_IN` optionally set to token lifetime (for example, '7d')
3. Install dependencies by running the package manager’s install command
4. Ensure your MongoDB database is accessible using the provided connection string
5. Start the server with the start command
6. The server will log messages confirming successful connection to MongoDB and listening on the defined port

## Folder Structure (Backend)

Within the `YT_BACKEND` folder, you will find:

- `.env`: environment variables (not committed to version control)
- `package.json`: dependencies and scripts (express, mongoose, bcrypt, jsonwebtoken, cors, etc.)
- `src/`:
  • `server.js`: entry point that sets up Express, middleware, and routes  
  • `models/`: Mongoose schemas for `User.js`, `Video.js`, and `Comment.js`  
  • `routes/`: RESTful routes for authentication (`authRoutes.js`), videos (`videoRoutes.js`), and comments (`commentRoutes.js`)  
  • `controllers/`: handler functions for each route (e.g., `authController.js`, `videoController.js`, `commentController.js`)  
  • `services/`: business logic that the controllers call (e.g., user registration logic, video ownership validation, comment creation logic)  
  • `middleware/`: authentication middleware that verifies JWTs and attaches `req.user`, error-handling middleware  
  • `utils/`: helper functions such as generating time-ago strings
- `NOTES/`: optional folder for additional notes or test scripts

## Environment Variables

In the `.env` file at the root of `YT_BACKEND`, define:
• `PORT`: e.g., 5000  
• `MONGO_URI`: your MongoDB connection string (for example, mongodb+srv://username:password@cluster.mongodb.net/myDB)  
• `JWT_SECRET`: a strong secret to sign JWT tokens  
• `JWT_EXPIRES_IN`: optional token expiration (e.g., '1d', '7d')

## Running the Backend

- From within the `YT_BACKEND` folder, run the start command  
- You will see logs confirming “Connected to MongoDB” and “Server is running on port <PORT>”  
- Use a tool like Postman or your frontend application to test the various API endpoints:
  - Authentication: register, login, logout  
  - Videos: create, read, update, delete  
  - Comments: add, fetch, edit, delete  

## API Endpoints (Summary)

- **Auth**  
  • POST `/api/auth/register` – create a new user  
  • POST `/api/auth/login` – authenticate and receive a JWT  
- **Videos**  
  • POST `/api/videos` – upload a new video (requires JWT)  
  • GET `/api/videos` – fetch all videos (public)  
  • GET `/api/videos/:id` – fetch a single video by its ID  
  • PUT `/api/videos/:id` – update a video (only owner, requires JWT)  
  • DELETE `/api/videos/:id` – delete a video (only owner, requires JWT)  
- **Comments**  
  • POST `/api/comments/:videoId` – add a comment to a video (requires JWT)  
  • GET `/api/comments/:videoId` – fetch all comments for a video  
  • PUT `/api/comments/:commentId` – edit a comment (only author, requires JWT)  
  • DELETE `/api/comments/:commentId` – delete a comment (only author, requires JWT)  
- **Likes/Dislikes**  
  • PUT `/api/videos/:id/like` or `/api/videos/:id/dislike` – like or dislike a video (requires JWT)  
  • PUT `/api/comments/:id/like` or `/api/comments/:id/dislike` – like or dislike a comment (requires JWT)

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository  
2. Create a new branch for your feature or bugfix (for example, `feature/add-user-profile`)  
3. Make changes in accordance with the project’s coding style (modular controllers, services, and no direct business logic in route handlers)  
4. Test your changes via Postman or a local frontend instance  
5. Submit a pull request with a clear description of your changes

## License

This project is licensed under the MIT License. Refer to the LICENSE file for details.
