import React, { useState } from "react";
// FUNCTIONS 
import {
    deleteBook,
    updateBook
  } from '../api/books';

// Material UI COMPONENTS
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Fab from '@mui/material/Fab';


const Book = ({setBookListInitValue, bookId, bookTitle, bookStart, bookEnd}) => {
  
    // State to update an existing books data
  const [updateNewBookTitle, setNewUpdateBookTitle] = useState(bookTitle);
  const [updateNewBookStart, setNewUpdateBookStart] = useState(bookStart);
  const [updateNewBookEnd, setNewUpdateBookEnd] = useState(bookEnd);

    // DELETE
    const onDeleteBook = async (id) => {
        const responseStatus = await deleteBook(id);
    
        if (responseStatus !== 200) {
          alert("Deleting failed");
          return;
        }
    
        setBookListInitValue((previousBooks) =>
          previousBooks.filter((book) => book.id !== id)
        );
      };
    
      // UPDATE
      const onUpdateBook = async (id, newTitle, newStart, newEnd) => {
        const responseStatus = await updateBook(id, newTitle, newStart, newEnd);
    
        if (responseStatus !== 200) {
          alert("Updating failed");
          return;
        }
    
        setBookListInitValue((previousBooks) => {
          const nextBooksState = [...previousBooks];
          const bookToUpdate = nextBooksState.find(
            (book) => book.id === id
          );
    
          bookToUpdate.title = newTitle;
          bookToUpdate.start = newStart;
          bookToUpdate.end = newEnd;
    
          return nextBooksState;
        });
      };
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onUpdateBook(bookId, updateNewBookTitle, updateNewBookStart, updateNewBookEnd)
          }
        }>

                {/* EXISTING TITLES  */}
          <Stack className="existing" key={bookId}>
            <TextField id="standard-basic"
                      label="Title"
                      defaultValue={bookTitle}
                      variant="standard"
                      onChange={e => setNewUpdateBookTitle(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  label="Start Date" 
                  openTo="day"
                  views={['year', 'month', 'day']}
                  value={new Date(updateNewBookStart)}
                  onChange={(newValue) => {
                      setNewUpdateBookStart(newValue.toISOString())
                  }}
                  slotProps={{ textField: { variant: 'outlined' } }}
              />
              <DatePicker
                  label="End Date" 
                  openTo="day"
                  views={['year', 'month', 'day']}
                  value={new Date(updateNewBookEnd)}
                  onChange={(newValue) => {
                      setNewUpdateBookEnd(newValue.toISOString())
                  }}
                  slotProps={{ textField: { variant: 'outlined' } }}

              />
            </LocalizationProvider>
              <Button
              variant="contained"
              sx = {{
              color: "#619061",
              fontWeight:"800",
              backgroundColor:"#e3fbe3",
              boxShadow:"none",
              ":hover": { // needs to be precised as well when changing a a color 
                backgroundColor:"#e3fbe3",
                borderColor:"#FFE3E2",
                border:"1px solid",
                boxShadow:"none",
              }
              
               }}
              type="submit"
              size="medium"
              startIcon={<UpdateIcon />}
            >
                Update  
              </Button>

    
            <Button
              variant="contained"
              sx = {{
                color: "#F00000",
                fontWeight:"800",
                backgroundColor:"#FFE3E2",
                boxShadow:"none",
                ":hover": { // needs to be precised as well when changing a a color 
                  backgroundColor:"#FFE3E2",
                  boxShadow:"none",
                  borderColor:"#FFE3E2",
                  border:"1px solid",
                }
                
                 }}
              onClick={() => onDeleteBook(bookId)}
               size="medium"
              startIcon={<DeleteIcon />}
            >
              Delete 
            </Button>
            </Stack>
        </form>
        
      )
}
export default Book;