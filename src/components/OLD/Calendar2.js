import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarStyles.css';


const getCalendarStyles = (customColor) => ({ // returns an object with no name that has 2 children objects
  // has priority compared to the styles set in the CSS 
  format: {
    height: 500,
    width: 600,
  },
  
  event: {
    backgroundColor:'transparent',
    color: 'blue',
    borderRadius: '5px',
    padding: '1px',
    // height:"12px",
  }
});

const CalendarComponent = ({ events, eventColor }) => {
  const localizer = momentLocalizer(moment);
  const styles = getCalendarStyles(eventColor);
 
  // global - event.title
  // via function getCalendarStyles - styles.property name 

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={events}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        style={styles.format}
        components={{
          event: ({ event }) => (
            <div style={styles.event}> 
              {event.title}
            </div>
          ),
        }}
 
      />
    </div>
  );
};


export default CalendarComponent;

// {['month', 'week', 'day']}