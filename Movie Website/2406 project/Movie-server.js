const { lookup } = require('dns');
const e = require('express');
const express = require('express');

var users = [
	{
	"id" : 0, 
	"username" : "Tester user", 
	"password" : "0000",
	"contributingUser" : false, 
	"peopleFollowing" : [], 
	"usersFollowing" : [], 
	"reviews" :[],
	"short" : [{"movieId" : 1, "title" : "Jumanji","score" : "10"}], 
	"recommended" : [] 
	},
    {
    "id" : 1, 
    "username" : "user000", 
    "password" : "0000",
    "contributingUser" : false, 
    "peopleFollowing" : [{"id": 0 , "personName" : "John Snow"}], 
    "usersFollowing" : [{"id" : 2, "username" : "user001"}], 
	"reviews" :[{"movieId" : 0, "title" : "Toy Story" , "text" : "movie was good", "score" : "7", "summary": "good"}], 
	"short" : [],
    "recommended" : [] 
},
{
	"id" : 2, 
    "username" : "user001", 
    "password" : "0000",
    "contributingUser" : false, 
    "peopleFollowing" : [{"id": 0 , "personName" : "John Snow"}], 
    "usersFollowing" : [{"id" : 1, "username" : "user000"}], 
	"reviews" :	[], 
	"short" : [],
    "recommended" : [] 
},
];

var nextUserId = 3;
var nextPersonId = 47;
var nextMovieId = 6;

var movies = [
	{
		"id" : 0,
		"peoplein" : [],
		"reviews":[{"userId" : 1, "username" : "user000", "text" : "movie was good", "score" : "7" ,"summary" : "good"}],
		"short" : [{"userId" : 2,"username": "user001", "score": "10"}],
		"avgRating" : 0,
		"Title":"Toy Story",
		"Year":"1990",
		"Rated":"G",
		"Released":"22 Nov 1995",
		"Runtime":"81 min",
		"Genre":["Animation", "Adventure", "Comedy", "Family", "Fantasy"],
		"Director":"John Lasseter",
		"Writer":["John Lasseter","Pete Docter","Andrew Stanton","Joe Ranft","Joss Whedon","Joel Cohen","Alec Sokolow"],
		"Actors":["Tom Hanks","Tim Allen","Don Rickles","Jim Varney"],
		"Plot":"A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
		"Language":"English",
		"Country":"USA",
		"Awards":"Nominated for 3 Oscars. Another 27 wins & 20 nominations.",
		"Poster":"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
		"Ratings":[{"Source":"Internet Movie Database","Value":"8.3/10"},{"Source":"Rotten Tomatoes","Value":"100%"},{"Source":"Metacritic","Value":"95/100"}],
		"Metascore":"95",
		"imdbRating":"8.3",
		"imdbVotes":"864,385",
		"imdbID":"tt0114709",
		"Type":"movie",
		"DVD":"20 Mar 2001",
		"BoxOffice":"N/A",
		"Production":"Buena Vista",
		"Website":"N/A",
		"Response":"True",
		},
		{
		"id" : 1,
		"peoplein" : [],
		"reviews":[],
		"short" : [],
		"avgRating" : 1,
		"Title":"Jumanji",
		"Year":"1995",
		"Rated":"PG",
		"Released":"15 Dec 1995",
		"Runtime":"104 min",
		"Genre":["Adventure", "Comedy", "Family", "Fantasy"],
		"Director":"Joe Johnston",
		"Writer":["Jonathan Hensleigh", "Greg Taylor", "Jim Strain", "Chris Van Allsburg"],
		"Actors":["Robin Williams","Jonathan Hyde","Kirsten Dunst","Bradley Pierce"],
		"Plot":"When two kids find and play a magical board game, they release a man trapped in it for decades - and a host of dangers that can only be stopped by finishing the game.",
		"Language":"English, French",
		"Country":"USA",
		"Awards":"4 wins & 11 nominations.",
		"Poster":"https://m.media-amazon.com/images/M/MV5BZTk2ZmUwYmEtNTcwZS00YmMyLWFkYjMtNTRmZDA3YWExMjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		"Ratings":[{"Source":"Internet Movie Database","Value":"7.0/10"},{"Source":"Rotten Tomatoes","Value":"54%"},{"Source":"Metacritic","Value":"39/100"}],
		"Metascore":"39",
		"imdbRating":"7.0",
		"imdbVotes":"297,463",
		"imdbID":"tt0113497",
		"Type":"movie",
		"DVD":"25 Jan 2000",
		"BoxOffice":"N/A",
		"Production":"Sony Pictures Home Entertainment",
		"Website":"N/A",
		"Response":"True"
	},

{ 
"id" : 2,
"peoplein" : [],
"reviews":[],
"short" : [],
"avgRating" : 2,
"Title":"Grumpier Old Men","Year":"1995","Rated":"PG-13","Released":"22 Dec 1995","Runtime":"101 min","Genre":["Comedy", "Romance"],"Director":"Howard Deutch","Writer":["Mark Steven Johnson"],"Actors":["Walter Matthau", "Jack Lemmon", "Sophia Loren", "Ann-Margret"],"Plot":"John and Max resolve to save their beloved bait shop from turning into an Italian restaurant, just as its new female owner catches Max's attention.","Language":"English, Italian, German","Country":"USA","Awards":"2 wins & 2 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.7/10"},{"Source":"Rotten Tomatoes","Value":"17%"},{"Source":"Metacritic","Value":"46/100"}],"Metascore":"46","imdbRating":"6.7","imdbVotes":"23,736","imdbID":"tt0113228","Type":"movie","DVD":"18 Nov 1997","BoxOffice":"N/A","Production":"Warner Home Video","Website":"N/A","Response":"True"},

{
"id" : 3,
"peoplein" : [],
"reviews":[],
"short" : [],
"avgRating" : 3,
"Title":"Waiting to Exhale","Year":"1995","Rated":"R","Released":"22 Dec 1995","Runtime":"124 min","Genre":["Comedy", "Drama", "Romance"],"Director":"Forest Whitaker","Writer":["Terry McMillan", "Ronald Bass"],"Actors":["Whitney Houston", "Angela Bassett", "Loretta Devine", "Lela Rochon"],"Plot":"Based on Terry McMillan's novel, this film follows four very different African-American women and their relationships with the male gender.","Language":"English","Country":"USA","Awards":"9 wins & 10 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYzcyMDY2YWQtYWJhYy00OGQ2LTk4NzktYWJkNDYwZWJmY2RjXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"5.9/10"},{"Source":"Rotten Tomatoes","Value":"56%"}],"Metascore":"N/A","imdbRating":"5.9","imdbVotes":"9,272","imdbID":"tt0114885","Type":"movie","DVD":"06 Mar 2001","BoxOffice":"N/A","Production":"Twentieth Century Fox Home Entertainment","Website":"N/A","Response":"True"},

{
"id" : 4,
"peoplein" : [],
"reviews":[],
"short" : [],
"avgRating" : 4,	
"Title":"Father of the Bride Part II","Year":"1995","Rated":"PG","Released":"08 Dec 1995","Runtime":"106 min","Genre":["Comedy", "Family", "Romance"],"Director":"Charles Shyer","Writer":["Albert Hackett", "Frances Goodrich", "Nancy Meyers", "Charles Shyer"],"Actors":["Steve Martin", "Diane Keaton", "Martin Short", "Kimberly Williams-Paisley"],"Plot":"George Banks must deal not only with the pregnancy of his daughter, but also with the unexpected pregnancy of his wife.","Language":"English","Country":"USA","Awards":"Nominated for 1 Golden Globe. Another 1 win & 1 nomination.","Poster":"https://m.media-amazon.com/images/M/MV5BOTEyNzg5NjYtNDU4OS00MWYxLWJhMTItYWU4NTkyNDBmM2Y0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.0/10"},{"Source":"Rotten Tomatoes","Value":"48%"},{"Source":"Metacritic","Value":"49/100"}],"Metascore":"49","imdbRating":"6.0","imdbVotes":"33,337","imdbID":"tt0113041","Type":"movie","DVD":"09 May 2000","BoxOffice":"N/A","Production":"Disney","Website":"N/A","Response":"True"},

