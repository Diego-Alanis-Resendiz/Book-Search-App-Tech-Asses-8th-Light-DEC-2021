const mongoose = require('mongoose')

const bookInfromationSchema = new mongoose.Schema({
    Title:{
        type:String,
        
    },
    Author:{
        type:String,
      
    },
    Publisher:{
        type:String,
        
    }

})

const BookInformation = mongoose.model('BookInformation', bookInfromationSchema)

module.exports = BookInformation;