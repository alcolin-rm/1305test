import { useState } from 'react'
import { initialMovies } from './moviesData'

function MovieCard({ movie, onLike, onDislike }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{movie.title} ({movie.year})</h3>
      <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
      <button onClick={() => onLike(movie.id)}>Like</button>
      <button onClick={() => onDislike(movie.id)}>Dislike</button>
    </div>
  )
}

function App() {
  const [movies, setMovies] = useState(initialMovies)

  const handleLike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id ? { ...movie, likes: movie.likes + 1 } : movie
      )
    )
  }

  const handleDislike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id ? { ...movie, dislikes: movie.dislikes + 1 } : movie
      )
    )
  }

  const sortedMovies = [...movies].sort((a, b) => 
    (a.likes + a.dislikes) - (b.likes + b.dislikes)
  )

  return (
    <div>
      <h1>Movie Catalog</h1>
      {sortedMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      ))}
    </div>
  )
}

export default App