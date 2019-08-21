import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import MovieCard from './MovieCard'
import Search from '../Search/search';
import { APPEND_MOVIES } from '../../constants';
import Pagination from '../Pagination';

const mapStateToProps = (state) => ({
    movies: state.movies,
    currentPage: state.currentPage,
    moviesPerPage: state.moviesPerPage,
    searchQuery:state.searchQuery,
    totalResults:state.totalResults,
})

const ConnectedMovieList = (props) => {

    let currentMovies = []
    let requestPage = (props.currentPage / props.moviesPerPage) + 1
    let indexOfLastMovie = props.currentPage * props.moviesPerPage;
    let indexOfFirstMovie = indexOfLastMovie - props.moviesPerPage;
    let maxPages = Math.ceil(props.totalResults / props.moviesPerPage)
    useEffect(() => {
        maxPages = Math.ceil(props.totalResults / props.moviesPerPage)
    }, [props.totalResults])
    
    useEffect(() => {

        /* Pagination */
        if (props.movies.length > 0) {

            if(indexOfLastMovie>props.movies.length && props.currentPage< maxPages){
                requestPage = Math.ceil(props.currentPage / props.moviesPerPage) + 1
                Search(props.searchQuery, APPEND_MOVIES,Math.floor(requestPage))
            }
        }

    }, [props.currentPage,maxPages])
    


    currentMovies = props.movies.slice(indexOfFirstMovie, indexOfLastMovie);
    return (
        <section className="Filmes-lista">
            {props.movies.length > 0 ? currentMovies.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
            )) : ""}
            <Pagination />
        </section>

    )
}

const MovieList = connect(mapStateToProps)(ConnectedMovieList)

export default MovieList;