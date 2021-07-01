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

//Add http methods

/* 
Route: "/"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api to get all the books
grokkingBook.get("/", async(req, res)=>{
    const getAllBooks=await BookModel.find();
    return res.json({books: getAllBooks});
});


/* 
Route: "/is/:ISBN"
Description: to get all the specific books
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the specific book
grokkingBook.get("/is/:ISBN", async(req, res)=> {
    const getSpecificBook= await BookModel.findOne({ISBN: req.params.ISBN});

    if(!getSpecificBook){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
        return res.json({book: getSpecificBook});
    // const getSpecificBook= database.books.filter((book)=> book.ISBN=== req.params.ISBN);
    

    // if(getSpecificBook.length=== 0){
    //     return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    // }
    return res.json({book: getSpecificBook});
});


/* 
Route: "/c/:category"
Description: to get all the books based on category
Access: Public
Parameter: category
Method: Get
*/
//To build an api to get list of books based on category
grokkingBook.get("/c/:category", async(req, res)=> {
    const listOfBooks= await BookModel.findOne({Category: req.params.category});
    if(!listOfBooks){
        return res.json({error: `No Book found based on category ${req.params.category}`});
    }


    //   const listOfBooks= database.books.filter((book)=> book.Category.includes(req.params.category));

    //   if(listOfBooks.length=== 0){
    //       return res.json({error: `No Book found based on category ${req.params.category}`});
    //   }
      return res.json({book: listOfBooks});
});

/* 
Route: "/lang:/la"
Description: to get all the books based on language
Access: Public
Parameter: None
Method: Get
*/

//Build an api for the books based on language
grokkingBook.get("/lang/:la", async(req, res)=>{
    const language= await BookModel.findOne({Language: req.params.la});

    if(!language){
        return res.json({error: `No Book found based on category ${req.params.la}`});
    }

//    const language= database.books.filter((book)=> book.Language.includes(req.params.la));
//    if(language.length=== 0){
//     return res.json({error: `No Book found based on category ${req.params.la}`});
// }
   return res.json({books: language});
});

