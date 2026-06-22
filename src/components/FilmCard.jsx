import classNames from 'classnames'

function FilmCard({ title, date, genre, likes, dislikes, poster, handleLike, handleDislike }) {
  const cardClasses = classNames('film-card', {
    'film-card--sci-fi': genre === 'Sci-Fi',
    'film-card--action': genre === 'Action',
    'film-card--crime': genre === 'Crime',
    'film-card--drama': genre === 'Drama',
    'film-card--comedy': genre === 'Comedy',
    'film-card--western': genre === 'Western'
  })

  return (
    <div className={cardClasses}>
      <div className="film-card__poster-container">
        <img 
          src={`/posters/${poster}`} 
          alt={`${title} poster`} 
          className="film-card__poster"
          onError={(e) => {
            e.target.src = '/posters/placeholder.png'
          }}
        />
      </div>
      <div className="film-card__content">
        <h3 className="film-card__title">{title}</h3>
        <p className="film-card__info">Date: {date}</p>
        <p className="film-card__info">Genre: {genre}</p>
        <p className="film-card__info">Likes: {likes} | Dislikes: {dislikes}</p>
        <div className="film-card__actions">
          <button 
            className="film-card__button film-card__button--like"
            onClick={(e) => {
              e.preventDefault()
              handleLike()
            }}
          >
            Like
          </button>
          <button 
            className="film-card__button film-card__button--dislike"
            onClick={(e) => {
              e.preventDefault()
              handleDislike()
            }}
          >
            Dislike
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilmCard