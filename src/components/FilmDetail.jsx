import { useParams, Link } from 'react-router-dom'

function FilmDetail({ movies }) {
  const { id } = useParams()
  const movie = movies.find(m => m.id === parseInt(id))

  if (!movie) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Film not found</h2>
        <Link to="/">Back to catalog</Link>
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '40px auto', 
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
        ← Back to catalog
      </Link>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flexShrink: 0 }}>
          <img 
            src={`/posters/${movie.poster}`} 
            alt={movie.title} 
            style={{ 
              width: '300px', 
              height: '450px', 
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={(e) => {
              e.target.src = '/posters/placeholder.png'
            }}
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0, color: '#333' }}>{movie.title}</h1>
          
          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '8px 0', fontSize: '16px' }}>
              <strong>Year:</strong> {movie.date}
            </p>
            <p style={{ margin: '8px 0', fontSize: '16px' }}>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p style={{ margin: '8px 0', fontSize: '16px' }}>
              <strong>Likes:</strong> {movie.likes}
            </p>
            <p style={{ margin: '8px 0', fontSize: '16px' }}>
              <strong>Dislikes:</strong> {movie.dislikes}
            </p>
          </div>
          
          <div style={{ 
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px'
          }}>
            <h3>Statistics</h3>
            <p>Total reactions: {movie.likes + movie.dislikes}</p>
            <p>Rating: {movie.likes + movie.dislikes > 0 
              ? Math.round((movie.likes / (movie.likes + movie.dislikes)) * 100) 
              : 0}% positive</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilmDetail