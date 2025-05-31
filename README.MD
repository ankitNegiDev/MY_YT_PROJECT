# YouTube Clone (Frontend & Backend)

## Overview

This repository contains both the frontend and backend code for a YouTube-style application. The backend (Express + MongoDB) serves RESTful APIs for user authentication, video management, and comments. The frontend (React + Vite + Tailwind CSS) consumes those APIs to provide a dark-themed, responsive user interface where users can browse, upload, and interact with videos.

---

## `Project Demo video`

- [Project demo video link](https://drive.google.com/file/d/1JsrwvqJHxpgWnUDfttcl1GvrLBLeWO1N/view)

---

## Table of contents

- [YouTube Clone (Frontend \& Backend)](#youtube-clone-frontend--backend)
  - [Overview](#overview)
  - [`Project Demo video`](#project-demo-video)
  - [Table of contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Technology Stack](#technology-stack)
  - [Folder Structure](#folder-structure)
  - [Backend Setup](#backend-setup)
    - [Environment Variables](#environment-variables)
    - [Installation](#installation)
    - [Running the Server](#running-the-server)
    - [API Overview](#api-overview)
  - [Frontend Setup](#frontend-setup)
    - [Installation of Frontend code](#installation-of-frontend-code)
    - [Running the Client](#running-the-client)
    - [Building for Production](#building-for-production)
  - [Usage \& Functionality](#usage--functionality)
    - [User Registration \& Login](#user-registration--login)
    - [Video Upload \& Management](#video-upload--management)
    - [Comment \& Reaction System](#comment--reaction-system)
    - [Search \& Category Filtering](#search--category-filtering)
    - [Channel Profile Pages](#channel-profile-pages)
  - [Development Notes \& Conventions](#development-notes--conventions)
  - [Contributing](#contributing)
  - [License](#license)

---

## Key Features

- **User Authentication**  
  - Register, login, and logout with JWT tokens  
  - Protected routes for uploading/editing/deleting videos and comments  

- **Video Management**  
  - Upload videos with title, description, category, and URL  
  - View all videos on the home page in a responsive grid  
  - Edit and delete your own videos  

- **Comments & Reactions**  
  - Create, edit, and delete comments on videos  
  - Like or dislike videos and comments  

- **Search & Category Filtering**  
  - Search bar to filter videos by keywords  
  - Sidebar or category list to filter by category  

- **Channel Profile Pages**  
  - Displays channel banner, avatar, name, and description  
  - Shows all videos uploaded by the channel  

- **Responsive Dark Theme** (Frontend)  
  - Dark background, light text, and subtle hover accents  
  - CSS layouts for desktop, tablet, and mobile devices  
  - Sidebar behavior: expanded on desktop, collapsed on tablet, hidden on mobile

---

## Technology Stack

- **Backend**  
  - Node.js with Express  
  - MongoDB (via Mongoose)  
  - JWT for authentication  
  - Bcrypt for password hashing  
  - CORS and other middleware  

- **Frontend**  
  - React (scaffolded with Vite)  
  - Tailwind CSS, custom css for styling  
  - React Router for client-side routing  
  - Axios for API requests  
  - Context API for global state management  

---

## Folder Structure

```planeText
root/
├── bug.js
├── projectThinking.md
├── README.md            # contains info about whole project
├── YT_BACKEND/          # Backend codebase
│   ├── .env             # Environment variables (not committed)
│   ├── package.json
│   ├── src/
│   │   ├── server.js
│   │   ├── schema or modals/      # Mongoose schemas: User.js, Video.js, Comment.js , Channel.js
│   │   ├── routes/      # authRoutes.js, videoRoutes.js, commentRoutes.js , userRoutes , channelRoutes etc.
│   │   ├── controllers/ # authController.js, videoController.js, commentController.js ,channelControllers
│   │   ├── services/    # authService.js, videoService.js, commentService.js , channelService
│   │   ├── middleware/  # authMiddleware.js, errorHandlers
│   │   └── utils/       # Helper functions
│   └── NOTES/           # Additional notes or test files
│
└── YT_FRONTEND/         # Frontend codebase
    ├── .env             # Environment variables (not committed)
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── public/          # Favicon, static assets
    └── src/
        ├── assets/      # Icons, images
        ├── components/  # React components (Header, Sidebar, Home, VideoCard, VideoPlayer, Profile, Comments, Auth, Search)
        ├── context/     # AuthContext.js, SideContext.js
        ├── utils/    # axiosInstance.js, authService.js
        ├── styles/      # Global CSS, Tailwind overrides
        ├── App.jsx      # Main application (routes & layout)
        └── main.jsx     # React entry point
```

---

## Backend Setup

### Environment Variables

Create a `.env` file inside `YT_BACKEND` with:

- `PORT`: port number for the Express server (e.g., 5000)  
- `MONGO_URI`: MongoDB connection string (e.g., an Atlas URI)  
- `JWT_SECRET`: secret key for signing JWTs  
- `JWT_EXPIRES_IN`: (optional) token expiration time (e.g., '7d')

### Installation

1. Navigate to `YT_BACKEND`  
2. Install backend dependencies by running the install command provided  

### Running the Server

- Start the server by running the start command provided  
- Expect console logs confirming a successful connection to MongoDB and that the server is listening on the specified port  

### API Overview

- **Auth Endpoints**  
  • `POST /api/user/signup` – register new user  
  • `POST /api/auth/login` – login and receive JWT  
- **Video Endpoints**  
  • `POST /api/video` – upload new video (protected)  
  • `GET /api/video` – fetch all videos  
  • `GET /api/video/:id` – fetch a specific video by ID  
  • `PUT /api/video/:id` – update own video (protected)  
  • `DELETE /api/video/:id` – delete own video (protected)  
- **Comment Endpoints**  
  • `POST /api/comments/:videoId` – add comment to a video (protected)  
  • `GET /api/comments/:videoId` – fetch all comments for a video  
  • `PUT /api/comments/:commentId` – edit own comment (protected)  
  • `DELETE /api/comments/:commentId` – delete own comment (protected)  
- **Like/Dislike Endpoints**  
  • `PUT /api/videos/:id/like` or `/api/videos/:id/dislike` – like/dislike a video (protected)  
  • `PUT /api/comments/:id/like` or `/api/comments/:id/dislike` – like/dislike a comment (protected)

---

## Frontend Setup

### Installation of Frontend code

1. Navigate to `YT_FRONTEND`  
2. Install frontend dependencies using the install command provided  

### Running the Client

- Start the development server by running the dev command provided  
- The application will open in your browser at a local port (for example, <http://localhost:5173>)  

### Building for Production

- From within `YT_FRONTEND`, run the build command provided to generate optimized static assets  
- Serve the generated `dist` folder on any static file server or integrate with a Node/Express server

---

## Usage & Functionality

### User Registration & Login

- Visit the Register page to sign up with a username, email, and password  
- Visit the Login page to authenticate and receive a JWT token stored in local storage  
- Protected features (video upload, edit, delete, comment) require a valid JWT

### Video Upload & Management

- Once logged in and have channel then only user will have access to the Upload page to submit:
  - Video title
  - Description
  - Video URL
  - Category
- Successfully uploaded videos appear on the Home and Profile pages  
- Edit or delete own videos via controls on the video’s detail page

### Comment & Reaction System

- On each Video Player page, scroll down to see existing comments  
- Add a new comment by typing into the comment form  
- Edit or delete your own comments using the action buttons that appear on hover  
- Like or dislike a video or comment by clicking the respective icons (counts update dynamically)

### Search & Category Filtering

- Use the search bar in the header to filter videos in real time by title or keyword  
- Click on a category in the sidebar (or category list) to view videos belonging to that category

### Channel Profile Pages

- Click a channel avatar or name on any video card to navigate to that channel’s Profile page  
- The Profile page displays the channel banner, avatar, name, description, and a grid of all videos uploaded by that channel

---

## Development Notes & Conventions

- **No Arrow Functions** in component definitions or service functions – use standard function declarations  
- **Tailwind CSS** for styling in the frontend; each component has its own CSS file with atomic classes  
- **Context API** for shared state:  
  - `AuthContext` for user authentication state and token management  
  - `SideContext` for video list, search query, and category filter  
- **Axios** configured with an interceptor to automatically attach the JWT token from local storage no need to send token every time in header.
- **Environment Variables**:  
  - Backend uses variables beginning with `MONGO_URI`, `JWT_SECRET`  
  - Frontend uses `VITE_API_URL`

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository  
2. Create a branch describing your changes (for example, `fix/comment-pagination` or `feature/add-dark-mode-toggle`)  
3. Follow existing conventions (modular controllers in the backend, Tailwind and no arrow functions in the frontend)  
4. Test your changes thoroughly  
5. Open a pull request with a clear description of what you changed and why
6. Anyone want to contribute -- fix the layout of project especially sidebar and header and how other page will have behave acc to it.

---

## License

This project is licensed under the ISC License. Please see the LICENSE file for full details.
