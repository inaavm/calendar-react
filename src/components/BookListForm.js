import React, {useState, useEffect} from "react";
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

import CalendarR from "./CalendarReact";

// STYLE css
import"../App.css";
import { grey } from "@mui/material/colors";



const BookListForm = ({renderAnimation}) => {
    

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

        return (
            <div >
                <div className="header">
                    <div class="currentdate">
                        <p>
                        <span className="weekday">
                            {new Date().toLocaleDateString(undefined, { weekday: "long" })}
                        </span>
                        </p>
                    </div>
                    {/* Animation Section */}
                    {(pastEvents.length === 0 && upcomingEvents.length === 0) && (
                        <div className="animation-container">
                                <div>
                                    <p>No events yet! Add a new event to get started.</p>
                                </div> 
                            <DotLottieReact
                                className="animation"
                                src="https://lottie.host/e519c080-596c-49ad-ae2f-9e0ac5708121/h5v8ivTEUd.lottie"
                                loop
                                autoplay
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                </div>
        
                <div className="container">
                    <div className="container--calendar-form">
                        {/* Calendar Section */}
                        <div className="calendar">
                            <CalendarR
                                events={bookList.map(book => ({
                                    id: book.id,
                                    title: book.title,
                                    from: book.start,
                                    to: book.end,
                                    color: "#202029",
                                }))}
                            />
                        </div>
        
                        {/* Form Section */}
                        <div className="form">
                            <h2 id="titleform">New event</h2>
        
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                postAddNewBook();
                            }}>
                                <Stack spacing={2}>
                                    {dateError && (
                                        <Alert severity="error" sx={{ width: '100%' }}>
                                            {dateError}
                                        </Alert>
                                    )}
        
                                    <TextField
                                        id="standard-basic"
                                        required
                                        label="Add a new event"
                                        variant="standard"
                                        value={newBTitle || ""}
                                        onChange={e => setNewBTitle(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            width: "12rem",
                                            height: "2rem",
                                            fontSize: "1rem",
                                            fontFamily: "sans-serif",
                                            fontWeight: "200",
                                            color: "black",
                                            paddingTop: ".5rem",
                                            paddingBottom: "3rem",
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
                                            onChange={handleStartDateChange}
                                            isSelected={startDateSelected}
                                            setIsSelected={setStartDateSelected}
                                            error={!!dateError}
                                        />
                                        <CustomDatePickerEnd
                                            label="End Date"
                                            value={newBEnd}
                                            isSelected={endDateSelected}
                                            setIsSelected={setEndDateSelected}
                                            onChange={handleEndDateChange}
                                            error={!!dateError}
                                            minDate={newBStart}
                                        />
                                    </LocalizationProvider>
        
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        size="medium"
                                        sx={{
                                            color: "#FFFFFF",
                                            fontWeight: "800",
                                            backgroundColor: "#202029",
                                            boxShadow: "none",
                                            ":hover": {
                                                backgroundColor: "#202029",
                                                boxShadow: "none",
                                                borderColor: "#DE62B6",
                                                border: "1px solid",
                                                textDecoration: "underline",
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
        
                    {/* Existing Books Section */}
                    <div className="existing-books">
                        {upcomingEvents.length > 0 && (
                            <>
                                <h2>
                                    <span id="upcoming">{upcomingEvents.length}</span> Current & Upcoming Events
                                </h2>
                                <List>
                                    {bookListExisting(upcomingEvents)}
                                </List>
                            </>
                        )}
        
                        {pastEvents.length > 0 && (
                            <>
                                <h2>
                                    <span id="past">{pastEvents.length}</span> Past Events
                                </h2>
                                <List>
                                    {bookListExisting(pastEvents)}
                                </List>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
}  
export default BookListForm;