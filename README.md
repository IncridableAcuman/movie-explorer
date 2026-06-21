# 🎬 Movie Explorer

A full-stack movie discovery platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can browse trending movies, search for films, view detailed movie information, watch trailers, and manage their favorite movies.

## ✨ Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Refresh Token Support
* Protected Routes
* Secure Password Hashing with bcrypt

### Movies

* Browse Popular Movies
* Browse Top Rated Movies
* Browse Upcoming Movies
* Search Movies
* Movie Details Page
* Movie Trailers
* Movie Recommendations

### User Features

* Add Movies to Favorites
* Remove Movies from Favorites
* View Favorite Movies
* User Profile Management

### API Integration

* TMDB (The Movie Database) API
* Real-time Movie Data
* Movie Posters & Backdrops
* Movie Videos & Trailers

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Axios
* Tailwind CSS
* React Query

### Backend

* Node.js
* Express.js
* JWT
* bcrypt
* Mongoose

### Database

* MongoDB

### External Services

* TMDB API

---

## 📁 Project Structure

```bash
movie-explorer/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── dto/
│   ├── models/
│   ├── validations/
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── store/
│   │   └── layouts/
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/IncridableAcuman/movie-explorer.git

cd movie-explorer
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=8080

MONGO_URI=your_mongodb_connection

JWT_ACCESS=your_access_secret

JWT_REFRESH=your_refresh_secret

API_URL=https://api.themoviedb.org/3

API_KEY=your_tmdb_api_key
```

Start Backend Server

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

Start Frontend

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/v1/auth/register |
| POST   | /api/v1/auth/login    |
| POST   | /api/v1/auth/logout   |
| GET    | /api/v1/auth/refresh  |

### Movies

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| GET    | /api/v1/movies?category=popular        |
| GET    | /api/v1/movies/search?query=movie_name |
| GET    | /api/v1/movies/details/:id             |
| GET    | /api/v1/movies/videos/:id              |

### Favorites

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | /api/v1/favorites          |
| POST   | /api/v1/favorites/:movieId |
| DELETE | /api/v1/favorites/:movieId |

---

## 🔒 Security

* JWT Access Token
* JWT Refresh Token
* Password Hashing (bcrypt)
* Protected Routes
* HTTP Only Cookies
* Request Validation

---

## 📸 Screenshots

Add screenshots here:

```md
![Home](./screenshots/home.png)

![Movie Details](./screenshots/details.png)

![Favorites](./screenshots/favorites.png)
```

---

## 📈 Future Improvements

* Movie Reviews
* Ratings System
* Watchlist
* Google Authentication
* GitHub Authentication
* Multi-language Support
* Dark / Light Theme
* Admin Dashboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Izzat Abdusharipov**

GitHub: https://github.com/IncridableAcuman
