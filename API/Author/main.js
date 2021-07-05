//Initialize Express Router
const Router= require("express").Router();


//Declare Author Model

const AuthorModel= require("../../author");
/* 
Route: "/author"
Description: to get all the books
Access: Public
Parameter: None
Method: Get
*/

//Build an api for all the authors

Router.get("/", async(req, res)=> {
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
Router.get("/specific/:ISBN", async(req, res)=> {

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

Router.get("/book/:ISBN", async(req, res)=> {
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

//Post Method
/*
Route: /author/book/:ISBN
Description: to get all the list of author based on books
Access: Public
Parameter: ISBN
Method: Get
*/
//Build an api to get all the list of author based on books

Router.get("/book/publication/:ISBN", async(req, res)=> {
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
Route: /author/add
Description: to Add new Author
Access: Public
Parameter: ISBN
Method: Post
*/

//Build an API to Add New Author

Router.post("/add", async(req, res)=> {
    const { addAuthor }= req.body;

    const addNewAuthor= await AuthorModel.create(addAuthor);
    //database.authors.push(addAuthor);
    return res.json({author: addNewAuthor, message: "author was added"});
});

//Put Method
/*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an API to update an author name
Router.put("/book/author/name/:id", async (req, res)=> {

    const UpdatedAuthorName= await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.id),
        },
        {
            name: req.body.newAuthorName,
        },
        {
            new: true,
        }
    );
    // database.authors.forEach((author)=> {
    //     if(author.id=== parseInt(req.params.id)){
    //         author.name= req.body.newAuthorName;
    //         return;
    //     }
    // });
 return res.json({author: UpdatedAuthorName}); 
 });

 /*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an API to update an publication name

Router.put("/book/publication/name/:id", async(req, res)=> {

    const UpdatePublication=  await PublicationModel.findOneAndUpdate(
        {
            id: parseInt(req.params.id),
        },
        {
            name: req.body.newPublicationName,
        },
        {
            new: true,
        }
    );
    // database.publications.forEach((publication)=> {
    //     if(publication.id=== parseInt(req.params.id)){
    //         publication.name= req.body.newPublicationName;
    //         return;
    //     }
    // });
 return res.json({publication: UpdatePublication}); 
 });

 //Delete Method


 /*
Route: /author/delete/:id
Description: to delete an author Id
Access: Public
Parameter: Id
Method: Delete
*/
//Build an API to delete an author

Router.delete("/delete/:id", async(req, res)=> {

    const updatedAuthorDatabase= await AuthorModel.findOneAndDelete({
        id: req.params.id,
    });
    // const updatedAuthorDatabase= database.authors.filter((author)=> {
    //     author.id !== req.params.id;
    // })

    // database.authors= updatedAuthorDatabase;
    return res.json({authors: updatedAuthorDatabase});
});

/*
Route: book/delete/author/:isbn/:authorId
Description: to delete an authorId
Access: Public
Parameter: ISBN, author Id
Method: Delete
*/
//Build an API to delete an Author Id from the book

Router.delete("book/delete/:isbn/:authorId", async(req, res)=> {

    const updatedDatabaseBook= await BookModel.findOneAndUpdate(
        {
             ISBN: req.params.isbn,
        },
        {
          $pull:{
             Author: parseInt(req.params.authorId),
          },
        },
        {
            new: true,
        }
        );

     //update book database
//    database.books.forEach((book)=> {
//        if(book.ISBN=== req.params.isbn){
//            const newAuthorList= book.Author.filter((author)=> 
//                author !== parseInt(req.params.authorId)
//            );
//            book.Author= newAuthorList;
//            return;
//        }
//    });
   //update author database
   const UpdatedDatabaseAuthor= await AuthorModel.findOneAndUpdate(
   {
       id:  parseInt(req.params.authorId),
   },
   {
       $pull:{
           books: req.params.isbn,
       },
   },
   {
       new: true,
   }
   );
//     database.authors.forEach((author)=> {
//       if(author.id=== parseInt(req.params.authorId)){
//         const newBooksList= author.books.filter((book)=> 
//             book !== req.params.isbn
//         );
//         author.books= newBooksList;
//         return;
//       }
//    });
    return res.json({books:updatedDatabaseBook, authors:UpdatedDatabaseAuthor, message: "Author was deleted"});
});


module.exports= Router;