/* eslint-disable react/prop-types */
import classes from "./Container.module.css";
import { Typography } from "@mui/material";
const Container = (props) => {
  return (
    <>
      <div className={classes["center"]}>
        <div className={classes["input-container"]}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            sx={{ color: "#1565c0" }}>
            {props.title}
          </Typography>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Container;
