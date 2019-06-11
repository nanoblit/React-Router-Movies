import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
    };
  }

  addToSavedList = movie => {
    const { savedList } = this.state;
    const foundMovie = savedList.find(listElement => listElement.id === movie.id);
    if (!foundMovie) {
      this.setState(prevState => ({ savedList: [...prevState.savedList, movie] }));
    } else {
      this.setState(prevState => ({
        savedList: prevState.savedList.filter(listElement => listElement.id !== movie.id),
      }));
    }
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route path="/" exact component={MovieList} />
        <Route
          path="/movies/:id"
          render={props => <Movie {...props} addToSavedList={this.addToSavedList} />}
        />
      </div>
    );
  }
}
