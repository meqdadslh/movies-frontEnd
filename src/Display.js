import React from "react";

const Display = (props) => {
  
// destruct the movies from props
const { movies } = props

  // Returns the JSX for when you have movies
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {movies.map((movie) => (
        <article key={movie._id}>
          <img src={movie.img}/>
          <h1>{movie.name}</h1>
          <h3>{movie.description}</h3>
          {/* adding the below button after creating the edit function in our app.js file. */}
          <button onClick={() => {
            props.selectMovie(movie)
            // git history from dev tool on the server
            props.history.push("/edit")
          }}>
            edit
          </button>
          {/* after creating the delet function in our app.js we pass that as props to display.js and creat the button */}
          <button onClick={() => {
            props.deleteMovie(movie)
          }}>
            Delete
          </button>

        </article>
      ))}
    </div>
  )

 // adding the loading function for when there is no place to display

  const loading = () => <h1>Loading</h1>

  return movies.length > 0 ? loaded() : loading()
};

 



export default Display;