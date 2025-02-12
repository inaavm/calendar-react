
import { v4 as uuidv4 } from "uuid";

// Sample data 
let ALL_BOOKS = [
  {
    id: uuidv4(),
    title: "JavaScript For Dummies",
    start: new Date(2021, 10, 1).toISOString(),
    end: new Date(2021, 10, 5).toISOString(),
  },
  {
    id: uuidv4(),
    title: "Learning React",
    start: new Date(2021, 9, 15).toISOString(),
    end: new Date(2021, 9, 20).toISOString(),
  },
];

// getBooks  
export const getBooks = () => {
  return JSON.parse(localStorage.getItem("books")) || ALL_BOOKS;
};

// addNewBook  
export const addNewBook = (newTitle, newStart, newEnd) => {
  const newBook = {
    id: uuidv4(),
    title: newTitle,
    start: newStart,
    end: newEnd,
  };

  // Save to localStorage
  const books = JSON.parse(localStorage.getItem("books")) || ALL_BOOKS;
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  return newBook;
};

// updateBook by id
export const updateBook = (id, newTitle, newStart, newEnd) => {
  let books = JSON.parse(localStorage.getItem("books")) || ALL_BOOKS;

  books = books.map((book) =>
    book.id === id
      ? { ...book, title: newTitle, start: newStart, end: newEnd }
      : book
  );

  localStorage.setItem("books", JSON.stringify(books));
  return 200; // Return status code (success)
};

// deleteBook function to delete a book by its id
export const deleteBook = (id) => {
  let books = JSON.parse(localStorage.getItem("books")) || ALL_BOOKS;

  books = books.filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));

  return 200; // Return success status
};



            //  -------   WITH BACKEND SEVER  ------
//import {API_ENDPOINT} from "./index.js";

// // let ALL_BOOKS = [
// //     {
// //       id: uuidv4(),
// //       title: 'JavaScript For Dummies',
// //       start: new Date(2021, 10, 1).toISOString(),
// //       end: new Date(2021, 10, 5).toISOString(),
// //     }
// //   ];

//             // addNewBook FUNCTION 
//     // make HTTP request"#3812ac"ackend using fetch method fetch ( 1, 2){ ...return promise }
//     // fetch ( url - first argument,  for post request method, body, headers as 2nd argument )
//      //argument 1 = URL - in this case api endpoint     //argument 2 = request body for POST METHOD 
//      // achtung - fetch ( ... ) not fetch (     and start the arg in the second line 
// export const addNewBook = async (newTitle, newStart, newEnd) => {

//   const response = await fetch(`${API_ENDPOINT}/books`, { 
//     method: "POST",
//     body: JSON.stringify({   // we convert the object to a JSON string format - whats expected from the API 
//       title: newTitle, // the id is generatd by the server  - unique across all resources, the client ask only provides the necessary data
//       start: newStart,
//       end: newEnd
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

// const newBook = await response.json(); // set response received to JSON Format
// return newBook;
// };

//          // getBooks FUNCTION 
// export const getBooks = async () => {
//     const response = await fetch(`${API_ENDPOINT}/books`);  
//     const books = await response.json(); // set response received to JSON Format - books chosen as variable name 
//     return books;
// }

//         // updateBook FUNCTION - id, newTitle, newStart, newEnd - the id is needed bc it modifes an existing condition
// export const updateBook = async (id, newTitle, newStart, newEnd) => {
//   const response = await fetch(`${API_ENDPOINT}/books/${id}`, { 
//     method: "PUT",
//     body: JSON.stringify({      
//       title: newTitle, 
//       start: newStart,
//       end: newEnd
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// return response.status; // return response status 
// }

// // TODO: Create the deleteBook functioneate a DELETE 

// export const deleteBook = async (id) => {
   
//   const response = await fetch(`${API_ENDPOINT}/books/${id}`, { 
//     method: "DELETE",
//   });

// return response.status; // return response status 
// }




// //Import API_ENDPOINT   localhost.. +   /books from the Backend file named routes/app.js
// import {API_ENDPOINT} from "./index.js";

// // let ALL_BOOKS = [
// //     {
// //       id: uuidv4(),
// //       title: 'JavaScript For Dummies',
// //       start: new Date(2021, 10, 1).toISOString(),
// //       end: new Date(2021, 10, 5).toISOString(),
// //     }
// //   ];

//             // addNewBook FUNCTION 
//     // make HTTP request"#3812ac"ackend using fetch method fetch ( 1, 2){ ...return promise }
//     // fetch ( url - first argument,  for post request method, body, headers as 2nd argument )
//      //argument 1 = URL - in this case api endpoint     //argument 2 = request body for POST METHOD 
//      // achtung - fetch ( ... ) not fetch (     and start the arg in the second line 
// export const addNewBook = async (newTitle, newStart, newEnd) => {

//   const response = await fetch(`${API_ENDPOINT}/books`, { 
//     method: "POST",
//     body: JSON.stringify({   // we convert the object to a JSON string format - whats expected from the API 
//       title: newTitle, // the id is generatd by the server  - unique across all resources, the client ask only provides the necessary data
//       start: newStart,
//       end: newEnd
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

// const newBook = await response.json(); // set response received to JSON Format
// return newBook;
// };

//          // getBooks FUNCTION 
// export const getBooks = async () => {
//     const response = await fetch(`${API_ENDPOINT}/books`);  
//     const books = await response.json(); // set response received to JSON Format
//     return books;
// }

//         // updateBook FUNCTION - id, newTitle, newStart, newEnd - the id is needed bc it modifes an existing condition
// export const updateBook = async (id, newTitle, newStart, newEnd) => {
//   const response = await fetch(`${API_ENDPOINT}/books/${id}`, { 
//     method: "PUT",
//     body: JSON.stringify({      
//       title: newTitle, 
//       start: newStart,
//       end: newEnd
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// return response.status; // return response status 
// }

// // TODO: Create the deleteBook functioneate a DELETE 

// export const deleteBook = async (id) => {
   
//   const response = await fetch(`${API_ENDPOINT}/books/${id}`, { 
//     method: "DELETE",
//   });

// return response.status; // return response status 
// }