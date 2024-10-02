```
X   X DDDD  IIIII RRRR
 X X  D   D   I   R   R
  X   D   D   I   RRRR
 X X  D   D   I   R R
X   X DDDD  IIIII R  R
```
Setup Guide
=====================
This guide will walk you through the process of setting up Xdir

## Prerequisites

* Node.js 20.x
* npm (comes bundled with Node.js)

## Setup

1. Clone the repository: `git clone https://github.com/XIMDEX/xdir-front-v2`
2. Navigate to the project directory: `xdir-front-v2`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:3000` (or the port specified in your `vite.config.js` file)

## Building for Production

1. Run the build command: `npm run build`
2. The built application will be available in the `dist` directory

## Scripts

* `dev`: Starts the development server
* `build`: Builds the application for production
* `lint`: Runs ESLint on the project
* `preview`: Previews the built application

## Dependencies

* `@vitejs/plugin-react-swc`: Uses SWC for Fast Refresh
* `react`: The React library
* `react-dom`: The React DOM library
* `vite`: The Vite development server

## Notes

* Make sure to update the `node` version in your `package.json` file to match the version you're using.
* If you encounter any issues, try deleting the `node_modules` directory and running `npm install` again.

# .env

## Environment Variables

#### VITE_APP_API_BASE_URL
Where our api will be hosted

#### VITE_APP_ENVIRONMENT
We can choose between "pro" and "pre"

#### VITE_APP_CLIENT
Client name

#### VITE_APP_TOOL
The hash of our tool


