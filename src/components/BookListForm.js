'use client';

import React, {useState, useEffect} from "react";
import CalendarComponent from './calendar';
import CustomDatePickerStart from "./CustomDatePickerStart";
import CustomDatePickerEnd from "./CustomDatePickerEnd";
import Book from './Book';
import AddIcon from '@mui/icons-material/Add';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import {getBooks, addNewBook} from "../api/books";

// STYLE FRAMEWORK -Material UI GOOGLE 
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

// STYLE css
import"../App.css";



const BookListForm = () => {
    

    const [bookList, setBookList] = useState([]);// state for the list 
    
    const [startDateSelected, setStartDateSelected] = useState(false); // track the date selection by the user
    const [endDateSelected, setEndDateSelected] = useState(false); // track the date selection by the user

            // 2. STATES for POST new book
    const [newBTitle, setNewBTitle] = useState("");
    const [newBStart, setNewBStart] = useState(new Date().toISOString()); // convert to YYYY-MM-DDTHH:mm:ss.sssZ Format  
    const [newBEnd, setNewBEnd] = useState(new Date().toISOString()); // convert to YYYY-MM-DDTHH:mm:ss.sssZ Format  

   
        // 1. GET - with useEffect for data retrieving - api - mounting 
    useEffect(() => {
        async function retrieveGetBooks() {
            const booksData = await getBooks();
            //functionrerenders ( value ) - value bein from the API 
            setBookList(booksData);
        }
        retrieveGetBooks();// call the function
    }, []) // empty array to prevent data from fetching 
    
      // 2. DATE CONDITION  so that end data after start date 
    const [dateError, setDateError] = useState(""); // start date < end date 

     
        // 1. Validate dates whenever they change
        useEffect(() => {
            validateDates(new Date(newBStart), new Date(newBEnd));
        }, [newBStart, newBEnd]);
    
        // Date validation function
        const validateDates = (startDate, endDate) => {
            if (startDate > endDate) {
                setDateError("Set start before the end date");
                return false;
            }
            setDateError("");
            return true;
        };


     //start date change
    const handleStartDateChange = (newDate) => {
        const startDate = new Date(newDate);
        const endDate = new Date(newBEnd);
        setNewBStart(newDate);
        validateDates(startDate, endDate);
    };

    // end date change
    const handleEndDateChange = (newDate) => {
        const startDate = new Date(newBStart);
        const endDate = new Date(newDate);
        setNewBEnd(newDate);
        validateDates(startDate, endDate);
    };
    

    // Filter events into past and current/upcoming
    const currentDate = new Date();
    
    const pastEvents = bookList.filter(book => {
        const endDate = new Date(book.end);
        return endDate < currentDate;
    });

    const upcomingEvents = bookList.filter(book => {
        const endDate = new Date(book.end);
        return endDate >= currentDate;
    });



      // 1. map the item retrieved via GET in a list named booklistExisting 
    const bookListExisting = (books) => {
        return books.map((book) => (
    
            <Book
                key={book.id} // key is a prop by react to uniquely identify each element in a list
                bookId={book.id} //id as property for the backend resource 
                bookTitle={book.title}
                bookStart={book.start}
                bookEnd={book.end}
                setBookListInitValue= {setBookList}
            />
        ));
     };


       // 2. POST - function will be called via user action
    async function postAddNewBook () {
       
        // Validate dates before submission
        const startDate = new Date(newBStart);
        const endDate = new Date(newBEnd);
        
        if (!validateDates(startDate, endDate)) {
            return; // Don't submit if validation fails
        }

        const newB = await addNewBook(newBTitle, newBStart, newBEnd);
        setBookList((previouslist) => [...previouslist, newB]);
        
        // Reset form
        setNewBTitle("");
        setStartDateSelected(false);
        setEndDateSelected(false);
        setNewBStart(new Date().toISOString());  
        setNewBEnd(new Date().toISOString()); 
     }
     
       // modal lottie 
        const [openModal, setOpenModal] = useState(false);

        // Open/Close modal based on event list length
        useEffect(() => {
            if (pastEvents.length === 0 && upcomingEvents.length === 0) {
            setOpenModal(true);
            }
        }, [pastEvents.length, upcomingEvents.length]);

        const handleCloseModal = () => {
            setOpenModal(false);
        };


     return(
      <div className="container">
         <div className="container--calendar-form">
            <div className="calendar">
                <CalendarComponent events= {bookList} /> 
            </div>
            <div className="form">
            <h2 id="titleform">New event</h2>
            
              <form onSubmit={(e) => { 
                    e.preventDefault()
                    postAddNewBook();
                }}
                >
        
                <Stack spacing = {2}>
                {dateError && (
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {dateError}
                                </Alert>
                )}
                      <TextField id="standard-basic"
                                required
                                label="Add a new event"
                                // placeholder="Dinner with Ann"
                                variant="standard"
                                value={newBTitle || ""} // if it s undefined than - error no newB is defined
                                onChange={e => setNewBTitle(e.target.value)}
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
                            label="Start Date"
                            value={newBStart}
                            // onChange={setNewBStart} // {prop with state update function} from the Component
                            onChange={handleStartDateChange}
                            isSelected={startDateSelected}
                            setIsSelected={setStartDateSelected}
                            error={!!dateError}
                        />
                          <CustomDatePickerEnd
                            label="End Date"
                            value={newBEnd}
                            // onChange={setNewBEnd} // {prop with state update function} from the Component
                            isSelected={endDateSelected}
                            setIsSelected={setEndDateSelected}
                            onChange={handleEndDateChange}
                            error={!!dateError}
                            minDate={newBStart} 
                        />
                        {/* <TimePicker label="Basic time picker" /> */}
                     </LocalizationProvider>     
                    <Button 
                        variant = "contained" 
                        type="submit"
                        size = "medium"
                        sx = {{
                            color: "#DE62B6",
                            fontWeight:"800",
                            backgroundColor:"#FFE9F8",
                            boxShadow:"none",
                            ":hover": { // needs to be precised as well when changing a a color 
                            backgroundColor:"#FFE9F8",
                            boxShadow:"none",
                            borderColor:"#DE62B6",
                            border:"1px solid",
                            width: 'auto',
                            }
                            }}
                            startIcon={<AddIcon />}
                            >
                            Add a new event
                    </Button>
                 </Stack>
              </form>
            </div> 
         </div> 
     
         <div className={"existing-books"}>

            {/* render the Lotti File without modal  */}

            {/* // it is  rendered if the conditions are true - no need to return like in a function   */}
         {(pastEvents.length  || upcomingEvents.length)  ===  0 && (
                <div className="animation-container">
                    <p>No events yet! Add a new event to get started.</p>    
                    <DotLottieReact className="animation"
                    src="https://lottie.host/a3aa3e5d-e3a9-4518-940a-8e7dcf8db829/KJRQyFSyIw.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: 'auto' }} 
                 />
                    
                </div>
            )}
              {upcomingEvents.length > 0 && (
                    <>
                        <h2> <span id="upcoming">{upcomingEvents.length}</span> Current & Upcoming Events</h2>
                        <List>
                            {bookListExisting(upcomingEvents)}
                        </List>
                    </>
                )}
                
                {pastEvents.length > 0 && (
                    <>
                        {/* <Divider sx={{ my: 3 }} /> */}
                        <h2><span id="past">{pastEvents.length}</span> Past Events </h2>
                        <List>
                            {bookListExisting(pastEvents)}
                        </List>
                    </>
                )}
         </div>

         {/* {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>No events yet! Add a new event to get started.</p>
            <DotLottieReact
              src="https://lottie.host/a3aa3e5d-e3a9-4518-940a-8e7dcf8db829/KJRQyFSyIw.lottie"
              loop
              autoplay
            />
            <button className="modal-close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )} */}
      </div>
     )
}


export default BookListForm;