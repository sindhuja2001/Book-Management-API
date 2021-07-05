//Add Prefix to uniquely idenify: /publication

//Initializing Express Router

const Router= require("express").Router();

//Database Model
const PublicationModel= require("../../publication");
/* 
Route: "/publication"
Description: to get all the Publications
Access: Public
Parameter: None
Method: Get
*/

//Build an api for all the Publications

Router.get("/", async(req, res)=> {
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
Router.get("/author/specific/:ISBN", async(req, res)=> {

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
Route: /publication/add
Description: to Add new Publication
Access: Public
Parameter: ISBN
Method: Post
*/

//We Build an API to Add new Publication 

Router.post("/add", async(req, res)=> {

  const { addPublication }= req.body;
  const addNewPublication= await PublicationModel.create(addPublication);
 
  //database.publications.push(addPublication);

  return res.json({publication: addNewPublication, message: "Publication was added"});

   
});




/*
Route: /book/author/name/:id
Description: to update author name
Access: Public
Parameter: ID
Method: Put
*/
//Build an  API to update a book in the Publication

Router.put("/update/book/name/:isbn", async(req, res)=> {

    const PublicationDataBaseId= await PublicationModel.findOneAndUpdate(
        {
            id: req.body.publicationId,
        },
        {
            $addToSet: {
                books: req.params.isbn,
            },
        }
    ); 

    //Update Publication database
//    database.publications.forEach((publication)=> {
//        if(publication.id=== req.body.publicationId){
//            return publication.books.push(req.params.isbn);
//        }
//    });


   const BookDatabasePublication= await BookModel.findOneAndUpdate(
       {
           ISBN: req.params.isbn,
       },
       {
            publication: req.body.publicationId,
       },
       {
           new: true,
       }
   );
     //Update book database

    //  database.books.forEach((book)=> {
    //      if(book.ISBN=== req.params.isbn){
    //          book.publication= req.body.publicationId;
    //          return;
    //      }
    //  });

     return res.json({books: BookDatabasePublication, publications: PublicationDataBaseId,
    message: "Successfully updated publication",
    });
});



/*
Route: /publication/delete/:id
Description: to delete a publication Id
Access: Public
Parameter: Id
Method: Delete
*/
//Build an API to delete an Publication Id

Router.delete("/delete/:id", async(req, res)=> {

    const updatedPublicationDatabase= await PublicationModel.findOneAndDelete({
        id: req.params.id,
    })
    // const updatedPublicationDatabase= database.publications.filter((publication)=> {
    //     publication.id!== req.params.id;
    // });
    // database.publications= updatedPublicationDatabase;
    return res.json({publication: updatedPublicationDatabase});
});






module.exports= Router;
