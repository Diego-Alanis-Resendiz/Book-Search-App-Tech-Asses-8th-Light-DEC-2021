const mongoose = require('mongoose')
const Keyword = require('./models/savedSearchTerm')
// const BookInformation = require('./models/savedSearch')

mongoose.connect('mongodb://localhost:27017/bookSearches')
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR :(")
        console.log(err)
    })

const seedKeyword = new Keyword({
    queryTerm: 'fifty shades'
})

// const seedBookInformation = new Keyword({
//     Title: 'hi',
//     Author: 'there',
//     publisher: 'stranger'

// })

Keyword.insertMany(seedKeyword)
.then(res => { 
    console.log(res)
})
.catch (e => {
    console.log(e)
})


// BookInformation.insertMany(seedBookInformation)
// .then(res => { 
//     console.log(res)
// })
// .catch (e => {
//     console.log(e)
// })