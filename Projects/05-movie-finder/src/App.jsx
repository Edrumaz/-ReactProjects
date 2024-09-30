import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [ error, setError ] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === ''){
      setError('Movie name cannot be empty')
      return
    }
    
    if (search.match(/^\d+$/)) {
      setError('Cannot search for movies with only numbers')
      return
    }

    if (search.length < 3) {
      setError('Movie must have at least 3 characters')
      return
    }

    setError(null)    
  }, [search])

  return { search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error} = useSearch()
  const { movies, loading, getMovies } = useMovies( {search, sort} )

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies(search)  // Pass search as a simple string, not an object
    }, 200),
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)    
  }

  const handleSort = () => {
    setSort(!sort)
  }
    
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)  
    debouncedGetMovies(newSearch)  
  }

  return (
  <div className='page'>
    <h1>Movie Finder</h1>
    
    <header>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} name='query' value={search} placeholder='Insert movie name... '/>
        <p>Sort movies by title</p>
        <input type='checkbox' onChange={handleSort} checked={sort} />
        <button type='submit'>Search</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </header>

    <main>
      {
        loading ? <p>Loading... </p> : <Movies movies = {movies} />
      }
    </main>
  </div>    
  )
}

export default App
