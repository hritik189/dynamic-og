# Dynamic OG Image Generator

This project consists of a client-server application for generating dynamic Open Graph (OG) images based on user input. It allows users to create posts with titles, content, and images, and generates shareable OG images for social media platforms.

## Project Structure

The project is divided into two main parts:

1. **Server (dyamnic-og-server)**
   - Handles the OG image generation
   - Built with Express.js
   - Uses Sharp for image processing

2. **Client (dyamnic-og-client)**
   - User interface for creating posts and previewing OG images
   - Built with React and Vite
   - Uses Axios for API requests
   - Styled with Tailwind CSS

## Server (dyamnic-og-server)

### Dependencies
- Express.js (v4.19.2)
- CORS (v2.8.5)
- Sharp (v0.33.4)

### Main Functionality
- Exposes an endpoint for generating OG images
- Processes user input to create customized images
- Serves generated images statically

### Scripts
- `npm start`: Runs the server using Node.js

## Client (dyamnic-og-client)

### Dependencies
- React (v18.3.1)
- React DOM (v18.3.1)
- Axios (v1.7.3)
- Tailwind CSS (v3.4.7)

### Dev Dependencies
- Vite (v5.3.4)
- ESLint (v8.57.0)
- Various React and Vite plugins

### Main Functionality
- Provides a user interface for creating posts
- Allows users to input titles, content, and images
- Sends requests to the server for OG image generation
- Previews generated OG images
- Offers sharing functionality (where supported)

### Scripts
- `npm run dev`: Starts the development server

## Setup and Installation

1. Clone the repository
2. Navigate to the server directory and run `npm install`
3. Navigate to the client directory and run `npm install`
4. Start the server with `npm start` in the server directory
5. Start the client with `npm run dev` in the client directory

## Usage

1. Open the client application in a web browser
2. Fill in the post details (title, content, image)
3. Click "Generate OG Image" to create the Open Graph image
4. Preview the generated image
5. Use the share button to share the image (on supported browsers)

## Notes

- Ensure both the server and client are running for full functionality
- The server runs on `http://localhost:8000` by default
- The client development server typically runs on `http://localhost:5173`
- Adjust CORS settings on the server if needed for different client URLs
