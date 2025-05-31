# YouTube Clone Frontend

## Overview

This repository contains the React-based frontend application for a YouTube-style platform. It consumes RESTful APIs provided by the backend to enable browsing, uploading, and interacting with videos. The UI follows a dark theme and is fully responsive across desktop, tablet, and mobile devices.

## Key Features

- Responsive sidebar that:
  - Expands or collapses on desktop
  - Remains collapsed (icon-only) on tablet
  - Is hidden by default on mobile and toggles via a hamburger menu
- Header with site logo, search bar, and upload button
- Home page displaying a grid of video cards showing:
  - Thumbnail
  - Title
  - Channel avatar and name
  - View count and upload timestamp
- Video player page with embedded video player, title, channel info, likes/dislikes, and comments
- Comments section supporting:
  - Display of existing comments
  - Creating new comments
  - Editing and deleting your own comments
- Search functionality to filter videos by title or keywords
- Category filtering to display videos belonging to a selected category
- Channel profile page showing:
  - Channel banner
  - Avatar, name, and description
  - Grid of videos uploaded by that channel
- Dark theme styled using Tailwind CSS

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes bundled with Node)
- Backend server (running and accessible)
- Browser for testing (e.g., Chrome or Firefox)

## Setup Instructions

1. Clone or download this repository
2. Navigate into the frontend folder named `YT_FRONTEND`
3. Create an environment file named `.env` in the `YT_FRONTEND` folder with a variable such as:
   • `VITE_API_URL` set to the base URL of the backend API (for example, <http://localhost:5000/api>)
4. Install dependencies by running the appropriate package manager command so that the Node modules directory is populated
5. Start the development server, which will launch the application in your default browser
6. To prepare a production build, run the build process to generate optimized static files

## Folder Structure (Frontend)

Within the `YT_FRONTEND` folder, you will see:

- `public/`  
  Static assets such as the main HTML file, favicon, and other media
- `src/`  
  • `assets/`: images, icons, and fonts used across components  
  • `components/`: individual React components grouped by feature (Header, Sidebar, Home, VideoCard, VideoPlayer, Profile, Comments, Auth pages, Search) each with its own CSS file  
  • `context/`: React Context providers for authentication state and video data  
  • `hooks/`: custom React hooks (for example, a hook for fetching videos)  
  • `services/`: Axios instance and functions for API calls (e.g., authService, videoService, commentService)  
  • `styles/`: global CSS and Tailwind customizations  
  • `App.jsx`: main component that sets up routing and layout  
  • `main.jsx`: entry point that renders the entire React application

## Environment Variables

In the `.env` file at the root of `YT_FRONTEND`, define:
• `VITE_API_URL`: the base URL for backend API calls (for example, <http://localhost:5000/api>)

## Running the Frontend

- Ensure the backend server is running and accessible at the URL defined in the environment variable
- From within `YT_FRONTEND`, run the start command to launch the development server
- Open your browser and navigate to the URL shown (usually <http://localhost:5173>)
- The application will automatically reload if you make changes to source files

## Building for Production

- From within `YT_FRONTEND`, run the build command to generate optimized assets
- The output will be placed into a folder named `dist` (or as configured by Vite)
- Serve the `dist` folder on any static file server or integrate it into a Node/Express server for deployment

## Contributing

Contributions are welcome! To contribute:

1. Create a branch with a descriptive name (e.g., feature/add-video-filter)
2. Make changes following the project’s conventions (no arrow functions, Tailwind CSS for styling)
3. Test your changes to ensure there are no errors in the application flow
4. Create a pull request against the main branch, describing your changes and rationale

## License

This project is licensed under the MIT License. See the LICENSE file for details.
