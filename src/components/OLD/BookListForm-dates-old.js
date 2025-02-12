'use client';

import React, {useState, useEffect} from "react";
import CalendarComponent from './Calendar';
import CustomDatePickerStart from "./CustomDatePickerStart";
import CustomDatePickerEnd from "./CustomDatePickerEnd";
import Book from './Book';
import AddIcon from '@mui/icons-material/Add';
import {getBooks, addNewBook} from "../api/books";

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns }  from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import "../App.css";

const BookListForm = () => {
    const [bookList, setBookList] = useState([]);
    const [startDateSelected, setStartDateSelected] = useState(false);
    const [endDateSelected, setEndDateSelected] = useState(false);
    const [newBTitle, setNewBTitle] = useState("");
    const [newBStart, setNewBStart] = useState(new Date().toISOString());
    const [newBEnd, setNewBEnd] = useState(new Date().toISOString());

    useEffect(() => {
        async function retrieveGetBooks() {
            const booksData = await getBooks();
            setBookList(booksData);
        }
        retrieveGetBooks();
    }, []);

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

    // Create separate lists for past and upcoming events
    const renderBookList = (books, title) => {
        return books.map((book) => (
            <Book
                key={book.id}
                bookId={book.id}
                bookTitle={book.title}
                bookStart={book.start}
                bookEnd={book.end}
                setBookListInitValue={setBookList}
            />
        ));
    };

    async function postAddNewBook() {
        const newB = await addNewBook(newBTitle, newBStart, newBEnd);
        setBookList((previouslist) => [...previouslist, newB]);
    }

    return(
        <div className="container">
            <div className="container--calendar-form">
                <CalendarComponent events={bookList} />
                <div className="form">
                    <h3>Add a new event</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        postAddNewBook();
                    }}>
                        <Stack spacing={2}>
                            <TextField
                                id="standard-basic"
                                required
                                label="Add Book Title"
                                variant="standard"
                                onChange={e => setNewBTitle(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <CustomDatePickerStart
                                    label="Start Date"
                                    value={newBStart}
                                    onChange={setNewBStart}
                                    isSelected={startDateSelected}
                                    setIsSelected={setStartDateSelected}
                                />
                                <CustomDatePickerEnd
                                    label="End Date"
                                    value={newBEnd}
                                    onChange={setNewBEnd}
                                    isSelected={endDateSelected}
                                    setIsSelected={setEndDateSelected}
                                />
                            </LocalizationProvider>
                            <Button
                                variant="contained"
                                type="submit"
                                size="medium"
                                sx={{
                                    color: "#DE62B6",
                                    fontWeight: "800",
                                    backgroundColor: "#FFE9F8",
                                    boxShadow: "none",
                                    ":hover": {
                                        backgroundColor: "#FFE9F8",
                                        boxShadow: "none",
                                        borderColor: "#DE62B6",
                                        border: "1px solid",
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
            <div className="existing-books">
                {upcomingEvents.length > 0 && (
                    <>
                        <h2>Current & Upcoming Events</h2>
                        <List>
                            {renderBookList(upcomingEvents)}
                        </List>
                    </>
                )}
                
                {pastEvents.length > 0 && (
                    <>
                        <Divider sx={{ my: 3 }} />
                        <h2>Past Events</h2>
                        <List>
                            {renderBookList(pastEvents)}
                        </List>
                    </>
                )}
            </div>
        </div>
    );
}

export default BookListForm;