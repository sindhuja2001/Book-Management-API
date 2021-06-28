const books= [
    {
        ISBN: "Sindhuja2001",
        title: "Grokking Book",
        Language: "en",
        publicationDate: "2021-07-02",
        NumPages: "250",
        Author: [1, 2],
        publications: [1],
        Category: ["Technology", "Arts and Science", "Communication", "Novel"],
    },
];

const authors= [
    {
       id: 1,
       name: "Dale Carnegie",
       books: ["Sindhuja2001"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["Sindhuja2001"],
    },
];


const publications= [
    {
        id: 1,
        name: "Mern Publications",
        books: ["Sindhuja2001"],

    },
];



module.exports= {books, authors, publications};