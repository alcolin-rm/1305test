import { useState } from 'react'
import moviesData from './moviesData'
import MovieCard from './movieCard'
import './App.css'

function App() {
  const [movies, setMovies] = useState(moviesData)
  const [likedMovie, setLikedMovie] = useState(null)

  const handleLike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie => {
        if (movie.id === id) {
          const newLikeStatus = movie.liked === true ? false : true
          return {
            ...movie,
            liked: newLikeStatus,
            disliked: newLikeStatus ? false : movie.disliked
          }
        }
        return movie
      })
    )
    
    const movie = movies.find(m => m.id === id)
    if (!movie.liked) {
      setLikedMovie(movie.title)
    } else {
      setLikedMovie(null)
    }
  }

  const handleDislike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie => {
        if (movie.id === id) {
          const newDislikeStatus = movie.disliked === true ? false : true
          return {
            ...movie,
            disliked: newDislikeStatus,
            liked: newDislikeStatus ? false : movie.liked
          }
        }
        return movie
      })
    )
    
    if (likedMovie === movies.find(m => m.id === id)?.title) {
      setLikedMovie(null)
    }
  }

  return (
    <div className="app">
      <h1>Movie Catalog</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
      {likedMovie && (
        <div className="liked-panel">
          {likedMovie}
        </div>
      )}
    </div>
  )
}

export default App