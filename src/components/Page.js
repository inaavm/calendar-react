import React, { useState, useEffect } from "react";
import CalendarComponent from './Calendar';
import Book from './Book';
import { getBooks, addNewBook } from "../api/books";

// Material UI
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


// CSS
import "../App.css";

const Page = () => {
    const [bookList, setBookList] = useState([]);
    const [startDateSelected, setStartDateSelected] = useState(false);

    useEffect(() => {
        async function retrieveGetBooks() {
            const booksData = await getBooks();
            setBookList(booksData);
        }
        retrieveGetBooks();
    }, []);

    const [newBTitle, setNewBTitle] = useState("");
    const [newBStart, setNewBStart] = useState(new Date().toISOString());
    const [newBEnd, setNewBEnd] = useState(new Date().toISOString());

    async function postAddNewBook() {
        const newB = await addNewBook(newBTitle, newBStart, newBEnd);
        setBookList((previouslist) => [...previouslist, newB]);
    }

    const bookListExisting = bookList.map((book) => (
        <Book
            key={book.id}
            bookId={book.id}
            bookTitle={book.title}
            bookStart={book.start}
            bookEnd={book.end}
            setBookListInitValue={setBookList}
        />
    ));

    return (
        <div className="container">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <CalendarComponent events={bookList} />
                </Grid>

                            {/* FORM ADD NEW */}
                <Grid item xs={12} md={6}>
                    <div className="add-new">
                        <h3>Add a new event</h3>
                        <form onSubmit={(e) => { e.preventDefault(); postAddNewBook(); }}>
                            <Stack spacing={2}>
                                <TextField
                                    id="standard-basic"
                                    size="small"
                                    required
                                    label="Add Book Title"
                                    variant="standard"
                                    onChange={(e) => setNewBTitle(e.target.value)}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        openTo="day"
                                        format="d MMMM yyyy"
                                        views={['year', 'month', 'day']}
                                        value={new Date(newBStart)}
                                        onChange={(newValue) => {
                                            setNewBStart(newValue.toISOString());
                                            setStartDateSelected(true);
                                        }}
                                        slotProps={{ textField: { variant: 'standard', sx: { width: "16rem" } } }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        openTo="day"
                                        views={['year', 'month', 'day']}
                                        value={new Date(newBEnd)}
                                        onChange={(newValue) => setNewBEnd(newValue.toISOString())}
                                        slotProps={{ textField: { variant: 'outlined' } }}
                                    />
                                    <TimePicker label="Select Time" />
                                </LocalizationProvider>
                                <Button variant="outlined" type="submit">
                                    Add a book
                                </Button>
                            </Stack>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="existing-books">
                        <h2>Existing Items</h2>
                        <List>{bookListExisting}</List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Page;
