# Installation

Run the following command to clone the repository

```
git clone https://github.com/dhruvkumar1805/TodoTrackerApp.git
```

Go to `frontend` and `backend` directory to install packages

```
cd frontend
npm install
```

```
cd backend
npm install
```

# Configuration

Create `.env` file inside `backend` directory and copy the following code

```
MONGO_URI=Your mongodb URI
JWT_SECRET=a random secret key eg. thisisasecretkey
PORT=4000
```

Create `.env` file inside `frontend` directory and copy the following code

```
VITE_BACKEND_URL=put your backend server url like http://localhost:4000
```

# Run the App

Go to `backend` and `frontend` directory and start the server

```
cd backend
npx nodemon server
```

```
cd frontend
npm run dev
```

# Live Preview

Check live preview here [https://todo-app-mu-roan.vercel.app](https://todo-app-mu-roan.vercel.app)
