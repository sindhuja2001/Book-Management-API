require("dotenv").config();
//Import Express
const express= require("express");


//Import Mongoose
const mongoose= require("mongoose");
//Initialize express
const grokkingBook= express();

//Import Database
const database= require("./database");

//Import Models
const BookModel= require("./book");
const AuthorModel= require("./author");
const PublicationModel= require("./publication");

//Initializing Microservices route
const Books= require("./API/Book/main");
const Authors= require("./API/Author/main");
const Publications= require("./API/Publication/main");

//Configure Json
grokkingBook.use(express.json());

//Establish COnnection
mongoose.connect(process.env.MONGO_URL, {
    
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=> console.log("Connection Established"));

//Initialize Microservices

grokkingBook.use("/book", Books);
grokkingBook.use("/author", Authors);
grokkingBook.use("/publication", Publications);



//Add a Port
grokkingBook.listen(2001, ()=> console.log("Server is running"));



