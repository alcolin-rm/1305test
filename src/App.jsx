import { useState } from 'react'
import './App.css'

function App() {
const [likes, setLikes] = useState(0)
const [dislikes, setDislikes] = useState(0)

const [liked, setLiked] = useState(false)
const [disliked, setDisliked] = useState(false)

const titleColor = '#2c3e50'        // titleColor
const yearFontSize = '18px'          // yearFontSize
const genreFontWeight = 'bold'       // genreFontWeight
const yearBgColor = '#ecf0f1'        // yearbgcolor
const genreTextTransform = 'uppercase' // transform text 

const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginRight: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const likeButtonStyle = {
    ...buttonStyles,  
    backgroundColor: liked ? '#27ae60' : '#2ecc71',
    color: 'white',
    border: liked ? '2px solid #1e8449' : 'none'
}

const dislikeButtonStyle = {
    ...buttonStyles,  // расширяем базовые стили
    backgroundColor: disliked ? '#c0392b' : '#e74c3c',
    color: 'white',
    border: disliked ? '2px solid #922b21' : 'none'
}

const handleLike = () => {
    if (liked) {
        setLikes(likes - 1)
        setLiked(false)
    } else {
        setLikes(likes + 1)
        setLiked(true)
      
      if (disliked) {
        setDislikes(dislikes - 1)
        setDisliked(false)
      }
    }
  }

const handleDislike = () => {
    if (disliked) {
        setDislikes(dislikes - 1)
        setDisliked(false)
  } else {
        setDislikes(dislikes + 1)
        setDisliked(true)
    
    if (liked) {
        setLikes(likes - 1)
        setLiked(false)
    }
  }
}

return (
  <div className="movie-card">
    
      <h2 style={{ color: titleColor, borderBottom: '3px solid ' + titleColor }}>
          interstellar
      </h2>
    
    <div className="movie-info">
      <p style={{ 
          fontSize: yearFontSize, 
          backgroundColor: yearBgColor,
          padding: '8px',
          borderRadius: '6px',
          display: 'inline-block'
      }}>
          release year: 2014
      </p>
      
      <p style={{ 
          fontWeight: genreFontWeight, 
          textTransform: genreTextTransform,
          color: '#3498db',
          marginTop: '15px'
      }}>
          genre: scifi
      </p>
    </div>

    {/* stats */}
    <div className="stats">
        <p style={{ color: '#27ae60', fontSize: '18px' }}>
            likes: {likes}
        </p>
        <p style={{ color: '#e74c3c', fontSize: '18px' }}>
            dislikes: {dislikes}
        </p>
    </div>
    

    <div className="button-group">
        <button 
            className="actionButton"
            style={likeButtonStyle}
            onClick={handleLike}
      >
            {liked ? 'like' : 'like'}
          </button>
          
          <button 
              className="actionButton"
              style={dislikeButtonStyle}
              onClick={handleDislike}
          >
              {disliked ? 'disliked' : 'disliked'}
          </button>
      </div>
  </div>
)
}

export default App