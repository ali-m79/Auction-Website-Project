import * as React from "react";

//MUI Components
import { Grid, Typography } from "@mui/material";

import { NavbarIcon } from "../Navbar/RightNavbar";
function TitleComponent({ title, titleClassName, iconNumber, iconClassName }) {
  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-start" },
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        gap: "10px",
        padding: "5px 10px",
      }}
    >
      <NavbarIcon
        index={iconNumber}
        iconClassName={iconClassName}
        insideColor="#8e8d8a"
        outSideColor="#d8c3a5"
      />
      <Typography
        variant="h3"
        component="h3"
        className={titleClassName}
        sx={{ fontSize: { xs: "18px", sm: "20px", md: "25px", lg: "30px" } }}
      >
        {title}
      </Typography>
    </Grid>
  );
}

export default TitleComponent;
