import { useEffect, useRef, useState } from 'react'
import { fetchMovies } from './utils/fetchMovies'

function App () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  const [movies, setMovies] = useState([])
  const prevSearch = useRef('')

  const updateSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
  }

  const getMovies = async ({ search, error }) => {
    try {
      if (search === prevSearch.current || error) return

      const newMovies = await fetchMovies({ search })
      setMovies(newMovies)
      prevSearch.current = search
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search, error })
  }

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
    }

    if (search === '' && !isFirstInput.current) {
      setError('No se puede buscar una película vacia')
      return
    }

    if (search.length < 3 && !isFirstInput.current) {
      setError('No se puede buscar una película con 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return (
    <>
      <header>
        <h1>Buscardor de peliculas</h1>

        <section>
          <form onSubmit={handleSubmit}>
            <input value={search} onChange={updateSearch} type='text' placeholder='Ingresa tu película' />
            <button>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </section>

      </header>
      <main>
        <section>
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
        </section>
      </main>
    </>
  )
}

export default App
