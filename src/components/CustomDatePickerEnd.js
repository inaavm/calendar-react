import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const CustomDatePickerEnd = ({ label, value, onChange, isSelected, setIsSelected }) => {
  return (
    <DatePicker
      label={label}
      openTo="day"
      format="d MMMM yyyy"
      views={["year", "month", "day"]}
      value={new Date(value)}
      onChange={(newValue) => {
        onChange(newValue.toISOString());
        setIsSelected(true);  // Mark as selected when user picks a date
      }}
      slotProps={{
        day: {
            sx: {
              "&.MuiPickersDay-today": {
                border: "1px solid ##DE61B5 !important",  
                backgroundColor: "#FEE9F8 !important",  
                color: "#DE61B5", // Change text color for today
              },
            },
          },
        textField: {
          variant: "standard", // No borders
          size: "large",
          sx: {
            width: "12rem",
            height: "2rem",
            paddingBottom:"3rem",
            "& .MuiInputBase-input": {
              fontSize: "1rem",
              fontFamily: "sans-serif",
              fontWeight: "200",
              color: isSelected ? "black" : "#BFBFBF", // change color  after the user made a selection
              paddingTop: ".5rem",
              
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.2rem",
              fontWeight: "300",
              paddingBottom: ".1rem",
              color: "#3f3844",
            },
            "& .MuiIcon": {
              color: "#3f3844",
            },
          },
        },
      }}
    />
  );
};

export default CustomDatePickerEnd;