/* 
Route: "/author"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api for all the authors

grokkingBook.get("/author", async(req, res)=> {
    const allAuthor= await AuthorModel.find();
   return res.json({authors: allAuthor});
});

/* 
Route: "/author/id"
Description: to get all the specific author
Access: Public
Parameter: None
Method: Get
*/
//Build an api to get all the specific author
grokkingBook.get("/author/specific/:ISBN", async(req, res)=> {

    const getSpecificPublication= await AuthorModel.findOne({books: req.params.ISBN});

    if(!getSpecificPublication){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
    // const getSpecificPublication= database.authors.filter((author)=> author.books.includes(req.params.ISBN));
    

    // if(getSpecificPublication.length=== 0){
    //     return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    // }
    return res.json({authors: getSpecificPublication});
});

/* 
Route: /author/book/:ISBN
Description: to get all the list of author based on books
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the list of author based on books

grokkingBook.get("/author/book/:ISBN", async(req, res)=> {
    const Book= await AuthorModel.findOne({books: req.params.ISBN});
    if(!Book){
        return res.json({error: `No List of authors found for ${req.params.ISBN}`});
    }

    //  const Book= database.authors.filter((author)=> author.books.includes(req.params.ISBN));

    //  if(Book.length=== 0){
    //      return res.json({error: `No List of authors found for ${req.params.ISBN}`});
    //  }
     return res.json({authors: Book});
});

/* 
Route: "/publication"
Description: to get all the Publications
Access: Public
Parameter: None
Method: Get
*/

//Build an api for all the Publications

grokkingBook.get("/publication", async(req, res)=> {
    const allPublication= await PublicationModel.find();
    return res.json({publication: allPublication});
 });

/* 
Route: "/author/specific/publication/:ISBN"
Description: to get all the specific publication
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the specific Publication
grokkingBook.get("/author/specific/publication/:ISBN", async(req, res)=> {

    const getSpecificPublication= await PublicationModel.findOne({ISBN: req.params.ISBN});

    if(!getSpecificPublication){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
    // const getSpecificPublication= database.publications.filter((author)=> author.books.includes(req.params.ISBN));
    

    // if(getSpecificPublication.length=== 0){
    //     return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    // }
    return res.json({authors: getSpecificPublication});
});

/*
Route: /author/book/:ISBN
Description: to get all the list of author based on books
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the list of author based on books

grokkingBook.get("/author/book/publication/:ISBN", async(req, res)=> {
    const listOfBookAuthors= await PublicationModel.findOne({ISBN: req.params.ISBN});

    if(!listOfBookAuthors){
        return res.json({error: `No List of authors found for ${req.params.ISBN}`});
    }

    //  const listOfBookAuthors= database.publications.filter((author)=> author.books.includes(req.params.ISBN));

    //  if(listOfBookAuthors.length=== 0){
    //      return res.json({error: `No List of authors found for ${req.params.ISBN}`});
    //  }
     return res.json({authors: listOfBookAuthors});
});

/*
Route: /book/add
Description: to Add new Book
Access: Public
Parameter: ISBN
Method: Post
*/

//We Build an API to Add new Book

grokkingBook.post("/book/add", async(req, res)=> {
    const { addBook }= req.body;

   const addNewBook= await BookModel.create(addBook);
    //database.books.push(addBook);
    return res.json({books: addNewBook, message: "Book was added"});
});


/*
Route: /author/add
Description: to Add new Author
Access: Public
Parameter: ISBN
Method: Post
*/

//Build an API to Add New Author

grokkingBook.post("/author/add", async(req, res)=> {
    const { addAuthor }= req.body;

    const addNewAuthor= await AuthorModel.create({addAuthor});
    //database.authors.push(addAuthor);
    return res.json({author: addNewAuthor});
});

/*
Route: /publication/add
Description: to Add new Publication
Access: Public
Parameter: ISBN
Method: Post
*/

//We Build an API to Add new Publication 

grokkingBook.post("/publication/add", async(req, res)=> {
    const { addPublication }= req.body;

    const addNewPublication= await PublicationModel.create({addPublication});
    //database.publications.push(addPublication);
    return res.json({publication: addNewPublication});
});


/*
Route: /book/update/title/:isbn
Description: to update new title
Access: Public
Parameter: ISBN
Method: Put
*/

//We build an API to Update book title

grokkingBook.put("/book/update/title/:isbn", (req, res)=> {
   database.books.forEach((book)=> {
       if(book.ISBN=== req.params.isbn){
           book.title= req.body.newBookTitle;
           return;
       }
   });
return res.json({books: database.books}); 
});

/*
Route: /book/update/author/name/:isbn
Description: to Update new author
Access: Public
Parameter: ISBN
Method: Put
*/

//We build an API to Update new author Id

grokkingBook.put("/book/update/author/name/:isbn/:newAuthorId", (req, res)=> {
    //update book Database
    database.books.forEach((book)=> {
        if(book.ISBN=== req.params.isbn){
           return book.Author.push(parseInt(req.params.newAuthorId));
        }
    });

    //Update Author Database
   database.authors.forEach((author)=> {
       if(author.id=== parseInt(req.params.newAuthorId)){
           return author.books.push(req.params.isbn);
       }
   });

   return res.json({books: database.books, author: database.authors});
});
/*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an API to update an author name
grokkingBook.put("/book/author/name/:id", (req, res)=> {
    database.authors.forEach((author)=> {
        if(author.id=== parseInt(req.params.id)){
            author.name= req.body.newAuthorName;
            return;
        }
    });
 return res.json({author: database.authors}); 
 });

 /*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an API to update an publication name

grokkingBook.put("/book/publication/name/:id", (req, res)=> {
    database.publications.forEach((publication)=> {
        if(publication.id=== parseInt(req.params.id)){
            publication.name= req.body.newPublicationName;
            return;
        }
    });
 return res.json({publication: database.publications}); 
 });
/*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an  API to update a book in the Publication

grokkingBook.put("/publications/update/book/name/:isbn", (req, res)=> {

    //Update Publication database
   database.publications.forEach((publication)=> {
       if(publication.id=== req.body.publicationId){
           return publication.books.push(req.params.isbn);
       }
   });

     //Update book database

     database.books.forEach((book)=> {
         if(book.ISBN=== req.params.isbn){
             book.publication= req.body.publicationId;
             return;
         }
     });

     return res.json({books: database.books, publications: database.publications,
    message: "Successfully updated publication",
    });
});

/*
Route: /book/delete/:isbn
Description: to delete a book
Access: Public
Parameter: ISBN
Method: Delete
*/
//Build an API to delete a book
grokkingBook.delete("/book/delete/:isbn", (req, res)=> {
    const updatedBookDatabase= database.books.filter((book)=> {
        book.ISBN !== req.params.isbn;
    })
     
    database.books= updatedBookDatabase;
    return res.json({books: database.books});
});
/*
Route: /author/delete/:id
Description: to delete an author Id
Access: Public
Parameter: Id
Method: Delete
*/
//Build an API to delete an author

grokkingBook.delete("/author/delete/:id", (req, res)=> {
    const updatedAuthorDatabase= database.authors.filter((author)=> {
        author.id !== req.params.id;
    })

    database.authors= updatedAuthorDatabase;
    return res.json({authors: database.authors});
});


/*
Route: /publication/delete/:id
Description: to delete a publication Id
Access: Public
Parameter: Id
Method: Delete
*/
//Build an API to delete an Publication Id

grokkingBook.delete("/publication/delete/:id", (req, res)=> {
    const updatedPublicationDatabase= database.publications.filter((publication)=> {
        publication.id!== req.params.id;
    });
    database.publications= updatedPublicationDatabase;
    return res.json({publication: database.publications});
});


/*
Route: book/delete/author/:isbn/:authorId
Description: to delete an authorId
Access: Public
Parameter: ISBN, author Id
Method: Delete
*/
//Build an API to delete an Author Id from the book

grokkingBook.delete("book/delete/author/:isbn/:authorId", (req, res)=> {

     //update book database
   database.books.forEach((book)=> {
       if(book.ISBN=== req.params.isbn){
           const newAuthorList= book.Author.filter((author)=> 
               author !== parseInt(req.params.authorId)
           );
           book.Author= newAuthorList;
           return;
       }
   });
   //update author database
    database.authors.forEach((author)=> {
      if(author.id=== parseInt(req.params.authorId)){
        const newBooksList= author.books.filter((book)=> 
            book !== req.params.isbn
        );
        author.books= newBooksList;
        return;
      }
   });
    return res.json({books:database.books, authors:database.authors, message: "Author was deleted"});
});
   


/*
Route: /publication/delete/:id
Description: to delete an authorId
Access: Public
Parameter: ISBN
Method: Delete
*/
//Build an API to delete an Author Id






//Add a Port
grokkingBook.listen(2001, ()=> console.log("Server is running"));



