import React, { useState, useEffect } from "react";
import CalendarComponent from '../Calendar';
import Book from '../Book';
import {
  getBooks,
  addNewBook
} from '../../api/books';

// Material UI
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';

import '../App.css';

const BookSchedule = () => {

  const [books, setBooks] = useState([]); // array to store the list of books from the backend

        // INPUT States 
  // Title
  const [newBookTitle, setNewBookTitle] = useState("");
  // Book Start
  const [newBookStart, setNewBookStart] = useState(new Date().toISOString());
  // Book End
  const [newBookEnd, setNewBookEnd] = useState(new Date().toISOString());

            // Rertrieve Data from the function defined in book.js - getBooks API and put it in setBooks
  useEffect(() => {

    async function retrieveGetBooks() {
      const booksData = await getBooks();
      setBooks(booksData); // pass as argument the JSON response recieved from backend via the getBooks function in the FE 
    }

    retrieveGetBooks(); // call the function
  }, []);
      
 
  async function postAddNewBook ()  {
    const newBook = await addNewBook(newBookTitle, newBookStart, newBookEnd);
    setBooks((previousBooks) => [ // call back function used as state- updater with added book
      ...previousBooks,
      newBook
    ]);
  };


  // Map through the array of books and create a list item for them - they will be passes to the Book component
  const existingBooks = books.map((book) => {
    return (
      <Book
        key={book.id}  
        bookId={book.id}
        bookTitle={book.title}
        bookStart={book.start}
        bookEnd={book.end}
        setBooks={setBooks}
      />
    )
  
  });

  //event props 
  return (
    <div>
      <CalendarComponent events={books} /> 
        <h3>Add a New Book to Read!</h3>
        <div className={'add-new'}>
          <form onSubmit={(e) => {
              e.preventDefault()
              postAddNewBook()  // call the function to POST a new book
            }}
          >
              <Stack spacing={3}>
                  <TextField id="standard-basic"
                             required
                             label="Add Book Title"
                             variant="standard"
                             onChange={e => setNewBookTitle(e.target.value)}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                          label="Start Date" 
                          openTo="day"
                          views={['year', 'month', 'day']}
                          value={new Date(newBookStart)}
                          onChange={(newValue) => {
                              setNewBookStart(newValue.toISOString());
                          }}
                          slotProps={{ textField: { variant: 'outlined' } }}
                      />
                      <DatePicker
                          label="End Date" 
                          openTo="day"
                          views={['year', 'month', 'day']}
                          value={new Date(newBookEnd)}
                          onChange={(newValue) => {
                              setNewBookEnd(newValue.toISOString());
                          }}
                          slotProps={{ textField: { variant: 'outlined' } }}
                      />
                  </LocalizationProvider>
                  <Button variant="contained" type="submit">
                      Add Book
                  </Button>
              </Stack>
          </form>
        </div>
        <div className={'existing-books'}>
          <h3>Existing Book Schedules</h3>
          <List>
            {existingBooks}
          </List>
        </div>
    </div>
  )
}

export default BookSchedule;