import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./CalendarStyles.css"

const getCalendarStyles = (customColor) => ({
  format: {
    height: 500,
    width: 600,
  },
  event: {
    backgroundColor: "#FEE9F8", 
    color: 'black',
    borderRadius: '5px',
    padding: '1px',
  }
});

const CalendarComponent = ({ events, eventColor }) => {
  const localizer = momentLocalizer(moment);
  const styles = getCalendarStyles(eventColor);

  return (
    <div>
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
          eventWrapper: ({ event, children }) => (
            <div title={event.title}>
              {children}
            </div>
          )
        }}
        popup // This enables the "+X more" events popup
      />
    </div>
  );
};

export default CalendarComponent;