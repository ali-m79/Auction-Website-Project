import * as React from "react";
import { useState } from "react";

//MUI Components
import { Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

//Style
import "./MyAdsStyle.css";

//Tab Components
import ActiveAds from "./TabComponents/ActiveAds";
import MobileAds from "./TabComponents/MobileAds";
import LaptopAds from "./TabComponents/LaptopAds";
import ConsoleAds from "./TabComponents/ConsoleAds";

//Other Components
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Grid
          item
          xs={12}
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </Grid>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyAdsComponent() {
  const [tabValue, setTabValue] = React.useState(3);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          style={{ direction: "ltr" }}
        >
          <Tab
            label=" مزایده‌های فعال"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="ایجاد مزایده در دسته کنسول بازی"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="ایجاد مزایده در دسته لپتاپ"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
          <Tab
            label="ایجاد مزایده در دسته موبایل"
            {...a11yProps(0)}
            className="personal-info-tabs"
            sx={{ fontSize: { xs: "10px", sm: "14px", md: "16px" } }}
          />
        </Tabs>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          width: "100%",
          padding: { xs: "10px", sm: "15px", md: "15px 40px", lg: "10px 40px" },
        }}
        className="flex-column-custom"
      >
        <CustomTabPanel value={tabValue} index={0}>
          <ActiveAds />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <ConsoleAds />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <LaptopAds />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <MobileAds />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}

export default MyAdsComponent;
