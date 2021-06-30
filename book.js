//Import Mongoose
const mongoose= require("mongoose");

//Create a book schema

const BookSchema= mongoose.Schema({
    ISBN: String,
    title: String,
    Language: String,
    publicationDate:String,
    NumPages: String,
    Author: [Number],
    publications: [Number],
    Category: [String],
});

//Create a book Model

const BookModel= mongoose.model(BookSchema);
//Export Mongoose


module.exports= BookModel;