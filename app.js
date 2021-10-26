const express = require('express');
//const cors =require('cors');
const movies = require('./movies.json');
const app = require('express')();
//const { uniqueId } = require("lodash");


//Other middleware
const morgan = require('morgan');
app.use(morgan('dev'));

//app.use(cors);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.status(200).send('Come Checkout our Movies');
    res.end();

});

//all movies and movies by title
app.get('/movies', (req, res) => {
    
    console.log('Here are all our movies to choose from!')
    let title = req.query.title;
    let selectedMovie = movies.find(movie => movie.title === title);
    if(title){
        if(typeof title === "string"){ 
            if(selectedMovie){
                res.status(200).send(selectedMovie)
            } else {
                res.status(404).send("Your query string returned no results").end()
            }

            }else{
                res.status(400).send("Invalid titleQuery supplied")
            }
            
            }else{
                res.status(200).send(movies);
    }
 });


  //get by movie ID
app.get('/movies/:moviesId', (req, res) => {
    let id = parseInt(req.params.moviesId, 10);
    console.log(id);
    let movie;
    if (Number.isNaN(id)) {
      res.status(400).send("Invalid ID supplied").end()
    }
    if (req.params.moviesId) {
      movie= movies.find(movie => movie.id === id)
    }
    if (movie) {
      res.status(200).json(movie)
    } else {
      res.status(404).send("Movie ID not found").end()
    }
});

 //add movie to the list
 app.post('/movies', (req,res)=>{
    // let {title, runtime, release_year, director} =req.body;

    // let newMovie = {title, runtime, release_year, director};
    // console.log('newMovie is:', newMovie);
   
    // const newId = uniqueId();
    // console.log('newId is', newId);
    // newMovie.id = newId;
    // movies.push(newMovie);
    // res.status(200).send(movies)
    let title =req.body.title;
    let runtime =req.body.runtime;
    let release_year =req.body.release_year;
    let director =req.body.director;
    let newId = movies.length+1;

    let newMovie = { newId, title, runtime, release_year, director};
    movies.push(newMovie)
    res.json(newMovie)

        
 })

// {
//     "id": 4,
//     "title": "Richy Rich",
//     "runtime": 96,
//     "release_year": 1994,
//     "director": "Donald Petrie"
// }

//delete a movie
// app.delete('/movies/{id}, (req, res) => {
//     res.send("Movie has been deleted.")
// })


const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);



