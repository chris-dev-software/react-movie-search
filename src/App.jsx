import { useEffect, useRef, useState } from 'react'
import { fetchMovies } from './utils/fetchMovies'
import { Movies } from './components/Movies'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  const updateSearch = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
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

  return { search, updateSearch, error }
}

const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const prevSearch = useRef('')

  const getMovies = async ({ search, error }) => {
    try {
      if (search === prevSearch.current || error) return
      setLoading(true)
      const newMovies = await fetchMovies({ search })
      setMovies(newMovies)
      prevSearch.current = search
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { movies, getMovies, loading }
}

function App () {
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies()

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search, error })
  }

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
          {
            loading
              ? <p>Cargando</p>
              : <Movies movies={movies} />
          }

        </section>
      </main>
    </>
  )
}

export default App
