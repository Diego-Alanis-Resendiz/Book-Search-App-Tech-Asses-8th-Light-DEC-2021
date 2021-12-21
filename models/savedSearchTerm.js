const mongoose = require('mongoose')

const keywordSchema = new mongoose.Schema({
    queryTerm:{
        type:String,
        required: true
    }
})



const Keyword = mongoose.model('Keyword', keywordSchema)

module.exports = Keyword;
