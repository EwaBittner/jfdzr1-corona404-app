import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
}));

const InputSearch = () => {
  const classes = useStyles();
  // const handleOnChange = (event) => {
  //   onFormChange(event.target.value);
  // };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Wyszukaj produkt"
        variant="outlined"
      />
    </form>
  );
};

export default InputSearch;
