import * as React from "react";
import { NavLink } from "react-router-dom";

//Style
import "./BreadCrumbsStyle.css";

//MUI Component
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

function BreadCrumbsAll({ children }) {
  return (
    <Grid
      item
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      xs={12}
    >
      {children}
    </Grid>
  );
}

export default BreadCrumbsAll;
export function CustomSeparator({ information, tabNumber, breadCrumbsItems }) {
  return (
    <Breadcrumbs
      separator={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#d8c3a5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 15.5179V8.48207C17 6.93849 15.3256 5.97675 13.9923 6.75451L7.96153 10.2724C6.63852 11.0442 6.63852 12.9558 7.96153 13.7276L13.9923 17.2455C15.3256 18.0232 17 17.0615 17 15.5179Z"
            stroke="#8e8d8a"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      }
      aria-label="breadcrumb"
      className="breadCrumbsParent"
    >
      {breadCrumbsItems.map((element, index) =>
        element.isTheLastItem ? (
          <Typography className="breadCrumbsLastItem">
            {information.map((element, index) =>
              element.tabNumber === tabNumber ? element.text : ""
            )}
          </Typography>
        ) : (
          <NavLink
            to={element.toLink}
            rel="noopener noreferrer"
            key={element.key}
            className={element.className}
          >
            {element.title}
          </NavLink>
        )
      )}
    </Breadcrumbs>
  );
}
export function BreadCrumbsTypeTwo({ breadCrumbsItems }) {
  console.log(breadCrumbsItems);
  return (
    <Grid
      item
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      xs={12}
    >
      <Breadcrumbs
        separator={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#d8c3a5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 15.5179V8.48207C17 6.93849 15.3256 5.97675 13.9923 6.75451L7.96153 10.2724C6.63852 11.0442 6.63852 12.9558 7.96153 13.7276L13.9923 17.2455C15.3256 18.0232 17 17.0615 17 15.5179Z"
              stroke="#8e8d8a"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        }
        aria-label="breadcrumb"
        className="breadCrumbsParent"
      >
        {breadCrumbsItems.map((element, index) =>
          element.isTheLastItem ? (
            <Typography className="breadCrumbsLastItem">
              {element.title}
            </Typography>
          ) : (
            <NavLink
              to={element.toLink}
              rel="noopener noreferrer"
              key={element.key}
              className={element.className}
            >
              {element.title}
            </NavLink>
          )
        )}
      </Breadcrumbs>
    </Grid>
  );
}
