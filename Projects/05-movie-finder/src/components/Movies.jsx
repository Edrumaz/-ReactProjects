function ListOfMovies({movies}) {
    return (
        <ul className="movies">
        {
            movies.map(movie => (
                <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.image} alt={movie.title}/>
                </li>
            ))
        }
        </ul>
    )
}

const NoMoviesFound = () => 
{
    return (
        <p>No movies found!</p>
    )
}

export function Movies({movies}){
    const hasMovies = movies?.length > 0

    return (
        hasMovies 
        ? <ListOfMovies movies = {movies} />
        : <NoMoviesFound />
    )
}