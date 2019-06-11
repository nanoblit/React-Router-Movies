import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = props => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    const foundMovie = savedList.find(listElement => listElement.id === movie.id);
    if (!foundMovie) {
      setSavedList([...savedList, movie]);
    } else {
      setSavedList(savedList.filter(listElement => listElement.id !== movie.id));
    }
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route path="/" exact component={MovieList} />
      <Route
        path="/movies/:id"
        render={ps => <Movie {...ps} addToSavedList={addToSavedList} />}
      />
    </div>
  );
};

export default App;
