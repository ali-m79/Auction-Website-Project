import * as React from "react";
import { useContext } from "react";

import "./NavbarStyle.css";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import AuthContext from "../../../AuthService";

function RightNavBar({ isOpen, handdleChange, setTab, activeTab }) {
  function nullFunc() {}
  let { user, logout } = useContext(AuthContext);
  const handleLogOut = () => {
    logout();
  };
  return (
    <>
      {user ? (
        <nav
          className="mynav "
          style={isOpen ? { width: "200px" } : { width: "46px" }}
          onMouseEnter={!isOpen ? handdleChange : nullFunc}
          onMouseLeave={isOpen ? handdleChange : nullFunc}
        >
          <NavHeader className="head-nav pe-2 nav-menu-icons ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={!isOpen ? handdleChange : nullFunc}
              className="menuIcon"
            >
              <path
                d="M14 12H22M14 7H22M16 17H22M10 8C10 9.65685 8.65685 11 7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5C8.65685 5 10 6.34315 10 8ZM12 16C12 17.6569 9.76142 19 7 19C4.23858 19 2 17.6569 2 16C2 14.3431 4.23858 13 7 13C9.76142 13 12 14.3431 12 16Z"
                stroke="#8e8d8a"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={isOpen ? handdleChange : nullFunc}
              className="closeIcon"
            >
              <path
                d="M5 9H13V7.20377C13 6.34461 14.0119 5.88543 14.6585 6.45119L19.2798 10.4948C20.1905 11.2917 20.1905 12.7083 19.2798 13.5052L14.6585 17.5488C14.0119 18.1146 13 17.6554 13 16.7962V15H5C3.89543 15 3 14.1046 3 13V11C3 9.89543 3.89543 9 5 9Z"
                stroke="#8e8d8a"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NavHeader>
          <div>
            {navItems.map((elm, index) => (
              <Grid
                className={`${elm.className} ${
                  activeTab === elm.tabNumber ? "activeTab" : ""
                }`}
                onClick={() => setTab(elm.tabNumber)}
              >
                <NavbarIcon
                  index={elm.iconNumber}
                  iconClassName={elm.iconClass}
                  key={index}
                />
                <span>{elm.text}</span>
              </Grid>
            ))}
          </div>
          <Box
            className=" nav-color nav-log-out"
            key="/login"
            onClick={handleLogOut}
          >
            <NavbarIcon index={8} iconClassName="logOutIcon" />
            <span>خروج از حساب کاربری</span>
          </Box>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}

export default RightNavBar;
export function NavItems({ children, className = "", direction = "/" }) {
  return (
    <NavLink to={direction} className={className}>
      {children}
    </NavLink>
  );
}
function NavHeader({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
export function NavbarIcon({ index, iconClassName, insideColor = "#8e8d8a" }) {
  if (index === 1)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M18.5588 19.5488C17.5654 16.8918 15.0036 15 12 15C8.99638 15 6.4346 16.8918 5.44117 19.5488M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33285 17.7154 5.44117 19.5488M18.5588 19.5488C16.8031 21.0756 14.5095 22 12 22C9.49052 22 7.19694 21.0756 5.44117 19.5488"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <circle
          cx="3"
          cy="3"
          r="3"
          transform="matrix(1 0 0 -1 9 12)"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 2)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M14 5.41421L12.7071 6.70711C12.3166 7.09763 11.6834 7.09763 11.2929 6.70711L10 5.41421M12 2V6.41421"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M4 10V16.7639C4 17.5215 4.428 18.214 5.10557 18.5528L11.1056 21.5528C11.6686 21.8343 12.3314 21.8343 12.8944 21.5528L18.8944 18.5528C19.572 18.214 20 17.5215 20 16.7639V10"
          stroke={insideColor}
          stroke-width="1.5"
        />
        <path
          d="M18 5L20 6L12 10L4 6L6 5"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 6L12 10L14 13L22 9L20 6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 6L12 10L10 13L2 9L4 6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 3)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M14 3.58579L12.7071 2.29289C12.3166 1.90237 11.6834 1.90237 11.2929 2.29289L10 3.58579M12 7V2.58579"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M4 10V16.7639C4 17.5215 4.428 18.214 5.10557 18.5528L11.1056 21.5528C11.6686 21.8343 12.3314 21.8343 12.8944 21.5528L18.8944 18.5528C19.572 18.214 20 17.5215 20 16.7639V10"
          stroke={insideColor}
          stroke-width="1.5"
        />
        <path
          d="M18 5L20 6L12 10L4 6L6 5"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 6L12 10L14 13L22 9L20 6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 6L12 10L10 13L2 9L4 6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 4)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M18 17H15M18 14H15M6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21ZM8 7H10C11.1046 7 12 7.89543 12 9C12 10.1046 11.1046 11 10 11H8C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 5)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M22 6H6C3.79086 6 2 7.79086 2 10V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M22 6C22 3.79086 20.2091 2 18 2H12C9.79086 2 8 3.79086 8 6V6H22V6Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
        <path
          d="M2 12L2 16L6 16C7.10457 16 8 15.1046 8 14V14C8 12.8954 7.10457 12 6 12L2 12Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 6)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M17 6.5C18.1045 6.5 19 7.39543 19 8.5M12 5.70254L12.6851 5C14.816 2.81472 18.2709 2.81471 20.4018 5C22.4755 7.1266 22.5392 10.5538 20.5461 12.7599L14.8197 19.0982C13.2984 20.782 10.7015 20.782 9.18026 19.0982L3.45393 12.76C1.46078 10.5538 1.5245 7.12662 3.5982 5.00002C5.72912 2.81473 9.18404 2.81473 11.315 5.00002L12 5.70254Z"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  else if (index === 7) return <></>;
  else if (index === 8)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconClassName}
      >
        <path
          d="M16 3H21M21 3V8M21 3L10 14"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 13C19 17.4183 15.4183 21 11 21C6.58172 21 3 17.4183 3 13C3 8.58172 6.58172 5 11 5"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    );
  else if (index === 9)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={iconClassName}
      >
        <path
          d="M15 14H10M10 14V9M10 14L21 3"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 13C19 17.4183 15.4183 21 11 21C6.58172 21 3 17.4183 3 13C3 8.58172 6.58172 5 11 5"
          stroke={insideColor}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    );
}
const navItems = [
  {
    tabNumber: 0,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "اطلاعات شخصی",
    iconNumber: 1,
    insideIconColor: "",
  },
  {
    tabNumber: 1,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "سابقه خرید",
    iconNumber: 2,
    insideIconColor: "",
  },
  {
    tabNumber: 2,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "سابقه فروش",
    iconNumber: 3,
    insideIconColor: "",
  },
  {
    tabNumber: 3,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "مزایده‌های من",
    iconNumber: 4,
    insideIconColor: "",
  },
  {
    tabNumber: 4,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "کیف پول",
    iconNumber: 5,
    insideIconColor: "",
  },
  {
    tabNumber: 5,
    className: "nav-link-custome nav-color",
    direction: "",
    iconClass: "navbarIconClass",
    text: "علاقه‌مندی‌ها",
    iconNumber: 6,
    insideIconColor: "",
  },
];
