import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {


  // adding the URL in a variable
  const url = "https://movies-backend1-ma.herokuapp.com";
  // creating a state to hold the list of movies
  const [movies, setMovies] = React.useState([]);

  // Empty Movie - For the Create Form
  const emptyMovie = {
  name: "",
  img: "",
  description: ""
  }
  //SELECTED Movie STATE. this state is to creat the update component on our page. we first creat the state. 
  const [selectedMovie, setSelectedMovie] = React.useState(emptyMovie);

  // git list of the movie function
  const getMovies = () => {
  // make a get request to this url
  fetch(url + "/movies/")
  // use .then to take action when the response comes in. the function takes the response and 
  // convert data into json object
    .then((response) => response.json())
    // use the data from response
    .then((data) => {
      setMovies(data);
    });
  };

  // handleCreat - function for when the creat form is submitted. doing this step after we creat the emptyPlace const above ^
  // after creating the below functions we need to pass it to our create rout down below. and update it.
  const handleCreate = (newMovie) => {
    fetch(url + "/movies/", {
      method: "POST",
      headers: {
      // content type of the body is json. so have to add below header
      "Content-Type":"application/json"
      },
     body: JSON.stringify(newMovie)
    })
    .then(() => getMovies())
  }

  // handleUpdate - function for when the edit form is submitted. we do this after the update state we created above under the creat state. making the Put requestion and updating the list of the movies. 
  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (movie) => {
    fetch(url + "/movies/" + movie._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(movie)
    })
    .then(() => getMovies())
  }

    // select funtion to specify which movie we are updated.
  const selectMovie = (movie) => {
      setSelectedMovie(movie)
  }
    
    // deletemovie to delete inidividual movies. we define it here and then create the props down in the return in display router and then pass it to display.js and creat the button. 
  const deleteMovie = (movie) => {
    fetch(url + "/movies/" + movie._id, {
      method: "delete"
    })
    .then(() => {
      // after deleting a movoie from the list, return the movie lists
      getMovies()
    })
  }
  // useEffect, to get the data right away after components loads
  React.useEffect(() => getMovies(), []);

  return (
    <div className="App">
    <h1>Favorite Movies App</h1>
    <hr />
    {/* we are adding the the add movie button to make handlesubmit works. */}
    <Link to="/create">
      <button><b>ADD A MOVIE</b></button>
    </Link>
    <main>
      <Switch>
        {/* creating the movie props so we can pass it down to the child component which is the display.js */}
        <Route
          exact
          path="/"
          render={(rp) => (
            <Display 
            {...rp} 
            movies={movies} 
            selectMovie={selectMovie}
            deleteMovie={deleteMovie} 
            />
          )}
        />
        <Route
          exact
          path="/create"
          render={(rp) => (
            <Form {...rp} label="create" movie={emptyMovie} handleSubmit={handleCreate} />
          )}
        />
        <Route
          exact
          path="/edit"
          render={(rp) => (
            <Form 
            {...rp} 
            label="update" 
            movie={selectedMovie} 
            handleSubmit={handleUpdate} />
          )}
        />
      </Switch>
    </main>
    </div>
  );
}

export default App;
