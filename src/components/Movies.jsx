export function Movies ({ movies }) {
  return (
    movies?.length > 0
      ? <ListOfMovies movies={movies} />
      : <NoMovies />
  )
}

const ListOfMovies = ({ movies }) => {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <img src={movie.image} alt={movie.Title} />
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

const NoMovies = () => {
  return (
    <p>No hay películas disponibles</p>
  )
}
