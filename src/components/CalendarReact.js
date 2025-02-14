import React from 'react';
// @ts-ignore
import Calendar from 'react-awesome-calendar'; // REACT AWESOME 
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./CalendarStyles.css";
 

// const events = [
//     {
//         id: 1,
//         color: '#fd3153',
//         from: '2019-05-02T18:00:00+00:00',
//         to: '2019-05-05T19:00:00+00:00',
//         title: 'This is an event'
//     },

// ];

 
const CalendarR = ({ events }) => {
    // const localizer = momentLocalizer(moment);

        return (
            <div>
                <Calendar 
                events={events} 
                />
            </div>
        );
    
}


export default CalendarR;
