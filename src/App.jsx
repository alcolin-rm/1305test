// src/App.jsx
import { useState } from 'react'
import { initialMovies } from './moviesData'
import FilmCard from './components/FilmCard'

function App() {
  const [movies, setMovies] = useState(initialMovies)

  const handleLike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id 
          ? { ...movie, likes: movie.likes + 1, liked: true, disliked: false }
          : movie
      )
    )
  }

  const handleDislike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id 
          ? { ...movie, dislikes: movie.dislikes + 1, disliked: true, liked: false }
          : movie
      )
    )
  }

  const handleClearStats = () => {
    setMovies(prevMovies =>
      prevMovies.map(movie => ({
        ...movie,
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false
      }))
    )
  }

  const likedMovies = movies.filter(movie => movie.liked === true)
  const dislikedMovies = movies.filter(movie => movie.disliked === true)
  const sortedMovies = [...movies].sort((a, b) => 
    (a.likes + a.dislikes) - (b.likes + b.dislikes)
  )

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <h1>Movie Catalog</h1>
        <button onClick={handleClearStats} style={{ marginBottom: '20px', padding: '10px' }}>
          clear stats
        </button>
        {sortedMovies.map(movie => (
          <FilmCard
            key={movie.id}
            title={movie.title}
            date={movie.date}
            genre={movie.genre}
            likes={movie.likes}
            dislikes={movie.dislikes}
            handleLike={() => handleLike(movie.id)}
            handleDislike={() => handleDislike(movie.id)}
          />
        ))}
      </div>
      
      <div style={{ flex: 1 }}>
        <h2>Мне понравилось ({likedMovies.length})</h2>
        {likedMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid green', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{movie.title}</h3>
            <p>Date: {movie.date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
          </div>
        ))}
        
        <h2>Мне не понравилось ({dislikedMovies.length})</h2>
        {dislikedMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid red', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{movie.title}</h3>
            <p>Date: {movie.date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App