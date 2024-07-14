import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function TimeLeft(props) {
  //end_year, end_month, end_day, end_hour, end_minute, end_second
  //const finishDate = useMemo(() => new Date(props.end_time[0], props.end_time[1], props.end_time[2], props.end_time[3], props.end_time[4], props.end_time[5]), []);

  const [currentDays, setCurrentDays] = useState("");
  const [currentHours, setCurrentHours] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState("");
  const [currentSecconds, setCurrentSecconds] = useState("");

  useEffect(() => {
    var finishDate = new Date(
      props.end_time[0],
      props.end_time[1],
      props.end_time[2],
      props.end_time[3],
      props.end_time[4],
      props.end_time[5]
    );
    var first_difference = finishDate.getTime() - new Date().getTime();
    setCurrentDays(
      String(Math.floor(first_difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      )
    );
    setCurrentHours(
      String(
        Math.floor(
          (first_difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
      ).padStart(2, "0")
    );
    setCurrentMinutes(
      String(
        Math.floor((first_difference % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0")
    );
    setCurrentSecconds(
      String(Math.floor((first_difference % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      )
    );
    const interval = setInterval(() => {
      UpdateTimer();
    }, 1000);
    const UpdateTimer = () => {
      var difference = finishDate.getTime() - new Date().getTime();
      //console.log(props.end_time[0], props.end_time[1], props.end_time[2], props.end_time[3], props.end_time[4], props.end_time[5])
      setCurrentDays(
        String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0")
      );
      setCurrentHours(
        String(
          Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0")
      );
      setCurrentMinutes(
        String(
          Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0")
      );
      setCurrentSecconds(
        String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, "0")
      );
    };
    return () => clearInterval(interval);
  }, [props]);

  const TimeLeftText = styled(Typography)(({ theme }) => ({
    fontFamily: "Montserrat",
    [theme.breakpoints.up("xs")]: {
      fontSize: props.text_size,
      fontWeight: "bold",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: props.text_size,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: props.text_size,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: props.text_size,
    },
  }));

  return (
    <>
      <Grid container spacing={1} sx={{ marginTop: props.margin }}>
        <TimeLeftText sx={{ paddingTop: props.padding, marginLeft: "8px" }}>
          {" "}
          {props.time_text}
        </TimeLeftText>
        <TimeLeftText
          className="montserrat-fonts"
          sx={{ paddingTop: props.padding, color: "#e85a4f" }}
        >{`${currentDays}:${currentHours}:${currentMinutes}:${currentSecconds}`}</TimeLeftText>
      </Grid>
    </>
  );
}
