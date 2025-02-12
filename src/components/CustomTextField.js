import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

import { TextField } from "@mui/material";

const CustomTextField = ({ label}) => {
  return (
    <TextField
      label={label}
      required
      variant="standard"
      id="standard-basic"
      InputLabelProps={{
        shrink: true,  // Keeps the label in place
      }}
      sx={{
        width: "16rem",
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
        //   paddingBottom: ".1rem",
          color: "#3f3844",
        },
      }}
    />
  );
};

export default CustomTextField;
