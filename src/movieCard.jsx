import './MovieCard.css'

function MovieCard({ movie, onLike, onDislike }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <div className="button-group">
        <button
          className={`like-btn ${movie.liked ? 'liked' : ''}`}
          onClick={() => onLike(movie.id)}
        >
          Like {movie.liked ? '✓' : ''}
        </button>
        <button
          className={`dislike-btn ${movie.disliked ? 'disliked' : ''}`}
          onClick={() => onDislike(movie.id)}
        >
          Dislike {movie.disliked ? '✓' : ''}
        </button>
      </div>
    </div>
  )
}

export default MovieCard