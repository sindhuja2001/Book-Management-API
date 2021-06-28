//Import Express
const express= require("express");
//Initialize express
const grokkingBook= express();

//Import Database
const database= require("./database");


//Configure Json
grokkingBook.use(express.json());

//Add http methods

/* 
Route: "/"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api to get all the books
grokkingBook.get("/", (req, res)=>{
    return res.json({books: database.books});
});


/* 
Route: "/:ISBN"
Description: to get all the specific books
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the specific book
grokkingBook.get("/is/:ISBN", (req, res)=> {
    const getSpecificBook= database.books.filter((book)=> book.ISBN=== req.params.ISBN);
    

    if(getSpecificBook.length=== 0){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
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
grokkingBook.get("/c/:category", (req, res)=> {
      const listOfBooks= database.books.filter((book)=> book.Category.includes(req.params.category));

      if(listOfBooks.length=== 0){
          return res.json({error: `No Book found based on category ${req.params.category}`});
      }
      return res.json({book: listOfBooks});
});

/* 
Route: "/lang:/la"
Description: to get all the books based on language
Access: Public
Parameter: None
Method: Get
*/

//Build an api for the books based on category
grokkingBook.get("/lang/:la", (req, res)=>{
   const language= database.books.filter((book)=> book.Language.includes(req.params.la));
   if(language.length=== 0){
    return res.json({error: `No Book found based on category ${req.params.la}`});
}
   return res.json({books: language});
});

/* 
Route: "/id"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api for all the authors

grokkingBook.get("/author", (req, res)=> {
   return res.json({authors: database.authors});
});

/* 
Route: "/author/id"
Description: to get all the specific author
Access: Public
Parameter: None
Method: Get
*/
//Build an api to get all the specific author
grokkingBook.get("/author/specific/:ISBN", (req, res)=> {
    const getSpecificPublication= database.authors.filter((author)=> author.books.includes(req.params.ISBN));
    

    if(getSpecificPublication.length=== 0){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
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

grokkingBook.get("/author/book/:ISBN", (req, res)=> {
     const Book= database.authors.filter((author)=> author.books.includes(req.params.ISBN));

     if(Book.length=== 0){
         return res.json({error: `No List of authors found for ${req.params.ISBN}`});
     }
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

grokkingBook.get("/publication", (req, res)=> {
    return res.json({publication: database.publications});
 });

/* 
Route: "/author/specific/publication/:ISBN"
Description: to get all the specific publication
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the specific Publication
grokkingBook.get("/author/specific/publication/:ISBN", (req, res)=> {
    const getSpecificPublication= database.publications.filter((author)=> author.books.includes(req.params.ISBN));
    

    if(getSpecificPublication.length=== 0){
        return res.json({error: `No Book Found for the requested ISBN ${req.params.ISBN}`});
    }
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

grokkingBook.get("/author/book/publication/:ISBN", (req, res)=> {
     const listOfBookAuthors= database.publications.filter((author)=> author.books.includes(req.params.ISBN));

     if(listOfBookAuthors.length=== 0){
         return res.json({error: `No List of authors found for ${req.params.ISBN}`});
     }
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

grokkingBook.post("/book/add", (req, res)=> {
    const { addBook }= req.body;
    database.books.push(addBook);
    return res.json({books: database.books});
});


/*
Route: /author/add
Description: to Add new Author
Access: Public
Parameter: ISBN
Method: Post
*/

//Build an API to Add New Author

grokkingBook.post("/author/add", (req, res)=> {
    const { addAuthor }= req.body;
    database.authors.push(addAuthor);
    return res.json({author: database.authors});
});

/*
Route: /author/add
Description: to Add new Author
Access: Public
Parameter: ISBN
Method: Post
*/

//We Build an API to Add new Publication 

grokkingBook.post("/publication/add", (req, res)=> {
    const { addPublication }= req.body;
    database.publications.push(addPublication);
    return res.json({publication: database.publications});
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
        if(publication.id=== parseInt(req.body.publicationId)){
            return publication.books.push(req.params.isbn);
        }
    });
    //Update book database
})

//Add a Port
grokkingBook.listen(2001, ()=> console.log("Server is running"));



