const express = require('express');
const movies = require('./movies.json');
const app = require('express')();

//const { uniqueId } = require("lodash");

//Other middleware
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

//cookieParser
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())


//root
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
    let title =req.body.title;
    let runtime =req.body.runtime;
    let release_year =req.body.release_year;
    let director =req.body.director;
    let id = movies.length+1;
    let newMovie = { id, title, runtime, release_year, director};
    movies.push(newMovie)
    res.json(movies)   
})


//delete a movie
 app.delete('/movies/:movieId', (req, res) => {
    const id = parseInt(req.params.movieId,10);
    const movie = movies.find(movie => movie.id === id);
    console.log('id is:', id)
    console.log('movie is:', movie)
    if (movie) {
      movies.splice(movies.indexOf(movie), 1);
    }else {
       res.status(404).send('Movie not found');
     }
    res.send(movies);
  });


//  //todo: Return an array containing the cookies from the request. - hint: Object.entries may come in handy.
// app.get('/api/cookies', (request, response) => {
//     let cookies = Object.entries(request.cookies);
//     console.log(cookies)
//     response.json(cookies)
// });

// //todo: Create a cookie with a random value.
// app.post('/api/cookies/random', (request, response) => {
//     let randomValue = `totally random: ${Math.random()}`
//     response.cookie('random', randomValue);
//     response.end();
// });


const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);



