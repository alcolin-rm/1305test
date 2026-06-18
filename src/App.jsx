import { useState, useEffect } from 'react'
import { initialMovies } from './moviesData'
import FilmCard from './components/FilmCard'

function App() {
  const [movies, setMovies] = useState(initialMovies)
  const [viewedCount, setViewedCount] = useState(0)

  useEffect(() => {
    const viewedMovies = movies.filter(movie => movie.viewed === true)
    setViewedCount(viewedMovies.length)
  }, [movies])

  const handleLike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id 
          ? { 
              ...movie, 
              likes: movie.likes + 1, 
              liked: true, 
              disliked: false,
              viewed: true
            }
          : movie
      )
    )
  }

  const handleDislike = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id 
          ? { 
              ...movie, 
              dislikes: movie.dislikes + 1, 
              disliked: true, 
              liked: false,
              viewed: true
            }
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
        disliked: false,
        viewed: false
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
          Clear Statistics
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
        <h2>liked({likedMovies.length})</h2>
        {likedMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid green', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{movie.title}</h3>
            <p>Date: {movie.date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
          </div>
        ))}
        
        <h2>disliked({dislikedMovies.length})</h2>
        {dislikedMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid red', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{movie.title}</h3>
            <p>Date: {movie.date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
          </div>
        ))}
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        fontSize: '18px',
      }}>
        watched: {viewedCount}
      </div>
    </div>
  )
}

export default App