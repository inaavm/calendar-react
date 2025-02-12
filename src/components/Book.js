import React, { useState } from "react";
import CustomDatePickerStart from "./CustomDatePickerStart";
import CustomDatePickerEnd from "./CustomDatePickerEnd";
// import CustomTextField from "./CustomTextField";


// FUNCTIONS 
import {
    deleteBook,
    updateBook
  } from '../api/books';

// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Fab from '@mui/material/Fab';


const Book = ({setBookListInitValue, bookId, bookTitle, bookStart, bookEnd}) => {

  const [startDateSelected, setStartDateSelected] = useState(false); // track the date selection by the user
  const [endDateSelected, setEndDateSelected] = useState(false); // track the date selection by the user

  
  
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
       // form stacks automatically, don`t place anything inside 
      <div className="container-existing">
        <form onSubmit={(e) => {
            e.preventDefault()
            onUpdateBook(bookId, updateNewBookTitle, updateNewBookStart, updateNewBookEnd)
          }
          }>
          <div className="container-existing__wrapper">
            <div className="container-existing__list">
                {/* EXISTING TITLES  */}
          <Stack className="existing" key={bookId}>
                  <TextField id="standard-basic"
                                      label="Title"
                                      defaultValue={bookTitle}
                                      variant="standard"
                                      onChange={e => setNewUpdateBookTitle(e.target.value)}
                                      InputLabelProps={{
                                        shrink: true,  // Keeps the label in place                          
                                      }}
                                      sx={{
                                        width: "12rem",
                                        height: "2rem",
                                        fontSize: "1rem",
                                        fontFamily: "sans-serif",
                                        fontWeight: "200",
                                        color: "black", // Text color
                                        paddingTop: ".5rem",
                                        paddingBottom:"3rem",
                                        
                                        "& .MuiInputLabel-root": {
                                          fontSize: "1.2rem",
                                          fontWeight: "300",
                                          paddingTop: ".3rem",
                                          color: "#3f3844",
                                        },
                                      }}
                            />
                      
                    
            <LocalizationProvider dateAdapter={AdapterDateFns}>
    
                <CustomDatePickerStart
                            label="From"
                            value={updateNewBookStart}
                            onChange={setNewUpdateBookStart} // {prop with state update function} from the Component
                            isSelected={startDateSelected}
                            setIsSelected={setStartDateSelected}
                />
                 <CustomDatePickerEnd
                            label="To"
                            value={updateNewBookEnd}
                            onChange={setNewUpdateBookEnd} // {prop with state update function} from the Component
                            isSelected={endDateSelected}
                            setIsSelected={setEndDateSelected}
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

          </Stack>
            </div>
            <div className="container-existing__delete">
            <Button
              variant="contained"
              sx = {{
                color: "#F00000",
                fontWeight:"800",
                backgroundColor:"#FFFFFF",
                boxShadow:"none",
                width:"1rem",
                ":hover": { // needs to be precised as well when changing a a color 
                  backgroundColor:"#FFFFFF",
                  boxShadow:"none",
                  borderColor:"#FFE3E2",
                  border:"1px solid",
                }
                
                 }}
              onClick={() => onDeleteBook(bookId)}
               size="large"
              startIcon={<DeleteIcon />}
            >
              {/* Delete  */}
            </Button>
            </div>
            </div>
        </form>
      </div>
 
      )
}
export default Book;