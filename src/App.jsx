import { useState, useEffect } from 'react'
import { useSearchParams, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { initialMovies } from './moviesData'
import FilmCard from './components/FilmCard'
import FilmDetail from './components/FilmDetail'
import classNames from 'classnames'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [viewedCount, setViewedCount] = useState(0)

  const [filters, setFilters] = useState({
    title: searchParams.get('search') || '',
    yearFrom: searchParams.get('date_from') || '',
    yearTo: searchParams.get('date_to') || '',
    genre: searchParams.get('genre') || ''
  })

  useEffect(() => {
    setMovies(initialMovies)
    setFilteredMovies(initialMovies)
  }, [])

  useEffect(() => {
    const viewedMovies = movies.filter(movie => movie.viewed === true)
    setViewedCount(viewedMovies.length)
  }, [movies])

  useEffect(() => {
    const filtered = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(filters.title.toLowerCase())
      const yearMatch = 
        (filters.yearFrom === '' || Number(movie.date) >= Number(filters.yearFrom)) &&
        (filters.yearTo === '' || Number(movie.date) <= Number(filters.yearTo))
      const genreMatch = filters.genre === '' || movie.genre === filters.genre
      return titleMatch && yearMatch && genreMatch
    })
    setFilteredMovies(filtered)
  }, [movies, filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))

    const newParams = new URLSearchParams(searchParams)
    if (value) {
      const paramMap = {
        title: 'search',
        yearFrom: 'date_from',
        yearTo: 'date_to',
        genre: 'genre'
      }
      newParams.set(paramMap[name], value)
    } else {
      const paramMap = {
        title: 'search',
        yearFrom: 'date_from',
        yearTo: 'date_to',
        genre: 'genre'
      }
      newParams.delete(paramMap[name])
    }
    setSearchParams(newParams)
  }

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
  const sortedMovies = [...filteredMovies].sort((a, b) => 
    (a.likes + a.dislikes) - (b.likes + b.dislikes)
  )

  const genres = [...new Set(movies.map(movie => movie.genre))]

  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <div className="app-column app-column--main">
            <h1 className="app-title">Movie Catalog</h1>
            
            <div className="filters">
              <h3>Filters</h3>
              <div className="filters__group">
                <input
                  type="text"
                  name="title"
                  placeholder="Search by title..."
                  value={filters.title}
                  onChange={handleFilterChange}
                  className="filters__input"
                />
                <input
                  type="number"
                  name="yearFrom"
                  placeholder="Year from"
                  value={filters.yearFrom}
                  onChange={handleFilterChange}
                  className="filters__input"
                />
                <input
                  type="number"
                  name="yearTo"
                  placeholder="Year to"
                  value={filters.yearTo}
                  onChange={handleFilterChange}
                  className="filters__input"
                />
                <select
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="filters__select"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <button 
                  onClick={() => {
                    setFilters({ title: '', yearFrom: '', yearTo: '', genre: '' })
                    setSearchParams({})
                  }}
                  className="button button--clear"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <button 
              onClick={handleClearStats} 
              className="button button--primary"
            >
              Clear Statistics
            </button>
            
            {sortedMovies.map(movie => (
              <Link 
                to={`/film/${movie.id}`} 
                key={movie.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <FilmCard
                  title={movie.title}
                  date={movie.date}
                  genre={movie.genre}
                  likes={movie.likes}
                  dislikes={movie.dislikes}
                  poster={movie.poster}
                  handleLike={() => handleLike(movie.id)}
                  handleDislike={() => handleDislike(movie.id)}
                />
              </Link>
            ))}
          </div>
          
          <div className="app-column app-column--side">
            <div className="section section--liked">
              <h2>Liked ({likedMovies.length})</h2>
              {likedMovies.map(movie => (
                <div key={movie.id} className="movie-mini-card movie-mini-card--liked">
                  <div>
                    <h4>{movie.title}</h4>
                    <p>{movie.date} • {movie.genre}</p>
                    <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="section section--disliked">
              <h2>Disliked ({dislikedMovies.length})</h2>
              {dislikedMovies.map(movie => (
                <div key={movie.id} className="movie-mini-card movie-mini-card--disliked">
                  <div>
                    <h4>{movie.title}</h4>
                    <p>{movie.date} • {movie.genre}</p>
                    <p>Likes: {movie.likes} | Dislikes: {movie.dislikes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="viewed-counter">
            Viewed: {viewedCount}
          </div>
        </div>
      } />
      <Route path="/film/:id" element={<FilmDetail movies={movies} />} />
    </Routes>
  )
}

export default App