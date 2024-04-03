const API_KEY = '68e11670'

export const fetchMovies = async ({ search }) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const data = await response.json()

    const movies = data.Response ? data.Search : []

    return movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
      year: movie.Year,
      type: movie.Type
    }))
  } catch (error) {
    throw new Error('Error al solicitar las películas')
  }
}