{
"id" : 5,
"peoplein" : [],
"reviews":[],
"short" : [],
"avgRating" : 5,
"Title":"Heat","Year":"1995","Rated":"R","Released":"15 Dec 1995","Runtime":"170 min","Genre": ["Crime", "Drama", "Thriller"],"Director":"Michael Mann","Writer":["Michael Mann"],"Actors":["Al Pacino", "Robert De Niro", "Val Kilmer", "Jon Voight"],"Plot":"A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.","Language":"English, Spanish","Country":"USA","Awards":"14 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMDJjNWE5MTEtMDk2Mi00ZjczLWIwYjAtNzM2ZTdhNzcwOGZjXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"87%"},{"Source":"Metacritic","Value":"76/100"}],"Metascore":"76","imdbRating":"8.2","imdbVotes":"560,172","imdbID":"tt0113277","Type":"movie","DVD":"27 Jul 1999","BoxOffice":"N/A","Production":"Warner Bros.","Website":"N/A","Response":"True"},

]

var people = [
    {
        "id" : 0,
        "personName" : "John Snow",
        "workedWith" : [],
        "moviesIn" : [],
        "NubmerFollowers" : 0
	},
	{
        "id" : 1,
        "personName" : "John Lasseter",
        "workedWith" : [{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 2,
        "personName" : "Pete Docter",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 3,
        "personName" : "Andrew Stanton",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 4,
        "personName" : "Joe Ranft",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 5,
        "personName" : "Joss Whedon",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 6,
        "personName" : "Joel Cohen",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 7,
        "personName" : "Alec Sokolow",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 8,
        "personName" : "Tom Hanks",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 9,
        "personName" : "Tim Allen",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 10, "personName" : "Don Rickles"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 10,
        "personName" : "Don Rickles",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 11, "personName" : "Jim Varney"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 11,
        "personName" : "Jim Varney",
        "workedWith" : [{ "personId" : 1, "personName" : "John Lasseter"},{ "personId" : 2, "personName" : "Pete Docter"},{ "personId" : 3, "personName" : "Andrew Stanton"},{ "personId" : 4, "personName" : "Joe Ranft"},{ "personId" : 5, "personName" : "Joss Whedon"},{ "personId" : 6, "personName" : "Joel Cohen"},{ "personId" : 7, "personName" : "Alec Sokolow"},{ "personId" : 8, "personName" : "Tom Hanks"},{ "personId" : 9, "personName" : "Tim Allen"},{ "personId" : 10, "personName" : "Don Rickles"},],
        "moviesIn" : [{"movieID" :  0, "movieName" : "Toy Story"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 12,
        "personName" : "Joe Johnston",
        "workedWith" : [{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 13,
        "personName" : "Jonathan Hensleigh",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 14,
        "personName" : "Greg Taylor",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 15,
        "personName" : "Jim Strain",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 16,
        "personName" : "Chris Van Allsburg",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 17,
        "personName" : "Robin Williams",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 18,
        "personName" : "Jonathan Hyde",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 19, "personName" : "Kirsten Dunst"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 19,
        "personName" : "Kirsten Dunst",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 20, "personName" : "Bradley Pierce"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 20,
        "personName" : "Bradley Pierce",
        "workedWith" : [{ "personId" : 12, "personName" : "Joe Johnston"},{ "personId" : 13, "personName" : "Jonathan Hensleigh"},{ "personId" : 14, "personName" : "Greg Taylor"},{ "personId" : 15, "personName" : "Jim Strain"},{ "personId" : 16, "personName" : "Chris Van Allsburg"},{ "personId" : 17, "personName" : "Robin Williams"},{ "personId" : 18, "personName" : "Jonathan Hyde"},{ "personId" : 19, "personName" : "Kirsten Dunst"},],
        "moviesIn" : [{"movieID" :  1, "movieName" : "Jumanji"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 21,
        "personName" : "Howard Deutch",
        "workedWith" : [{ "personId" : 22, "personName" : "Mark Steven Johnson"},{ "personId" : 23, "personName" : "Walter Matthau"},{ "personId" : 24, "personName" : "Jack Lemmon"},{ "personId" : 25, "personName" : "Sophia Loren"},{ "personId" : 26, "personName" : "Ann-Margret"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 22,
        "personName" : "Mark Steven Johnson",
        "workedWith" : [{ "personId" : 21, "personName" : "Howard Deutch"},{ "personId" : 23, "personName" : "Walter Matthau"},{ "personId" : 24, "personName" : "Jack Lemmon"},{ "personId" : 25, "personName" : "Sophia Loren"},{ "personId" : 26, "personName" : "Ann-Margret"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 23,
        "personName" : "Walter Matthau",
        "workedWith" : [{ "personId" : 21, "personName" : "Howard Deutch"},{ "personId" : 22, "personName" : "Mark Steven Johnson"},{ "personId" : 24, "personName" : "Jack Lemmon"},{ "personId" : 25, "personName" : "Sophia Loren"},{ "personId" : 26, "personName" : "Ann-Margret"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 24,
        "personName" : "Jack Lemmon",
        "workedWith" : [{ "personId" : 21, "personName" : "Howard Deutch"},{ "personId" : 22, "personName" : "Mark Steven Johnson"},{ "personId" : 23, "personName" : "Walter Matthau"},{ "personId" : 25, "personName" : "Sophia Loren"},{ "personId" : 26, "personName" : "Ann-Margret"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 25,
        "personName" : "Sophia Loren",
        "workedWith" : [{ "personId" : 21, "personName" : "Howard Deutch"},{ "personId" : 22, "personName" : "Mark Steven Johnson"},{ "personId" : 23, "personName" : "Walter Matthau"},{ "personId" : 24, "personName" : "Jack Lemmon"},{ "personId" : 26, "personName" : "Ann-Margret"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 26,
        "personName" : "Ann-Margret",
        "workedWith" : [{ "personId" : 21, "personName" : "Howard Deutch"},{ "personId" : 22, "personName" : "Mark Steven Johnson"},{ "personId" : 23, "personName" : "Walter Matthau"},{ "personId" : 24, "personName" : "Jack Lemmon"},{ "personId" : 25, "personName" : "Sophia Loren"},],
        "moviesIn" : [{"movieID" :  2, "movieName" : "Grumpier Old Men"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 27,
        "personName" : "Forest Whitaker",
        "workedWith" : [{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 32, "personName" : "Loretta Devine"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 28,
        "personName" : "Terry McMillan",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 32, "personName" : "Loretta Devine"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 29,
        "personName" : "Ronald Bass",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 32, "personName" : "Loretta Devine"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 30,
        "personName" : "Whitney Houston",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 32, "personName" : "Loretta Devine"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 31,
        "personName" : "Angela Bassett",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 32, "personName" : "Loretta Devine"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 32,
        "personName" : "Loretta Devine",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 33, "personName" : "Lela Rochon"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 33,
        "personName" : "Lela Rochon",
        "workedWith" : [{ "personId" : 27, "personName" : "Forest Whitaker"},{ "personId" : 28, "personName" : "Terry McMillan"},{ "personId" : 29, "personName" : "Ronald Bass"},{ "personId" : 30, "personName" : "Whitney Houston"},{ "personId" : 31, "personName" : "Angela Bassett"},{ "personId" : 32, "personName" : "Loretta Devine"},],
        "moviesIn" : [{"movieID" :  3, "movieName" : "Waiting to Exhale"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 34,
        "personName" : "Charles Shyer",
        "workedWith" : [{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 35,
        "personName" : "Albert Hackett",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 36,
        "personName" : "Frances Goodrich",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 37,
        "personName" : "Nancy Meyers",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 38,
        "personName" : "Steve-Martin",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 39,
        "personName" : "Diane Keaton",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 40, "personName" : "Martin Short"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 40,
        "personName" : "Martin Short",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 41, "personName" : "Kimberly Williams-Paisely"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 41,
        "personName" : "Kimberly Williams-Paisely",
        "workedWith" : [{ "personId" : 34, "personName" : "Charles Shyer"},{ "personId" : 35, "personName" : "Albert Hackett"},{ "personId" : 36, "personName" : "Frances Goodrich"},{ "personId" : 37, "personName" : "Nancy Meyers"},{ "personId" : 38, "personName" : "Steve-Martin"},{ "personId" : 39, "personName" : "Diane Keaton"},{ "personId" : 40, "personName" : "Martin Short"},],
        "moviesIn" : [{"movieID" :  4, "movieName" : "Father of the Bride Part II"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 42,
        "personName" : "Micheal Mann",
        "workedWith" : [{ "personId" : 43, "personName" : "Al Pacino"},{ "personId" : 44, "personName" : "Robert De Niro"},{ "personId" : 45, "personName" : "Val Kilmer"},{ "personId" : 46, "personName" : "Jon Voight"},],
        "moviesIn" : [{"movieID" :  5, "movieName" : "Heat"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 43,
        "personName" : "Al Pacino",
        "workedWith" : [{ "personId" : 42, "personName" : "Micheal Mann"},{ "personId" : 44, "personName" : "Robert De Niro"},{ "personId" : 45, "personName" : "Val Kilmer"},{ "personId" : 46, "personName" : "Jon Voight"},],
        "moviesIn" : [{"movieID" :  5, "movieName" : "Heat"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 44,
        "personName" : "Robert De Niro",
        "workedWith" : [{ "personId" : 42, "personName" : "Micheal Mann"},{ "personId" : 43, "personName" : "Al Pacino"},,{ "personId" : 45, "personName" : "Val Kilmer"},{ "personId" : 46, "personName" : "Jon Voight"},],
        "moviesIn" : [{"movieID" :  5, "movieName" : "Heat"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 45,
        "personName" : "Val Kilmer",
        "workedWith" : [{ "personId" : 42, "personName" : "Micheal Mann"},{ "personId" : 43, "personName" : "Al Pacino"},{ "personId" : 44, "personName" : "Robert De Niro"},{ "personId" : 46, "personName" : "Jon Voight"},],
        "moviesIn" : [{"movieID" :  5, "movieName" : "Heat"}],
        "NubmerFollowers" : 0
	},
	{
        "id" : 46,
        "personName" : "Jon Voight",
        "workedWith" : [{ "personId" : 42, "personName" : "Micheal Mann"},{ "personId" : 43, "personName" : "Al Pacino"},{ "personId" : 44, "personName" : "Robert De Niro"},{ "personId" : 45, "personName" : "Val Kilmer"},],
        "moviesIn" : [{"movieID" :  5, "movieName" : "Heat"}],
        "NubmerFollowers" : 0
	},

]
// variables for lists

var userlist = [] // users with id
var namesOfUsersList=[] // Names of users 

var movieList = [] // movies with id
var titles = [] // titles of movies
var genres = [] // genres
var years = [] // years
var minRatings = [] // min ratings
//let genreObj = {};
var personlist = [] // people with id
var namesOfPeopleList = [] // names of people
// search through users and send only uid and username into a list of users so we can pass into a pug file to create a userlist
users.forEach(u =>{
	let urObj = {
		"id" : u.id,
		"username" : u.username
	}
	let nameObj = {
		"username" : u.username.toUpperCase(),
	}
	userlist[u.id] = urObj;
	namesOfUsersList[u.id] = nameObj;
})

console.log("This is what our newly created objects look like");
console.log("-------------------------------------------------");
console.log("userlist");
console.log(userlist);
console.log("-------------------------------------------------");
console.log("NamesofUsersList");
console.log(namesOfUsersList);
console.log("-------------------------------------------------");

// search through people and send only people id and username in a list of people so we can pass into a pug file
people.forEach(p =>{
	let perObj = {
		"id" : p.id,
		"personName" : p.personName
	}
	let nameObj = {
		"personname" : p.personName.toUpperCase(),
	}
	personlist[p.id] = perObj;
	namesOfPeopleList[p.id] = nameObj;
})

console.log("This is what our newly created objects look like");
console.log("-------------------------------------------------");
console.log("Personlist");
console.log(personlist);
console.log("-------------------------------------------------");
console.log("NamesofPeopleList");
console.log(namesOfPeopleList);
console.log("-------------------------------------------------");
let j = 0;
// search through movies and create a list of genres, year, minrating, titles
movies.forEach(m=>{
	// create arrays of possible query data
	let mviObj = {
		"id" : m.id,
		"title" : m.Title,
		"genre" : m.Genre,
		"year" : m.Year,
		"rating" : m.avgRating,
	}
	let titleObj ={
		"title" : m.Title,
	}
	for(let i = 0; i < m.Genre.length;i++ ){
		console.log(i);
	// let	genreObj = {
	// 		"genre" : m.Genre[i],
	// 	}
		if(genres[j]!=(m.Genre[i])){
		genres[j]= m.Genre[i];
		}
		j+=1;
		console.log(j);				
	}
	let yearObj = {
		"year" : m.Year,
	}
	let minObj = {
		"rating" : m.avgRating,
	}
	movieList[m.id]= mviObj;
	titles[m.id]= titleObj;
	years[m.id]= yearObj;
	minRatings[m.id]=minObj;
})

console.log("This is what our newly created objects look like");
console.log("-------------------------------------------------");
console.log("MovieList");
console.log(movieList);
console.log("-------------------------------------------------");
console.log("titles list");
console.log(titles);
console.log("-------------------------------------------------");
console.log("years list");
console.log(years);
console.log("-------------------------------------------------");
console.log("genre list");
console.log(genres);
console.log("-------------------------------------------------");
console.log("ratings list");
console.log(minRatings);
console.log("-------------------------------------------------");

var newgenrelist=[];
genres.forEach(g=>{
	if(!newgenrelist.includes(g)){
		newgenrelist.push(g)
	}
})
console.log("newgenrelist");
console.log(newgenrelist);

// initialize and set up express
const app = express();
app.set("view engine", "pug");
//app.use(express.static("views"))
app.use(express.urlencoded({extended:true}));

// initialize and set up session
const session = require('express-session');
const { stringify } = require('querystring');
const { isUndefined } = require('util');
const { json } = require('body-parser');
const { resolveSoa } = require('dns');
app.use(session({
	
	cookie :{
		maxAge : 50000000000000
	},
	secret : "i am a secret"
}))

// log in key values i would like to use for error checking 
app.use("/", function(req,res,next){
	console.log(req.method);
	//console.log(req.get("Content-Type"));
	console.log(req.session);
	next();
});

// get Login page when you put only / if not logged in
// if logged in get userpage
app.get("/",(req,res)=> {
	console.log("/HOMEPAGE required");
	if(req.session.loggedIn){
		console.log("User Loggedin so send user page");
		res.redirect(`/users/${req.session.userId}`);
	}
	else{
		console.log("user not logged in so send login page");
		res.render("pages/login.pug", {session : req.session})
	}
});

// login, signup and logout functionality  THIS WORKS
app.get("/login", getLoginPage); //
app.get("/signup", getSignupPage);//
app.get("/about" , getAboutPage); //
app.get("/logout" , logUserOut); //
app.get("/users/:userId", sendOneUser);//

app.post("/users",express.json(), [createUser, logInUser]);//
app.post("/login",express.json(), logInUser);//

// create person and add person to list of people
app.get("/createPerson",getcreatePersonPage)
app.post("/people",express.json(),createAPerson);//

// search functions 
app.post("/movies/search",createMovieQuery)
app.post("/people/search",createPersonQuery)
app.post("/users/search",createUserQuery)

// search by Name parameter
app.get("/people/search/:name",personNameSearch);
app.get("/movies/search/:genre",genreNameSearch)

// List movies, list users and list people functionality
app.get("/movies",parseMovieQuery);
app.get("/people",parsePeopleQuery);//
app.get("/users",parseUserQuery);//

// get one movie, get one user, get one person functionality This works
app.get("/movies/:movieId", sendOneMovie);//
app.get("/people/:personId", sendOnePerson);//


//create a review
app.post("/movies/:movieId",express.json(),createReview)//

// create a movie
app.get("/createMovie",getcreateMoviePage)
app.post("/movies",express.json(),createMovie)//

//add people to movie

// add writers to movie
app.post("/movies/addWriter/:movieId",addWriter)
//add actor to movie
app.post("/movies/addActor/:movieId",addActor)

// button toggles
//toggleContributing user
app.get("/users/contributing/:userId",toggleContributing);//

// add user as a friend
app.get("/users/follow/:userId",followUser)//

// follow person
app.get("/people/follow/:personId",followPerson)//

app.listen(3000);
console.log("Server listening at http://localhost:3000");


//FUNCTIONS

// functions for log in and sign up functionality

function getLoginPage(req,res){
	// send the user the login page and the session information
	res.render("pages/login.pug", {session : req.session})
}

function getSignupPage(req,res){
	//send user signup page
	res.render("pages/signUp.pug");
}

function getAboutPage(req,res){
	//send user about page
	res.render("pages/about.pug",{session : req.session});
}

function logUserOut(req, res){
	//log user out and redirect to login page
	req.session.destroy();
	res.redirect(`/login`);
}

function createUser(req, res, next){

	console.log("----------------------");
	console.log(" Post /users accessed");
	console.log("----------------------");

	let newUser = req.body;
	console.log("Going to add new user" + JSON.stringify(newUser));
	let userDuplicate = false;

	// check if new user is valid 
	if (newUser.username == null || newUser.password == null){
		// if values not entered redirect back to signup page
		res.status(300).redirect(`/signup`);
	}

	users.forEach(u => {
		if(u.username === newUser.username){
			userDuplicate = true;
		}		
	})

	if(userDuplicate){
		console.log("user already exist");
		res.status(300).send("user already exist");
	}
	else{
		console.log("User duplicate is " + userDuplicate);
	
		// create the new user object and initialize its keys to empty
		newUser.id = nextUserId;
		newUser.peopleFollowing = [];
		newUser.usersFollowing = [];
		newUser.reviews = [];
		newUser.short = [];
		newUser.recommended= [];
		newUser.contributingUser = false, 
		nextUserId++;

		users.push(newUser);

		// data to send to list of users and namesofUsers
		let urobj = {
			"id" : newUser.id,
			"username" : newUser.username
		}
		let nameObj ={
			"username" : newUser.username
		}
		userlist[newUser.id] = urobj;
		namesOfUsersList[newUser.id] = nameObj;

		console.log("This is the user list after the update");
		console.log(userlist);
		console.log("This is the namesofuserlist after the update");
		console.log(namesOfUsersList);

		console.log("Updated Users array after adding new user");
		console.log(users);
		console.log("Finished creating new user, moving to login");
		
		res.status(200);
		next();
	}

}

function logInUser(req,res){
	console.log("----------------------");
	console.log(" Post /loginUser accessed");
	console.log("----------------------");

	let foundUser = false;
	let userObj;
	let logUser = req.body;
	// check if user is already logged in 
	if (req.session.loggedIn === true){
		res.status(400).send("you are already logged in");
		} 
	else {
		//else find user
		console.log("User " + req.body.username + " is trying to log in");
		
		// search through all the users in user array to check if name and password match any user in database
		users.forEach(u => {			
		if(logUser.username == u.username && logUser.password == u.password){				
				console.log("found the user");
				foundUser = true;
				userObj = u;
			}
		})
						
	if (foundUser){
		// give the session the username and logged in properties
		req.session.username = userObj.username;
		// can set contributing to true of false on creation of user
		req.session.contributing = false;  
		req.session.userId = userObj.id;
		req.session.loggedIn = true;
		console.log("----------------------");
		console.log(" User found moving to retrieve user function");
		console.log("----------------------");
		// redirect to a parameterized route
		res.status(200).redirect(`/users/${userObj.id}`);
	}
	else{
		res.status(401).send("you entered some wrong information try again");
	}
	}
}

function sendOneUser(req,res){
	console.log("----------------------");
	console.log("Get /users accessed ");
	console.log("----------------------");
	
	// create a variable to hold the user id
	let userId = req.params.userId;
	let foundUser = false;
	let userObj;

	console.log("User Id is " + userId);
	
	// search the users array for the user object.
	users.forEach(u => {
		if (userId == u.id){
			foundUser = true;
			userObj = u;
		}
	}) 
	if(foundUser){
		console.log("----------------------");
		console.log("Found the requested user ");
		console.log("----------------------");

				// create reccomended movies
		//based on users following and people following
		let recommended = [];
		let getUser;
		let getPerson;
		let userExists = false;
		let personExists = false;
		//loop through user anc check for his reviews with his user id
		userObj.usersFollowing.forEach(u=>{
			users.forEach(ur=>{
				if(ur.id == u.id){
					userExists = true;
					getUser = ur;
				}
			})
			if(userExists){
				// if user exists push review into reccommend
				getUser.reviews.forEach(r=>{
					let recc ={
						"id" : r.movieId,
						"title" :r.title 
					}
					recommended.push(recc);
				})
			}
		})
		console.log("this is recommended object");
		console.log(recommended);
		userObj.peopleFollowing.forEach(u=>{
			people.forEach(p=>{
				if(p.id == u.id){
					personExists = true;
					getPerson = p;
				}
			})
			if(personExists){
				// if user exists push review into reccommend
				getPerson.moviesIn.forEach(m=>{
					let mecc ={
						"id" : m.movieID,
						"title" :m.movieName 
					}
					recommended.push(mecc)
				})
			}
		})
		console.log("this is recommended object");
		console.log(recommended);


		res.format({
			"application/json": () => {
				res.status(200).send(JSON.stringify(userObj));
			},
			"text/html": () => { res.render("pages/userProfile.pug", {user : userObj, session : req.session , r: recommended})
			}
			});
		}
	else{
		console.log("user not found")
		res.status(404).send("Cannot Find User!")
	}
}
// FUNCTIONS for searching according to query string

function createUserQuery(req,res){
	console.log("----------------------");
	console.log(" Post /users/search accessed");
	console.log("----------------------");
	let query = req.body.name
	console.log(query);
	let build = "?name=" + query;
		res.status(200).redirect(`/users${build}`)
	}
function createPersonQuery(req,res){
	console.log("----------------------");
	console.log(" Post /person/search accessed");
	console.log("----------------------");
	let query = req.body.name
	let build;
	console.log("this is the qurey")
	console.log(query==='');
	build = "?name=" + query;
		res.status(200).redirect(`/people${build}`)
}
function createMovieQuery(req,res){
	console.log("----------------------");
	console.log(" Post /movies/search accessed");
	console.log("----------------------");
	let query = req.body
	console.log(query);
	if(query.genre == undefined){
		query.genre =''
	}
	let build = "?title=" + query.Title+"&year="+query.Year+"&genre="+query.genre+"&minRating="+query.rating;
	//build query then redirect
	if(query){
		res.status(200).redirect(`/movies${build}`)
	}
}

// FUNCTIONS for listing according to the query string 

// functions for Listing Users
function parseUserQuery(req,res){

	console.log("----------------------");
	console.log("User Query String");
	console.log("----------------------");

	// create an object within request called properParams to hold the filtered parameters
	let namesExist = false;
	let searchList = [];
	let sendEmpty = false;

	if (req.query.name){
		console.log("the query name holds" + req.query.name);
		for (id in userlist){
		let currentUser = userlist[id]
		// if the names of the people in the list of people starts with the letters of the query string then set it to the parameter 
			if(currentUser.username.toUpperCase().includes(req.query.name.toUpperCase())){
				namesExist = true;
			}
		}
		if (namesExist){
			for (id in userlist){
		let currentUser = userlist[id]
		// if the names of the people in the list of people starts with the letters of the query string then set it to the parameter 
			if(currentUser.username.toUpperCase().includes(req.query.name.toUpperCase())){
				namesExist = true;
				searchList.push(currentUser);
			}
		}
			console.log("final list of people is");
			console.log(searchList);
		}
		else{
			sendEmpty = true;
		}
	}
	else{
			searchList = userlist;
	}

	console.log("----------------------");
	console.log(" This is what our final list looks like");
	console.log(searchList);
	console.log("----------------------");

	// sends array of person objects  
	res.format({

		"application/json": () => {
			console.log("the request was JSON")
			if (searchList.length == null){
				res.status(404).send(JSON.stringify(searchList));
			}
			else{
				res.status(200).send(JSON.stringify(searchList));
			}
		},

		"text/html": () => {
			console.log("request was HTML");
			if (searchList.length == null){
				res.status(404).send(JSON.stringify(searchList));
			}
			else{
				res.render("pages/userlist.pug", {users : searchList, session : req.session})
			}
	}
	}); 

}
// functions for listing People

 function parsePeopleQuery(req,res){

	console.log("----------------------");
	console.log("Person Query String");
	console.log("----------------------");

	// create an object within request called properParams to hold the filtered parameters
	let namesExist = false;
	let searchList = [];
	let sendEmpty = false;

	if (req.query.name){
		console.log("the query name holds" + req.query.name);
		for (id in personlist){
		let currentPerson = personlist[id]
		// if the names of the people in the list of people starts with the letters of the query string then set it to the parameter 
			if(currentPerson.personName.toUpperCase().includes(req.query.name.toUpperCase())){
				namesExist = true;
			}
		}
		//})
		if (namesExist){
			for (id in personlist){
		let currentPerson = personlist[id]
		// if the names of the people in the list of people starts with the letters of the query string then set it to the parameter 
			if(currentPerson.personName.toUpperCase().includes(req.query.name.toUpperCase())){
				namesExist = true;
				searchList.push(currentPerson);
			}
		}
			console.log("final list of people is");
			console.log(searchList);
		}
		else{
			sendEmpty = true;
		}
	}
	else{
			searchList = personlist;
	}

	console.log("----------------------");
	console.log(" This is what our final list looks like");
	console.log(searchList);
	console.log("----------------------");

	// sends array of person objects  
	res.format({

		"application/json": () => {
			console.log("the request was JSON")
			if (searchList.length == null){
				res.status(404).send(JSON.stringify(searchList));
			}
			else{
				res.status(200).send(JSON.stringify(searchList));
			}
		},

		"text/html": () => {
			console.log("request was HTML");
			if (searchList.length == null){
				res.status(404).send(JSON.stringify(searchList));
			}
			else{
				res.render("pages/personlist.pug", {people : searchList, session : req.session})
			}
	}
	}); 

}
// functions for listing Movies
function parseMovieQuery(req,res){
	console.log("----------------------");
	console.log("Movies Query String");
	console.log("----------------------");

	// create an object within request called properParams to hold the filtered parameters
	let movie = movieList;
	let T = [];
	let G = [];
	let Y = [];
	let M = [];


	//let a = all arrays 
	// t = title query
	// let T = array with t
	// if t is specified T = a - t else T = a
	
	// let g = g genre query 
	// let G = array with G
	// if g is specified G = T - g else G = T



	console.log("this is query ");
	console.log(req.query);
	console.log("this is body ");
	console.log(req.body);
	// check if the queries entered are valid 
	//title query check
	console.log("checking title query");
	if (req.query.title){
		console.log(req.query.title);
		for (id in movie){
			let a = movie[id]
			if(a.title.toUpperCase().includes(req.query.title.toUpperCase())){
				T.push(a)
			} 
		}
	}
	else{
		T = movie;
	}

	console.log("check first filter")
	console.log(T)

	console.log("checking genre query");
	if (req.query.genre){
		console.log(req.query.genre);
		for (id in T){
			let g = T[id]
			if(g.genre.includes(req.query.genre)){
				G.push(g)
			} 
		}
	}
	else{
		G  = T;
	}
	console.log("check second filter")
	console.log(G)

	console.log("checking min query");
	if (req.query.minRating){
		console.log(req.query.minRating);
			for (id in G){
			let m = G[id]
			if(m.rating >= req.query.minRating){
				M.push(m)
			} 
		}
	}
	else{
		M = G
	}
	console.log("check third filter")
	console.log(M)

	console.log("checking year query");
	if (req.query.year){
		console.log(req.query.year);
			for (id in M){
			let y = M[id]
			if(y.year == req.query.year){
				Y.push(y)
			} 
		}
	}
	else{
		Y = M
	}
	console.log("check forth filter")
	console.log(Y)
	res.format({

		"application/json": () => {
			console.log("the request was JSON")
			if (Y.length == null){
				res.status(404).send(JSON.stringify(Y));
			}
			else{
				res.status(200).send(JSON.stringify(Y));
			}
		},

		"text/html": () => {
			console.log("request was HTML");
			if (Y.length == null){
				res.status(404).send(JSON.stringify(Y));
			}
			else{
				res.render("pages/movielist.pug", {movies : Y, session : req.session, genres : newgenrelist})
			}
	}
	})


}

//functions for get single movie and get single person

// send a single movie
function sendOneMovie(req,res){

	console.log("----------------------");
	console.log("Get /movies accessed ");
	console.log("----------------------");
	
	// create a variable to hold the user id
	let movieId = req.params.movieId;
	let foundMovie = false;
	let movieObj;
// add error checking to see if movie id exists
	console.log("Movie Id is " + movieId);
	
	// find movie and set it to movieObj
	movies.forEach(m => {

		if (movieId == m.id){
			foundMovie = true;
			movieObj = m;
		}
	}) 

	if(foundMovie){
		console.log("----------------------");
		console.log("Found the requested movie ");
		console.log("----------------------");
		
		// update avg rating 
		//loop through movie review long and short and average it 
		let shortaverage = 0;
		let longaverage = 0;
		let count = 0;
		let finalaverage =0;
		//get long average
		movieObj.reviews.forEach(r=>{
			longaverage += parseInt( r.score)
			count++
		})

		if(longaverage == 0 || longaverage == undefined){
			longaverage = 0
		}
		else{
			longaverage = longaverage/count
		}
		count = 0;
		//get short average 
		movieObj.short.forEach(r=>{
			shortaverage += parseInt(r.score)
			count++
		})
		console.log("1st shrt is " + shortaverage);
		if(shortaverage == 0 || shortaverage == undefined){
			shortaverage = 0
		}
		else{
		shortaverage = (shortaverage/count);
		}
		console.log("2nd shrt is " + shortaverage);
		if(shortaverage == 0 && longaverage > 0){
			finalaverage = longaverage;
			console.log("long is " + longaverage);
			console.log("shrt is " + shortaverage);
		}
		else if (shortaverage > 0 && longaverage == 0){
			finalaverage = shortaverage;
			console.log("long is " + longaverage);
			console.log("shrt is " + shortaverage);
		}
		else{
			console.log("long is " + longaverage);
			console.log("shrt is " + shortaverage);
		finalaverage = (longaverage+shortaverage)/2;
		}
		//set average review to finalaverage
		movieObj.avgRating = finalaverage;

		// similar movie by rand
		let creatObj = {}
		let n = [];
		let idlist = []
		for(let i = 0 ; i < 5; i++ ){
			let rand = Math.floor(Math.random()*(nextMovieId))
			idlist[i] = rand;
		}
		console.log("idlist");
		console.log(idlist);
		let newidlist = [];
		idlist.forEach(i=>{
			if(!newidlist.includes(i)){
				newidlist.push(i)
			}
		}) 
		console.log(newidlist);
		movies.forEach(m=>{
			if(newidlist.includes(m.id)){
				creatObj = {
					"id" : m.id,
					"title" : m.Title
				}
				n.push(creatObj)
			}
		})

		console.log("n");
		console.log(n);

		res.format({
			"application/json": () => {
				res.status(200).send(JSON.stringify(movieObj));
			},
			"text/html": () => { res.render("pages/movieData.pug", {movie : movieObj, session : req.session, similar : n})
		}
		});
	}
		else{
		console.log("Movie not found")
		res.status(404).send("Cannot Find Movie!")
	}

}
// send a single person
function sendOnePerson(req,res){

	console.log("----------------------");
	console.log("Get /person accessed ");
	console.log("----------------------");
	
	// create a variable to hold the user id
	let personId = req.params.personId;
	let foundPerson = false;
	let personObj;

	console.log("person Id is " + personId);
	
	// search the users array for the user object.
	people.forEach(p => {

		if (personId == p.id){
			foundPerson = true;
			personObj = p;
		}
	}) 

	if(foundPerson){
		console.log("----------------------");
		console.log("Found the requested person ");
		console.log("----------------------");

		//implement worked with 


		res.format({
			"application/json": () => {
				res.status(200).send(JSON.stringify(personObj));
			},
			"text/html": () => { res.render("pages/personData.pug", {person : personObj, session : req.session})
		}
		});
	}
	else{
	console.log("Person not found")
	res.status(404).send("Cannot Find People!")
	}

}

//FUNCTIONS for creating person, movie and movie review

// create a person and go to person page
function getcreateMoviePage (req,res){
	//send user createMovie page
	res.render("pages/createMovie.pug",{session : req.session});
}
function getcreatePersonPage(req,res){
	//send user createPerson page
	res.render("pages/createPerson.pug",{session : req.session});
}
function createAPerson(req,res){
	console.log("----------------------");
	console.log(" Post /people accessed");
	console.log("----------------------");


	let newPerson = req.body;
	console.log("Going to add new person" + JSON.stringify(newPerson));
	let personExist = false;

	// check if youre logged in if not serve error not logged on page
	if(!req.session.loggedIn){
		res.status(300).render("/errorNotLoggedIn.pug");
	}
	else{

	//check if data is valid
	if(newPerson.personName == null){
		res.status(400).send("error invalid data entered");
	}

	// check if person exists
	people.forEach(p => {
		if(p.personName.toUpperCase() === newPerson.personName.toUpperCase()){
			personExist = true;
		}		
	})
	if(personExist){
		console.log("person alrady exists");
		res.status(400).send("error person already exists");
	}
	else{
		// else create person and add to array
		console.log("Creating person");
		
		newPerson.id = nextPersonId;
		newPerson.workedWith = [];
		newPerson.moviesIn = [];
		newPerson.NubmerFollowers = 0;
		nextPersonId++
		
		people.push(newPerson);

		// data to send to list of people and namesofPeoplelist
		let perObj = {
			"id" : newPerson.id,
			"personName" : newPerson.personName
		}
		let nameObj ={
			"personname" : newPerson.personName
		}
		personlist[newPerson.id] = perObj;
		namesOfPeopleList[newPerson.id] = nameObj;

		console.log("This is the person list after the update");
		console.log(personlist);
		console.log("This is the namesofpeoplelist after the update");
		console.log(namesOfPeopleList);

		console.log("Updated people array after adding new user");
		console.log(people);
		console.log("Finished creating new person, moving to personpage");
		
		res.status(200).redirect(`/people/${newPerson.id}`);
	}
}
}

function createReview(req,res){
	console.log("----------------------");
	console.log(" Post /movies/:movieId accessed");
	console.log("----------------------");

	let movieExists = false;
	let reviewExists =false;
	let userObj;
	let movieObj;
	let userid = req.session.userId;
	console.log(userid);

	// check if youre logged in if not serve error not logged on page
	if(!req.session.loggedIn){
		console.log("not logged in ");
		res.status(300).render("pages/errorNotLoggedIn.pug");
	}
	else{	
	//get movie id from url
	let movieId = req.params.movieId;
	//get review from the body
	let reviewObj = req.body
	console.log("review object looks like");
	console.log(reviewObj);
	// check if review is valid
	if(reviewObj == null){
		console.log("review is invalid");
		res.status(400).send("review is invalid")
	}
	//check if movie exists
	movies.forEach(m =>{
		if(movieId == m.id){
			movieExists = true
			movieObj = m;
		}
	})
	if (!movieExists){
		console.log("Movie does not exist");
		res.status(400).send("Movie Does not exist")
	}
	else{
		// movie exists and review object is not null
			users.forEach(u=>{
				if(u.id == userid){
					userObj = u;
				}
			})
		if(reviewObj.short){
			// check if review exists
			movieObj.short.forEach(r=>{
				if(r.userId == userid){
					reviewExists = true;
					console.log("review exists");
					}
				})
				// add review object to movie and user	
				//get user object 
			//create short review
			let score = reviewObj.short;
			// create review objects
			// moview review object
			let mReview = {
				"userId" : userObj.id,
				"username" : userObj.username,
				"score" : score,
			}
			//user review object
			let uReview ={
	
				"movieId" : movieObj.id,
				"title" : movieObj.Title,
				"score" : score,
	
			}
			// if user review already exists 
			//if review already exists update the review
			if(reviewExists){
				// go to the review for movie and user and change the score and text
				userObj.short.forEach(r=>{
					if (r.movieId == movieObj.id){
						r.score = score;
					}
				})
				movieObj.short.forEach(r=>{
					if (r.userId == userObj.id){
						r.score = score;
					}
				})
				console.log("updated user object is ");
				console.log(userObj);
				console.log("updated movie object is ");
				console.log(movieObj);
				res.status(200).redirect(`/movies/${movieObj.id}`)	
	
			}
			else{
				//else add new review
				userObj.short.push(uReview);
				movieObj.short.push(mReview);
				console.log("updated user object is ");
				console.log(userObj);
				console.log("updated movie object is ");
				console.log(movieObj);
				res.status(200).redirect(`/movies/${movieObj.id}`)
			}

		}
		else{
			movieObj.reviews.forEach(r=>{
				if(r.userId == userid){
					reviewExists = true;
					console.log("review exists");
					}
				})
			// create long review
		let text = reviewObj.review;
		let summary = reviewObj.summary;
		let score = reviewObj.rating;
			
			// create review objects
			// moview review object
			let mReview = {
				"userId" : userObj.id,
				"username" : userObj.username,
				"text" : text,
				"summary":summary,
				"score" : score,
			}
			//user review object
			let uReview ={
	
				"movieId" : movieObj.id,
				"title" : movieObj.Title,
				"text" : text,
				"summary":summary,
				"score" : score,
	
			}
			//if review already exists update the review
			if(reviewExists){
				// go to the review for movie and user and change the score and text
				userObj.reviews.forEach(r=>{
					if (r.movieId == movieObj.id){
						r.text = text;
						r.summary = summary;
						r.score = score;
					}
				})
				movieObj.reviews.forEach(r=>{
					if (r.userId == userObj.id){
						r.text = text;
						r.summary = summary;
						r.score = score;
					}
				})
				console.log("updated user object is ");
				console.log(userObj);
				console.log("updated movie object is ");
				console.log(movieObj);
				res.status(200).redirect(`/movies/${movieObj.id}`)
	
	
			}
			else{
				//else add new review
				userObj.reviews.push(uReview);
				movieObj.reviews.push(mReview);
				console.log("updated user object is ");
				console.log(userObj);
				console.log("updated movie object is ");
				console.log(movieObj);
				res.status(200).redirect(`/movies/${movieObj.id}`)
			}
		}
	}
	
	}
}	
function createMovie(req,res){
	console.log("----------------------");
	console.log(" Post /movies accessed");
	console.log("----------------------");

	let movieExists = false;


	movie = req.body;
	console.log("this is the body");
	console.log(movie);

	// search through list of titles if titles exist then send error 
	movies.forEach(m=>{
		console.log(m.Title);
	if(movie.Title == m.Title)
		movieExists = true;
	})
	// 	console.log(title.title);
	// if(movie.Title == title.title)
	// 	movieExists = true;
	

if(movieExists){
	console.log("movie exists");
	res.status(400).send("movie you are trying to make already exists")
}
else{

	movieObj = {
		"id" : nextMovieId,
		"Title" : movie.title,
		"Year" : movie.year,
		"Runtime" : movie.runtime,
		"Genre" : movie.genres.split(","),
		"Director" : movie.director,
		"Writer" : movie.writers.split(","),
		"Actors" : movie.actors.split(","),
		"Plot" : movie.plot,
		"short" : [],
		"reviews" : [],
		"Poster" : movie.poster,
	}
	nextMovieId++
	console.log("This is movie object");
	console.log(movieObj);

	movies.push(movieObj)
	let titleObj={
		"title" : movieObj.title,
	}
	titles.push(titleObj);

	//update genres
	let j=0
	movies.forEach(m=>{
		for(let i = 0; i < m.Genre.length;i++ ){
			if(genres[j]!=(m.Genre[i])){
			genres[j]= m.Genre[i];
			}
			j+=1;
		}			
	})	
	genres.forEach(g=>{
		if(!newgenrelist.includes(g)){
			newgenrelist.push(g)
		}
	})
	console.log("updated list");
	console.log(newgenrelist)

	res.status(200).redirect(`movies/${movieObj.id}`);

}
}

// add people to movie
function addWriter(req,res){
	console.log("----------------------");
	console.log(" Post /movies/addWriter accessed");
	console.log("----------------------");
	let movieID = req.params.movieId
	let writer = req.body.Writer
	let person;
	let movietitle;
	let writerExists = false;
	console.log("this is movieID");
	console.log(movieID);
	console.log("this is writer");
	console.log(writer);
	let duplicate = false;
	// check if writer exists
	people.forEach(p=>{
		if(p.personName == writer){
			writerExists = true;
			person = p
			console.log(person);
		}
	})
	movies.forEach(m=>{
		if(movieID == m.id){
			movietitle = m.Title;
			console.log(movietitle);
			m.Writer.forEach(w=>{
				if(w.toUpperCase() == writer.toUpperCase()){
					duplicate = true;
					console.log(duplicate);
				}
			})
		}
	})
	//check if writer is already in movie
	if(writerExists && !duplicate){
			// search for movie and add person to slot 
	movies.forEach(m=>{
		if(movieID == m.id){
			m.Writer.push(writer);
			console.log(m.Writer);
		}
	})
// search for person and add to slot
let movieObj = {
	"movieId" : movieID,
	"movieName" : movietitle
}
console.log(movieObj);
person.moviesIn.push(movieObj);
	res.status(200).redirect(`/movies/${movieID}`)
}
	else{
		// writer doesnt exist so cant add
		res.status(400).send("Invalid Add to writer Either Writer already exists in movie or writer is not a person")
	} 
}
function addActor(req,res){
	console.log("----------------------");
	console.log(" Post /movies/addActor accessed");
	console.log("----------------------");
	let movieID = req.params.movieId
	let actor = req.body.Actor
	let person;
	let movietitle;
	let writerExists = false;
	console.log("this is movieID");
	console.log(movieID);
	console.log("this is actor");
	console.log(actor);
	let duplicate = false;
	// check if writer exists
	people.forEach(p=>{
		if(p.personName == actor){
			writerExists = true;
			person = p
			console.log(person);
		}
	})
	movies.forEach(m=>{
		if(movieID == m.id){
			movietitle = m.Title;
			console.log(movietitle);
			m.Actors.forEach(w=>{
				if(w.toUpperCase() == actor.toUpperCase()){
					duplicate = true;
					console.log(duplicate);
				}
			})
		}
	})
	//check if writer is already in movie
	if(writerExists && !duplicate){
			// search for movie and add person to slot 
	movies.forEach(m=>{
		if(movieID == m.id){
			m.Actors.push(actor);
			console.log(m.Actors);
		}
	})
// search for person and add to slot
let movieObj = {
	"movieId" : movieID,
	"movieName" : movietitle
}
console.log(movieObj);
person.moviesIn.push(movieObj);
	res.status(200).redirect(`/movies/${movieID}`)
}
	else{
		// writer doesnt exist so cant add
		res.status(400).send("Invalid Add to writer Either actor already exists in movie or actor is not a person")
	} 
}


// functions for toggle follow and toggle contributing
//add/remove a user to the usersfollowing array for the user
function followUser(req,res){
	console.log("----------------------");
	console.log("Post /users/follow/:userId accessed ");
	console.log("----------------------");
	// function to follow a user
	// get the id of the user to toggle follow
	let getId = req.params.userId;
	console.log("User id to follow is " + getId)

	let userObj;
	let userToFollowName;
	let userToFollowId;
	let userId = req.session.userId;
	let following = false;
	let userExists = false;
	// check if youre logged in if not serve error not logged on page
	if(!req.session.loggedIn){
		console.log("not logged in ");
		res.status(300).render("pages/errorNotLoggedIn.pug");
	}
	else{
	// check if the id is valid
	if(userId == getId){
		console.log("trying to follow self");
		res.status(400).send("Error request is not possible")
	} 
	// then check if the user exists
	users.forEach( u =>{
		if (getId == u.id){
			console.log("User exist");
			userExists = true;
			userToFollowName = u.username;
			userToFollowId = u.id;
		}
		if(userId == u.id){
			console.log("found requesting user");
			userObj = u;
		}
	} )
	if(!userExists){
		console.log("user didnt exist");
		res.status(300).send("user that you are trying to follow does not exist!");
	}
	else{
	// then check if already following
		userObj.usersFollowing.forEach(u=>{
			if(u.id == getId){
			following = true;
		}
	})
	// if already following unfollow (remove from users following)
	if(following){
		console.log("already following user");
		let newUserfollowing;
		 newUserfollowing = userObj.usersFollowing.filter(user => userToFollowName != user.username)

		 // set new following list to the userobj
		 userObj.usersFollowing = newUserfollowing;
		 console.log("log of user object");
		 console.log(userObj);
		 console.log("log of all users");
		 console.log(users);
	}
	// else follow (push onto users following)
	else{
		let obj = {
			"id" : userToFollowId,
			"username" : userToFollowName
		}
		userObj.usersFollowing.push(obj);
		console.log(userObj);
	}
	// redirect back to the users page to show the change in button.
	res.status(200).redirect(`/users/${userId}`)
}
}
}
//add/remove a person to the peoplefollowing array for the user
function followPerson(req,res){
	console.log("----------------------");
	console.log("Post /people/follow/:personId accessed ");
	console.log("----------------------");
	// function to follow a person
	// get the id of the person to toggle follow
	let getId = req.params.personId;
	console.log("Person id to follow is " + getId)

	let userObj;
	let personToFollowName;
	let personToFollowId;
	let userId = req.session.userId;
	let following = false;
	let personExists = false;
	// check if youre logged in if not serve error not logged on page
	if(!req.session.loggedIn){
		res.status(300).render("pages/errorNotLoggedIn.pug");
	}
	else{ 
	// then check if the user exists
	people.forEach( p =>{
		if (getId == p.id){
			console.log("Person exist");
			personExists = true;
			personToFollowName = p.personName;
			personToFollowId = p.id;
		}
	})
	users.forEach(u =>{
		if(userId == u.id){
			console.log("found requesting user");
			userObj = u;
		}
	})
	if(!personExists){
		console.log("person didnt exist");
		res.status(300).send("person that you are trying to follow does not exist!");
	}
	else{
	// then check if already following
		userObj.peopleFollowing.forEach(p=>{
			if(p.id == getId){
			following = true;
		}
	})
	// if already following unfollow (remove from users following)
	if(following){
		console.log("already following person");
		let newPeoplefollowing;
		 newPeoplefollowing = userObj.peopleFollowing.filter(person => personToFollowName != person.personName)

		 // set new following list to the userobj
		 userObj.peopleFollowing = newPeoplefollowing;
		 console.log("log of user object");
		 console.log(userObj);
		 console.log("log of all users");
		 console.log(users);
	}
	// else follow (push onto users following)
	else{
		let obj = {
			"id" : personToFollowId,
			"personName" : personToFollowName
		}
		userObj.peopleFollowing.push(obj);
		console.log(userObj);
	}
	// redirect back to the users page to show the change in button.
	res.status(200).redirect(`/users/${userId}`)
}
}
}
//toggle contributing user
function toggleContributing(req,res){
	console.log("----------------------");
	console.log(" Post /users/contributing/:userId accessed");
	console.log("----------------------");


// togglecontributing if user is found
	let currentUserid = req.params.userId;
	let userObj;
	let userfound = false;
	if(!req.session.loggedIn){
		console.log("not logged in ");
		res.status(300).render("/errorNotLoggedIn.pug");
	}
	else{
	console.log("user id is " + currentUserid);
	// search for user and change the contributing boolean
	users.forEach(u=>{
		if (currentUserid == u.id){
			userfound = true;
			console.log(u);
			userObj = u;
		}
	})
	if(userfound){
		userObj.contributingUser = !userObj.contributingUser;
		req.session.contributing = userObj.contributingUser;
		console.log("user found redirecting to refresh page");
		res.status(200).redirect(`/users/${userObj.id}`);
	}
	else{
		console.log("wow an error occured");
		res.status(400).send("error with finding user for toggle")
	}
	}
}
function personNameSearch(req,res){
	console.log("----------------------");
	console.log(" GET /people/search/:name accessed");
	console.log("----------------------");
	
	searchName = req.params.name
	let person;
	let foundPerson = false;
	console.log("this is the name to search");
	console.log(searchName);

	//found name so search through list of people then redirect to personpage
	personlist.forEach(p=>{
		if(p.personName == searchName){
			person = p
			foundPerson = true;
		}
	})
	if(foundPerson){
		console.log("person to send");
		console.log(person);
		res.status(300).redirect(`/people/${person.id}`)
	}
	else{
		res.status(400).send("that person may not be in the database yet")
	}

}
function genreNameSearch(req,res){
	console.log("----------------------");
	console.log(" GET /movies/search/:genre accessed");
	console.log("----------------------");
	
	genre = req.params.genre
	let foundMovie = false;
	console.log("this is the name to search");
	console.log(genre);

	//found query so search through list of movies then redirect to queryMovieparams
	movieList.forEach(m=>{
		if(m.genre.includes(genre)){
			foundMovie = true;
		}
	})
	if(foundMovie){
		//build query
		let build = "?genre=" + genre
		res.status(200).redirect(`/movies${build}`)
	}
	else{
		res.status(400).send("that genre may not be in the database yet")
	}

}