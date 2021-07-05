//Add Prefix to uniquely idenify: /book

//Initializing Express Router

const Router= require("express").Router();

//Database Model
const BookModel= require("../../book");
/* 
Route: "/"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api to get all the books
Router.get("/", async(req, res)=>{
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
Router.get("/is/:ISBN", async(req, res)=> {
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
Router.get("/c/:category", async(req, res)=> {
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
Router.get("/lang/:la", async(req, res)=>{
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

//Post Method


/*
Route: /book/add
Description: to Add new Book
Access: Public
Parameter: ISBN
Method: Post
*/

//We Build an API to Add new Book

Router.post("/add", async(req, res)=> {
    const { addBook }= req.body;

   const addNewBook= await BookModel.create(addBook);
    //database.books.push(addBook);
    return res.json({books: addNewBook, message: "Book was added"});
});


//Put Method



/*
Route: /book/update/title/:isbn
Description: to update new title
Access: Public
Parameter: ISBN
Method: Put
*/

//We build an API to Update book title

Router.put("/update/title/:isbn", async(req, res)=> {

    const UpdatedBook= await BookModel.findOneAndUpdate(
     {
         ISBN: req.params.isbn,
     },
     {
         title: req.body.newBookTitle,
     },
     {
        new: true,
     }
    );
//    database.books.forEach((book)=> {
//        if(book.ISBN=== req.params.isbn){
//            book.title= req.body.newBookTitle;
//            return;
//        }
//    });
return res.json({books: UpdatedBook}); 
});

/*
Route: /book/update/author/name/:isbn
Description: to Update new author
Access: Public
Parameter: ISBN
Method: Put
*/

//We build an API to Update new author Id

Router.put("/update/author/name/:isbn/:newAuthorId", async(req, res)=> {


    const BookDataBaseIsbn= await BookModel.findOneAndUpdate(
     {
         ISBN: req.params.isbn,
     },
     {
         $addToSet: {
             Author: parseInt(req.params.newAuthorId),
         },
     },
     {
         new: true,
     }
    );
    //update book Database
    // database.books.forEach((book)=> {
    //     if(book.ISBN=== req.params.isbn){
    //        return book.Author.push(parseInt(req.params.newAuthorId));
    //     }
    // });
     const AuthorDatabaseId= await AuthorModel.findOneAndUpdate(
         {
             id: parseInt(req.params.newAuthorId),
         },
         {
             $addToSet: {
                 books: req.params.isbn,
             },
         },
         {
            new: true,
        }
     );
    //Update Author Database
//    database.authors.forEach((author)=> {
//        if(author.id=== parseInt(req.params.newAuthorId)){
//            return author.books.push(req.params.isbn);
//        }
//    });

   return res.json({books: BookDataBaseIsbn, author: AuthorDatabaseId});
});


//delete Method


/*
Route: /book/delete/:isbn
Description: to delete a book
Access: Public
Parameter: ISBN
Method: Delete
*/
//Build an API to delete a book
Router.delete("/delete/:isbn", async(req, res)=> {
    const deleteBook= await BookModel.findOneAndDelete({
        ISBN: req.params.isbn,
    });
    // const updatedBookDatabase= database.books.filter((book)=> {
    //     book.ISBN !== req.params.isbn;
    // })
     
    //database.books= updatedBookDatabase;
    return res.json({books: deleteBook, message: "Book was deleted"});
});


module.exports= Router;