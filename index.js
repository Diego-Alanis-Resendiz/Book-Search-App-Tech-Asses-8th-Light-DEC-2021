//Setting up express for node and mongoose database for CRUD of saved books page 
const express = require('express');
const app = express();
const axios = require('axios')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { INSPECT_MAX_BYTES } = require('buffer');

//simplifying google API info
const googleBooksApi = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = "AIzaSyAvQEdxlEXw009DfNKihy44hF1fFmxlvXQ";
const Keyword = require('./models/savedSearchTerm')
//creating local server on mongodg using gitbash and mongod
mongoose.connect('mongodb://localhost:27017/bookSearches')
    .then(() => {
        console.log('MONGO IS CONNECTED')
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR :(")
        console.log(err)
    })


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

//fucntion to get the api url for my search 
const googleBooks = async(x) => {
    try{
        return await axios.get(`${googleBooksApi}${x}+&key=${apiKey}`)
    } catch(error) {
        console.error(error)
    }
}

//Setting up and testing routes in local experess server
app.get('/gbooks', (req, res) => {
    res.render('templates/index')
})

app.get('/gbooks/search', async(req, res) => {
    //adding results to access array information in ejs
    const foundBooks = await googleBooks(keywords)
    const searchData = foundBooks.data.items
    res.render('templates/search', {searchData})
})

app.post('/gbooks/search', async(req, res) => {
    //getting search results for query from api
    const keywords = req.body.query
    const foundBooks = await googleBooks(keywords)
    const searchData = foundBooks.data.items
    
    res.render('templates/search', {searchData})
})

app.get('/gbooks/save', async(req, res) => {
    const keywords = req.body.query
    const foundBooks = await googleBooks(keywords)
    const searchData = foundBooks.data.items
    
    res.render('templates/save', {searchData})
    
})

app.post('/gbooks/save', async(req, res) => {
    res.send('we are getting the saved book request')

    
})
//Local Express server set up
app.listen(2000, () => {
    console.log('APP IS LISTENING!')
})


//this is the logic I used to figure out how to display five of the accessed items. Saved here for ejs use

// const form = document.getElementById('searchForm');
// const apiKey = "AIzaSyAvQEdxlEXw009DfNKihy44hF1fFmxlvXQ";
// const bookSearch = document.getElementById('bookSearch');


// //Accessing information from Google Books API
// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const searchTerm = form.elements.query.value;
//     const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+&key=${apiKey}`);

//     // I tested a base case to see if everything matched and I was properly accessing information from Google Books API
//     console.log(res.data.items[0].volumeInfo.title);
//     console.log(res.data.items[0].volumeInfo.authors);
//     console.log(res.data.items[0].volumeInfo.publisher);

//     const title = res.data.items[0].volumeInfo.title;
//     const author = res.data.items[0].volumeInfo.authors;
//     const publisher = res.data.items[0].volumeInfo.publisher;

//     //Displying Author, Title, and Publisher 
//     const bookInfo = document.createElement("p");

//     const bookTitle = document.createTextNode(`Title: ${title}, `);
//     const bookAuthors = document.createTextNode(`Author(s): ${author}, `);
//     const bookPublisher = document.createTextNode(`Publisher: ${publisher}`);

//     bookInfo.appendChild(bookTitle);
//     bookInfo.appendChild(bookAuthors);
//     bookInfo.appendChild(bookPublisher);

//     const element = document.getElementById("div1");
//     element.appendChild(bookInfo);

// });

