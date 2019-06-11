import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = props => {
  const [movie, setMovie] = useState(null);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useState(() => {
    const { id } = props.match.params;
    console.log(id);
    fetchMovie(id);
  }, []);

  // Uncomment this code when you're ready for the stretch problems
  // componentWillReceiveProps(newProps){
  //   if(this.props.match.params.id !== newProps.match.params.id){
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  // saveMovie = () => {
  //   const addToSavedList = this.props.addToSavedList;
  //   addToSavedList(this.state.movie)
  // }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const {
    title, director, metascore, stars,
  } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div onClick={() => props.addToSavedList(movie)} className="save-button">
        Save
      </div>
    </div>
  );
};

export default Movie;
