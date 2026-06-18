function FilmCard({ title, date, genre, likes, dislikes, handleLike, handleDislike }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>Genre: {genre}</p>
      <p>Likes: {likes} | Dislikes: {dislikes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  )
}

export default FilmCard